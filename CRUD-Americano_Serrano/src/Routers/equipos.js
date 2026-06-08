const express = require('express');
const router = express.Router();
const db = require('../DB/database'); // Conexion a la base de datos

// Obtener todos los equipos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM equipos');
        res.json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Registrar un equipo nuevo
router.post('/', async (req, res) => {
    const { nombre, ciudad, conferencia } = req.body;
    try {
        await db.query('INSERT INTO equipos (nombre, ciudad, conferencia) VALUES (?, ?, ?)', [nombre, ciudad, conferencia]);
        res.json({ mensaje: 'Equipo registrado' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Actualizar datos de un equipo
router.put('/:id', async (req, res) => {
    const { nombre, ciudad, conferencia } = req.body;
    try {
        await db.query('UPDATE equipos SET nombre=?, ciudad=?, conferencia=? WHERE id=?', [nombre, ciudad, conferencia, req.params.id]);
        res.json({ mensaje: 'Equipo modificado' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Eliminar un equipo
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM equipos WHERE id=?', [req.params.id]);
        res.json({ mensaje: 'Equipo eliminado' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;