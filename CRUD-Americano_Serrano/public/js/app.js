// CONFIGURACIÓN DE ELEMENTOS DEL DOM
const tEquipos = document.getElementById('tabla-equipos');
const fEquipos = document.getElementById('form-equipos');
const btnEquipos = document.getElementById('btn-equipos');

const tJugadores = document.getElementById('tabla-jugadores');
const fJugadores = document.getElementById('form-jugadores');
const btnJugadores = document.getElementById('btn-jugadores');

const tEstadios = document.getElementById('tabla-estadios');
const fEstadios = document.getElementById('form-estadios');
const btnEstadios = document.getElementById('btn-estadios');

const tPartidos = document.getElementById('tabla-partidos');
const fPartidos = document.getElementById('form-partidos');
const btnPartidos = document.getElementById('btn-partidos');

// Variables
let editandoEquipoId = null;
let editandoJugadorId = null;
let editandoEstadioId = null;
let editandoPartidoId = null;

// 1. APARTADO: EQUIPOS
async function cargarEquipos() {
    try {
        const res = await fetch('/api/equipos');
        const datos = await res.json();
        tEquipos.innerHTML = '';
        datos.forEach(eq => {
            tEquipos.innerHTML += `
                <tr>
                    <td>${eq.id}</td>
                    <td>${eq.nombre}</td>
                    <td>${eq.ciudad}</td>
                    <td>${eq.conferencia}</td>
                    <td>
                        <button class="btn-warning" onclick="prepararEditarEquipo(${eq.id}, '${eq.nombre}', '${eq.ciudad}', '${eq.conferencia}')">Editar</button>
                        <button class="btn-danger" onclick="eliminarEquipo(${eq.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error("Error al cargar equipos:", err);
    }
}

function prepararEditarEquipo(id, nombre, ciudad, conferencia) {
    editandoEquipoId = id;
    document.getElementById('eq-nombre').value = nombre;
    document.getElementById('eq-ciudad').value = ciudad;
    document.getElementById('eq-conferencia').value = conferencia;
    btnEquipos.textContent = "Actualizar Equipo";
    btnEquipos.classList.add('btn-edit-mode');
}

fEquipos.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('eq-nombre').value.trim();
    const city = document.getElementById('eq-ciudad').value.trim();
    const conf = document.getElementById('eq-conferencia').value.trim();

    if (/\d/.test(nombre) || /\d/.test(city) || /\d/.test(conf)) {
        alert("El nombre, la ciudad y la conferencia del equipo NO pueden contener números.");
        return;
    }

    if (editandoEquipoId) {
        // Modo Editar (PUT)
        await fetch(`/api/equipos/${editandoEquipoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, ciudad: city, conferencia: conf })
        });
        editandoEquipoId = null;
        btnEquipos.textContent = "Guardar Equipo";
        btnEquipos.classList.remove('btn-edit-mode');
    } else {
        // Modo Registrar (POST)
        await fetch('/api/equipos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, ciudad: city, conferencia: conf })
        });
    }
    fEquipos.reset();
    cargarEquipos();
});

async function eliminarEquipo(id) {
    if (confirm('¿Seguro que deseas eliminar este equipo?')) {
        await fetch(`/api/equipos/${id}`, { method: 'DELETE' });
        cargarEquipos();
    }
}

// 2. APARTADO: JUGADORES
async function cargarJugadores() {
    try {
        const res = await fetch('/api/jugadores');
        const datos = await res.json();
        tJugadores.innerHTML = '';
        datos.forEach(jug => {
            tJugadores.innerHTML += `
                <tr>
                    <td>${jug.id}</td>
                    <td>${jug.nombre}</td>
                    <td>${jug.posicion}</td>
                    <td>${jug.jersey}</td>
                    <td>
                        <button class="btn-warning" onclick="prepararEditarJugador(${jug.id}, '${jug.nombre}', '${jug.posicion}', ${jug.jersey})">Editar</button>
                        <button class="btn-danger" onclick="eliminarJugador(${jug.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error("Error al cargar jugadores:", err);
    }
}

function prepararEditarJugador(id, nombre, posicion, jersey) {
    editandoJugadorId = id;
    document.getElementById('jug-nombre').value = nombre;
    document.getElementById('jug-posicion').value = posicion;
    document.getElementById('jug-jersey').value = jersey;
    btnJugadores.textContent = "Actualizar Jugador";
    btnJugadores.classList.add('btn-edit-mode');
}

fJugadores.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('jug-nombre').value.trim();
    const posicion = document.getElementById('jug-posicion').value;
    const jersey = document.getElementById('jug-jersey').value;

    if (/\d/.test(nombre)) {
        alert("El nombre del jugador no puede contener números.");
        return;
    }
    const numJersey = parseInt(jersey);

    if (editandoJugadorId) {
        // Modo Editar (PUT)
        await fetch(`/api/jugadores/${editandoJugadorId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, posicion, jersey: numJersey })
        });
        editandoJugadorId = null;
        btnJugadores.textContent = "Guardar Jugador";
        btnJugadores.classList.remove('btn-edit-mode');
    } else {
        // Modo Registrar (POST)
        await fetch('/api/jugadores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, posicion, jersey: numJersey })
        });
    }
    fJugadores.reset();
    cargarJugadores();
});

