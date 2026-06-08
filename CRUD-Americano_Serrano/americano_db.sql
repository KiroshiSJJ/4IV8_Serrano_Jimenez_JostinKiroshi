-- 1. contraseña= 'root'
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;

-- 2. Crear la base de datos
CREATE DATABASE americano_db;
USE americano_db;

-- 3. Tabla Equipos
CREATE TABLE equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    ciudad VARCHAR(50),
    conferencia VARCHAR(20)
);

-- 4. Tabla Jugadores
CREATE TABLE jugadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    posicion VARCHAR(20),
    jersey INT
);

-- 5. Tabla Estadios
CREATE TABLE estadios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    capacidad INT,
    ciudad VARCHAR(50)
);

-- 6. Tabla Partidos
CREATE TABLE partidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    local VARCHAR(50),
    visitante VARCHAR(50),
    marcador VARCHAR(20)
);