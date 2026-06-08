const express = require('express');
const router = express.Router();
const db = require('../DB/database');

// Obtener la lista de jugadores
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM jugadores');
        res.json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Registrar un jugador
router.post('/', async (req, res) => {
    const { nombre, posicion, jersey } = req.body;
    try {
        await db.query('INSERT INTO jugadores (nombre, posicion, jersey) VALUES (?, ?, ?)', [nombre, posicion, jersey]);
        res.json({ mensaje: 'Jugador registrado' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Editar un jugador
router.put('/:id', async (req, res) => {
    const { nombre, posicion, jersey } = req.body;
    try {
        await db.query('UPDATE jugadores SET nombre=?, posicion=?, jersey=? WHERE id=?', [nombre, posicion, jersey, req.params.id]);
        res.json({ mensaje: 'Jugador modificado' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Borrar un jugador
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM jugadores WHERE id=?', [req.params.id]);
        res.json({ mensaje: 'Jugador eliminado' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;