async function eliminarJugador(id) {
    if (confirm('¿Seguro que deseas borrar a este jugador?')) {
        await fetch(`/api/jugadores/${id}`, { method: 'DELETE' });
        cargarJugadores();
    }
}

// 3. APARTADO: Estadios
async function cargarEstadios() {
    try {
        const res = await fetch('/api/estadios');
        const datos = await res.json();
        tEstadios.innerHTML = '';
        datos.forEach(est => {
            tEstadios.innerHTML += `
                <tr>
                    <td>${est.id}</td>
                    <td>${est.nombre}</td>
                    <td>${est.capacidad.toLocaleString()}</td>
                    <td>${est.ciudad}</td>
                    <td>
                        <button class="btn-warning" onclick="prepararEditarEstadio(${est.id}, '${est.nombre}', ${est.capacidad}, '${est.ciudad}')">Editar</button>
                        <button class="btn-danger" onclick="eliminarEstadio(${est.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error("Error al cargar estadios:", err);
    }
}

function prepararEditarEstadio(id, nombre, capacidad, ciudad) {
    editandoEstadioId = id;
    document.getElementById('est-nombre').value = nombre;
    document.getElementById('est-capacidad').value = capacidad;
    document.getElementById('est-ciudad').value = ciudad;
    btnEstadios.textContent = "Actualizar Estadio";
    btnEstadios.classList.add('btn-edit-mode');
}

fEstadios.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('est-nombre').value.trim();
    const capacidad = document.getElementById('est-capacidad').value;
    const ciudad = document.getElementById('est-ciudad').value.trim();

    if (/\d/.test(ciudad)) {
        alert("La ciudad del estadio no puede contener números.");
        return;
    }
    const capNum = parseInt(capacidad);

    if (editandoEstadioId) {
        // Modo Editar (PUT)
        await fetch(`/api/estadios/${editandoEstadioId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, capacidad: capNum, ciudad })
        });
        editandoEstadioId = null;
        btnEstadios.textContent = "Guardar Estadio";
        btnEstadios.classList.remove('btn-edit-mode');
    } else {
        // Modo Registrar (POST)
        await fetch('/api/estadios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, capacidad: capNum, ciudad })
        });
    }
    fEstadios.reset();
    cargarEstadios();
});

async function eliminarEstadio(id) {
    if (confirm('¿Seguro que deseas eliminar este estadio?')) {
        await fetch(`/api/estadios/${id}`, { method: 'DELETE' });
        cargarEstadios();
    }
}


// 4. APARTADO: Partidos
async function cargarPartidos() {
    try {
        const res = await fetch('/api/partidos');
        const datos = await res.json();
        tPartidos.innerHTML = '';
        datos.forEach(par => {
            tPartidos.innerHTML += `
                <tr>
                    <td>${par.id}</td>
                    <td>${par.local}</td>
                    <td>${par.visitante}</td>
                    <td>${par.marcador}</td>
                    <td>
                        <button class="btn-warning" onclick="prepararEditarPartido(${par.id}, '${par.local}', '${par.visitante}', '${par.marcador}')">Editar</button>
                        <button class="btn-danger" onclick="eliminarPartido(${par.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error("Error al cargar partidos:", err);
    }
}

function prepararEditarPartido(id, local, visitante, marcador) {
    editandoPartidoId = id;
    document.getElementById('par-local').value = local;
    document.getElementById('par-visitante').value = visitante;
    document.getElementById('par-marcador').value = marcador;
    btnPartidos.textContent = "Actualizar Partido";
    btnPartidos.classList.add('btn-edit-mode');
}

fPartidos.addEventListener('submit', async (e) => {
    e.preventDefault();
    const local = document.getElementById('par-local').value.trim();
    const visitante = document.getElementById('par-visitante').value.trim();
    const marcador = document.getElementById('par-marcador').value.trim();

    if (/\d/.test(local) || /\d/.test(visitante)) {
        alert("Los nombres de los equipos no pueden contener números.");
        return;
    }

    if (editandoPartidoId) {
        // Modo Editar (PUT)
        await fetch(`/api/partidos/${editandoPartidoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ local, visitante, marcador })
        });
        editandoPartidoId = null;
        btnPartidos.textContent = "Guardar Partido";
        btnPartidos.classList.remove('btn-edit-mode');
    } else {
        // Momo Registrar (POST)
        await fetch('/api/partidos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ local, visitante, marcador })
        });
    }
    fPartidos.reset();
    cargarPartidos();
});

async function eliminarPartido(id) {
    if (confirm('¿Seguro que deseas eliminar este partido?')) {
        await fetch(`/api/partidos/${id}`, { method: 'DELETE' });
        cargarPartidos();
    }
}

window.onload = () => {
    cargarEquipos();
    cargarJugadores();
    cargarEstadios();
    cargarPartidos();
};