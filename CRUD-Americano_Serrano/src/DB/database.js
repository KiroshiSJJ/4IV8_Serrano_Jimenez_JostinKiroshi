const mysql = require('mysql2');

// Crear la conexion a la base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'americano_db'
});

module.exports = pool.promise();