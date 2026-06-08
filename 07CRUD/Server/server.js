/* RESPUESTA PREGUNTA 1: 
En lugar de importar manualmente 'http', 'fs', 'path' y 'url' (líneas 3 a 9 del código original), utilizamos el framework "EXPRESS.JS". Este framework unifica y simplifica la creación de un servidor para Backend a su mínima expresión */
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

/* REEMPLAZO DE 'leerBody': 
Express incluye middlewares nativos. Esta línea reemplaza por completo la función manual 'leerBody(req)' que usaba promesas y eventos ('data', 'end') para parsear el JSON entrante */
app.use(express.json());

// Configuracion de la Base de Datos (igual que en el codigo original)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'pnt_practica1',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const db = pool.promise();

/* RESPUESTA PREGUNTA 2: CONFIGURACIÓN DE ARCHIVOS ESTÁTICOS Y RUTAS
A partir de la línea 29 se utilizaba código de Node.js construyendo manualmente. Eso no era un framework. Con el framework EXPRESS.JS, todo ese bloque de código se reduce a esta única línea de abajo. El middleware 'express.static' mapea automáticamente la  carpeta, lee los archivos de tipo MIME correspondientes por ti */
app.use(express.static(path.join(__dirname, 'public')));

/* PETICIONES (LOG):
Creamos un middleware para mantener el comportamiento de imprimir en consola cada petición (Método y Ruta) */
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
    next();
});

/* API (GET, POST, PUT, DELETE):
Express elimina la necesidad de procesar condicionales complejos dentro de un 'http.createServer' */

app.get('/api/datos', async (req, res) => {
    try {
        // Aquí puedes realizar consultas asíncronas usando la promesa 'db'
        // Ejemplo: const [rows] = await db.query('SELECT * FROM tu_tabla');
        res.status(200).json({ 
            status: "Éxito", 
            mensaje: "Servidor Backend simplificado y conectado exitosamente." 
        });
    } catch (error) {
        res.status(500).json({ error: "Error interno en el servidor o base de datos." });
    }
});

/* INICIALIZACIÓN DEL SERVIDOR:
Reemplaza al 'server.listen' del módulo HTTP nativo. */
app.listen(PORT, () => {
    console.log('Servidor inicializado con Express.js en el puerto: ' + PORT);
    console.log('Para salir presiona CTRL + C');
});