const express = require('express');
const router = express.Router();
const db = require('../DB/database');

// Obtener lista de partidos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM partidos');
        res.json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Registrar un partido
router.post('/', async (req, res) => {
    const { local, visitante, marcador } = req.body;
    try {
        await db.query('INSERT INTO partidos (local, visitante, marcador) VALUES (?, ?, ?)', [local, visitante, marcador]);
        res.json({ mensaje: 'Partido registrado' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Editar un partido
router.put('/:id', async (req, res) => {
    const { local, visitante, marcador } = req.body;
    try {
        await db.query('UPDATE partidos SET local=?, visitante=?, marcador=? WHERE id=?', [local, visitante, marcador, req.params.id]);
        res.json({ mensaje: 'Partido modificado' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Borrar un partido
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM partidos WHERE id=?', [req.params.id]);
        res.json({ mensaje: 'Partido eliminado' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;