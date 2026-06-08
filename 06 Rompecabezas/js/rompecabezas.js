var instrucciones = [
    "Utiliza las flechas de navegacion para mover las piezas",
    "Ordena las piezas hasta alcanzar el objetivo"
];

//aqui van las flechas
var movimientos = [];

//matriz del rompecabezas
var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var rompeCorrecto = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];    

//posición de la pieza vacía
var filaVacia = 2;
var columnaVacia = 2;

//mostrar instrucciones
function mostrarInstrucciones(instrucciones){
    for(var i = 0; i < instrucciones.length; i++){
        mostrarInstruccionesEnLista(instrucciones[i], "lista-instrucciones");
    }
}

function mostrarInstruccionesEnLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

function agregarUltimoMovimiento(direccion) {
    movimientos.push(direccion);
}

//checar si ganó
function checarSiGane(){
    for(var i = 0; i < rompe.length; i++){
        for(var j = 0; j < rompe[i].length; j++){
            if(rompe[i][j] !== rompeCorrecto[i][j]){
                return false;
            }
        }
    }
    return true;
}

function mostrarCartelganador(){
    if(checarSiGane()){
        alert("Wiiiiiii a mimir (o.o)/ ");
    }
}

//intercambiar en matriz
function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columnaPos2){
    var temp = rompe[filaPos1][columnaPos1];
    rompe[filaPos1][columnaPos1] = rompe[filaPos2][columnaPos2];
    rompe[filaPos2][columnaPos2] = temp;
}

//actualizar vacío
function actualizarPosicionVacia(nuevaFila, nuevaColumna){
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

//validar posición
function posicionValida(fila, columna){
    return (fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2);
}

//códigos de teclas
var codigosDireccion = {
    IZQUIERDA : 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO : 40
};

//mover piezas
function moverEnDireccion(direccion){
    var nuevaFilaVacia = filaVacia;
    var nuevaColumnaVacia = columnaVacia;

    if(direccion === codigosDireccion.ABAJO){
        nuevaFilaVacia++;
    } else if(direccion === codigosDireccion.ARRIBA){
        nuevaFilaVacia--;
    } else if(direccion === codigosDireccion.DERECHA){
        nuevaColumnaVacia++;
    } else if(direccion === codigosDireccion.IZQUIERDA){
        nuevaColumnaVacia--;
    }

    if(posicionValida(nuevaFilaVacia, nuevaColumnaVacia)){
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaVacia, nuevaColumnaVacia);
        actualizarPosicionVacia(nuevaFilaVacia, nuevaColumnaVacia);
        agregarUltimoMovimiento(direccion);
    }
}

function intercambiarPosiciones(fila1, columna1, fila2, columna2){
    var pieza1 = rompe[fila1][columna1];
    var pieza2 = rompe[fila2][columna2];

    intercambiarPosicionesRompe(fila1, columna1, fila2, columna2);
    intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);
}

function intercambiarPosicionesDOM(idPieza1, idPieza2){
    var elementoPieza1 = document.getElementById(idPieza1);
    var elementoPieza2 = document.getElementById(idPieza2);

    var padre = elementoPieza1.parentNode;

    var clone1 = elementoPieza1.cloneNode(true);
    var clone2 = elementoPieza2.cloneNode(true);

    padre.replaceChild(clone1, elementoPieza2);
    padre.replaceChild(clone2, elementoPieza1);
}

//último movimiento visual
function actualizarUltimoMoviento(direccion){
    var ultimoMov = document.getElementById('flecha');

    switch(direccion){
        case codigosDireccion.ARRIBA:
            ultimoMov.textContent = '↑';
            break;
        case codigosDireccion.ABAJO:
            ultimoMov.textContent = '↓';
            break;
        case codigosDireccion.DERECHA:
            ultimoMov.textContent = '→';
            break;
        case codigosDireccion.IZQUIERDA:
            ultimoMov.textContent = '←';
            break;
    }
}

//mezclar piezas (CORREGIDO)
function mezclarPiezas(veces){
    if(veces <= 0){
        return;
    }

    var direcciones = [
        codigosDireccion.ABAJO, 
        codigosDireccion.ARRIBA, 
        codigosDireccion.DERECHA, 
        codigosDireccion.IZQUIERDA
    ];

    var direccionValida = false;

    while(!direccionValida){
        var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];

        var nuevaFila = filaVacia;
        var nuevaColumna = columnaVacia;

        if(direccion === codigosDireccion.ABAJO){
            nuevaFila++;
        } else if(direccion === codigosDireccion.ARRIBA){
            nuevaFila--;
        } else if(direccion === codigosDireccion.DERECHA){
            nuevaColumna++;
        } else if(direccion === codigosDireccion.IZQUIERDA){
            nuevaColumna--;
        }

        if(posicionValida(nuevaFila, nuevaColumna)){
            direccionValida = true;
            moverEnDireccion(direccion);
        }
    }

    setTimeout(function(){
        mezclarPiezas(veces - 1);
    }, 100);
}

//capturar teclado
function capturarTeclas(){
    document.body.onkeydown = function(evento){
        if(
            evento.which === codigosDireccion.ABAJO ||
            evento.which === codigosDireccion.ARRIBA ||
            evento.which === codigosDireccion.DERECHA ||
            evento.which === codigosDireccion.IZQUIERDA
        ){
            moverEnDireccion(evento.which);
            actualizarUltimoMoviento(evento.which);

            if(checarSiGane()){
                setTimeout(function(){
                    mostrarCartelganador();
                }, 500);
            }

            evento.preventDefault();
        }
    };
}

//iniciar
function iniciar(){
    mezclarPiezas(30);
    capturarTeclas();
}

iniciar();
mostrarInstrucciones(instrucciones);