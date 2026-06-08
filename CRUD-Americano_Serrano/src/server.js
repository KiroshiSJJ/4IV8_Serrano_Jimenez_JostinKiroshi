const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Configurar middlewares basicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir la carpeta public saliendo correctamente de la carpeta src
app.use(express.static(path.join(__dirname, '../public')));

// Enlazar los routers apuntando correctamente a la carpeta dentro de src
app.use('/api/equipos', require('./Routers/equipos'));
app.use('/api/jugadores', require('./Routers/jugadores'));
app.use('/api/estadios', require('./Routers/estadios'));
app.use('/api/partidos', require('./Routers/partidos'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});