function problema1(){
    var p1_input = document.querySelector('#p1-input').value;
    var p1_output = document.querySelector('#p1-output');

    // Validación básica
    if(p1_input.trim() === ""){
        p1_output.textContent = "Error: Por favor ingresa palabras.";
        return;
    }

    // Dividir por espacios e invertir el array y unir
    var palabras = p1_input.split(' ');
    var resultado = palabras.reverse().join(' ');

    p1_output.textContent = resultado;
}

function problema2(){
    //vector 1 (datos de la tabla)
    var p2_x1 = Number(document.querySelector("#p2-x1").value);
    var p2_x2 = Number(document.querySelector('#p2-x2').value);
    var p2_x3 = Number(document.querySelector('#p2-x3').value);
    var p2_x4 = Number(document.querySelector('#p2-x4').value);
    var p2_x5 = Number(document.querySelector('#p2-x5').value);

    //vector 2
    var p2_y1 = Number(document.querySelector('#p2-y1').value);
    var p2_y2 = Number(document.querySelector('#p2-y2').value);
    var p2_y3 = Number(document.querySelector('#p2-y3').value);
    var p2_y4 = Number(document.querySelector('#p2-y4').value);
    var p2_y5 = Number(document.querySelector('#p2-y5').value);

    //creamos los vectores
    var v1 = [p2_x1, p2_x2, p2_x3, p2_x4, p2_x5];
    var v2 = [p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];

    //primero vamos a ordenar los elementos para permutarlos
    v1 = v1.sort(function(a,b){return b-a});
    v2 = v2.sort(function(a,b){return b-a});

    //para hacer la permutacion
    v2 = v2.reverse();

    var p2_producto = 0;

    for(var i=0; i < v1.length; i++){
        p2_producto += v1[i] * v2[i];
    }

    // Validación (no campos vacíos)
    if(isNaN(p2_producto)){
        document.querySelector('#p2-output').textContent = "Por favor, llena todos los campos.";
    } else {
        document.querySelector('#p2-output').textContent = "El producto escalar minimo es de: " + p2_producto;
    }
}

function problema3(){
    var p3_input = document.querySelector('#p3-input').value;
    var p3_output = document.querySelector('#p3-output');

    // Validación (Solo mayúsculas y comas)
    var regex = /^[A-Z,]+$/;

    if(!regex.test(p3_input)){
        p3_output.textContent = "Error: Solo mayúsculas A-Z y comas (sin espacios).";
        return;
    }

    var palabras = p3_input.split(',');
    var max_palabra = "";
    var max_caracteres = 0;

    palabras.forEach(function(palabra) {
        var caracteres = {};
        palabra.split('').forEach(function(letra) {
            caracteres[letra] = true;
        });

        var total_unicos = Object.keys(caracteres).length;

        if(total_unicos > max_caracteres){
            max_caracteres = total_unicos;
            max_palabra = palabra;
        }
    });

    p3_output.textContent = "La palabra con más caracteres únicos es: " + max_palabra + " (" + max_caracteres + ")";
}