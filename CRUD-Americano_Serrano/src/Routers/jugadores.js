const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'americano_db'
});

// 1. Registrar Jugador (POST /api/jugadores)
router.post('/', (req, res) => {
    const { nombre, id_equipo, posicion, jersey } = req.body;

    if (!nombre || !id_equipo || !posicion || jersey === undefined) {
        return res.status(400).json({ error: "Faltan campos obligatorios por llenar." });
    }

    const query = "INSERT INTO jugadores (nombre_completo, id_equipo, posicion, jersey) VALUES (?, ?, ?, ?)";
    db.query(query, [nombre, id_equipo, posicion, jersey], (err, resultado) => {
        if (err) {
            console.error("Error SQL al insertar:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ status: "success", mensaje: "Jugador registrado con éxito", id: resultado.insertId });
    });
});

// 2. Obtener Jugadores (GET /api/jugadores)
router.get('/', (req, res) => {
    const query = `
        SELECT j.id_jugador AS id, j.nombre_completo AS nombre, j.posicion, j.jersey, j.id_equipo, e.nombre AS equipoNombre 
        FROM jugadores j 
        LEFT JOIN equipos e ON j.id_equipo = e.id_equipo`;
        
    db.query(query, (err, resultados) => {
        if (err) {
            console.error("Error SQL al consultar:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(resultados);
    });
});

// 3. Eliminar Jugador (DELETE /api/jugadores/:id)
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM jugadores WHERE id_jugador = ?";
    db.query(query, [id], (err, resultado) => {
        if (err) {
            console.error("Error SQL al eliminar:", err.message);
            return res.status(500).json({ error: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró el jugador a eliminar." });
        }
        res.json({ status: "success", mensaje: "Jugador eliminado correctamente." });
    });
});

// 4. NUEVA RUTA: Actualizar Jugador (PUT /api/jugadores/:id)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, id_equipo, posicion, jersey } = req.body;

    if (!nombre || !id_equipo || !posicion || jersey === undefined) {
        return res.status(400).json({ error: "Faltan campos obligatorios por llenar." });
    }

    // CORRECCIÓN: Actualizamos usando 'nombre_completo' e 'id_jugador' para hacer match con tu BD
    const query = `
        UPDATE jugadores 
        SET nombre_completo = ?, id_equipo = ?, posicion = ?, jersey = ? 
        WHERE id_jugador = ?`;

    db.query(query, [nombre, id_equipo, posicion, jersey, id], (err, resultado) => {
        if (err) {
            console.error("Error SQL al actualizar:", err.message);
            return res.status(500).json({ error: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró el jugador para actualizar." });
        }
        res.json({ status: "success", mensaje: "Jugador actualizado con éxito." });
    });
});

module.exports = router;