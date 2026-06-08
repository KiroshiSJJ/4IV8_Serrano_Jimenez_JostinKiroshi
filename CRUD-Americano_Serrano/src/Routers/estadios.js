const express = require('express');
const router = express.Router();
const db = require('../DB/database');

// Obtener estadios
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM estadios');
        res.json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Registrar estadio
router.post('/', async (req, res) => {
    const { nombre, capacidad, ciudad } = req.body;
    try {
        await db.query('INSERT INTO estadios (nombre, capacidad, ciudad) VALUES (?, ?, ?)', [nombre, capacidad, ciudad]);
        res.json({ mensaje: 'Estadio registrado' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Editar estadio
router.put('/:id', async (req, res) => {
    const { nombre, capacidad, ciudad } = req.body;
    try {
        await db.query('UPDATE estadios SET nombre=?, capacidad=?, ciudad=? WHERE id=?', [nombre, capacidad, ciudad, req.params.id]);
        res.json({ mensaje: 'Estadio modificado' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Borrar estadio
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM estadios WHERE id=?', [req.params.id]);
        res.json({ mensaje: 'Estadio eliminado' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;