const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'americano_db',
    waitForConnections: true,
    connectionLimit: 10
});

router.get('/', (req, res) => {
    const query = `
        SELECT p.id_partido AS id, 
               el.nombre AS local, 
               ev.nombre AS visitante, 
               p.marcador,
               p.id_equipo_local,
               p.id_equipo_visitante
        FROM partidos p
        JOIN equipos el ON p.id_equipo_local = el.id_equipo
        JOIN equipos ev ON p.id_equipo_visitante = ev.id_equipo
    `;
    db.query(query, (err, resultados) => {
        if (err) {
            console.error("Error SQL en GET partidos:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(resultados);
    });
});

router.post('/', (req, res) => {
    const { id_equipo_local, id_equipo_visitante, local, visitante, marcador } = req.body;

    const buscarLocal = id_equipo_local || local;
    const buscarVisitante = id_equipo_visitante || visitante;

    if (!buscarLocal || !buscarVisitante || !marcador) {
        return res.status(400).json({ error: "Faltan datos para registrar el partido." });
    }

    // Consulta para obtener los IDs correspondientes a partir de los nombres enviados
    const queryIds = `
        SELECT 
            (SELECT id_equipo FROM equipos WHERE nombre = ? OR id_equipo = ?) AS id_local,
            (SELECT id_equipo FROM equipos WHERE nombre = ? OR id_equipo = ?) AS id_visitante
    `;

    db.query(queryIds, [String(buscarLocal).trim(), buscarLocal, String(buscarVisitante).trim(), buscarVisitante], (err, filas) => {
        if (err) {
            console.error("Error al buscar IDs de equipos para el partido:", err.message);
            return res.status(500).json({ error: err.message });
        }

        const idLocalReal = filas[0].id_local;
        const idVisitanteReal = filas[0].id_visitante;

        if (!idLocalReal || !idVisitanteReal) {
            return res.status(400).json({ error: "Uno o ambos equipos no existen en la base de datos." });
        }

        if (idLocalReal === idVisitanteReal) {
            return res.status(400).json({ error: "Un equipo no puede jugar contra sí mismo." });
        }

        const queryInsertar = "INSERT INTO partidos (id_equipo_local, id_equipo_visitante, marcador) VALUES (?, ?, ?)";
        db.query(queryInsertar, [idLocalReal, idVisitanteReal, marcador], (err, resultado) => {
            if (err) {
                console.error("Error al insertar el partido:", err.message);
                return res.status(500).json({ error: err.message });
            }
            res.json({ status: "success", id: resultado.insertId });
        });
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_equipo_local, id_equipo_visitante, local, visitante, marcador } = req.body;

    const buscarLocal = id_equipo_local || local;
    const buscarVisitante = id_equipo_visitante || visitante;

    const queryIds = `
        SELECT 
            (SELECT id_equipo FROM equipos WHERE nombre = ? OR id_equipo = ?) AS id_local,
            (SELECT id_equipo FROM equipos WHERE nombre = ? OR id_equipo = ?) AS id_visitante
    `;

    db.query(queryIds, [String(buscarLocal).trim(), buscarLocal, String(buscarVisitante).trim(), buscarVisitante], (err, filas) => {
        if (err || !filas[0].id_local || !filas[0].id_visitante) {
            return res.status(400).json({ error: "Equipos no encontrados." });
        }

        const queryActualizar = "UPDATE partidos SET id_equipo_local = ?, id_equipo_visitante = ?, marcador = ? WHERE id_partido = ?";
        db.query(queryActualizar, [filas[0].id_local, filas[0].id_visitante, marcador, id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ status: "updated" });
        });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM partidos WHERE id_partido = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: "deleted" });
    });
});

module.exports = router;