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
    db.query("SELECT id_equipo AS id, nombre, ciudad, categoria FROM equipos", (err, resultados) => {
        if (err) {
            console.error("Error SQL en GET:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(resultados);
    });
});

router.post('/', (req, res) => {
    const { nombre, ciudad, categoria } = req.body;

    if (!nombre || !ciudad || !categoria) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    db.query("SELECT id_equipo FROM equipos WHERE nombre = ?", [nombre.trim()], (err, filas) => {
        if (err) {
            console.error("Error SQL en POST:", err.message);
            return res.status(500).json({ error: err.message });
        }

        if (filas.length > 0) {
            return res.status(400).json({ error: `El equipo '${nombre}' ya existe.` });
        }

        const query = "INSERT INTO equipos (nombre, ciudad, categoria) VALUES (?, ?, ?)";
        db.query(query, [nombre, ciudad, categoria], (err, resultado) => {
            if (err) {
                console.error("Error SQL en POST:", err.message);
                return res.status(500).json({ error: err.message });
            }
            res.json({ status: "success", id: resultado.insertId });
        });
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, ciudad, categoria } = req.body;

    const query = "UPDATE equipos SET nombre = ?, ciudad = ?, categoria = ? WHERE id_equipo = ?";
    db.query(query, [nombre, ciudad, categoria, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: "updated" });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM equipos WHERE id_equipo = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: "deleted" });
    });
});

module.exports = router;