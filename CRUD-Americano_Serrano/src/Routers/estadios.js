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
    const query = "SELECT id_estadio AS id, nombre, capacidad, ciudad FROM estadios";
    db.query(query, (err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(resultados);
    });
});

router.post('/', (req, res) => {
    const { nombre, capacidad, ciudad } = req.body;
    const query = "INSERT INTO estadios (nombre, capacidad, ciudad) VALUES (?, ?, ?)";
    db.query(query, [nombre, capacidad, ciudad], (err, resultado) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ status: "success", id: resultado.insertId });
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, capacidad, ciudad } = req.body;
    const query = "UPDATE estadios SET nombre = ?, capacidad = ?, ciudad = ? WHERE id_estadio = ?";
    db.query(query, [nombre, capacidad, ciudad, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: "updated" });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM estadios WHERE id_estadio = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: "deleted" });
    });
});

module.exports = router;