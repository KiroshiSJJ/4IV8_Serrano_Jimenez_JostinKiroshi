//Validación numeros positivos
function esPositivo(n) {
    return n >= 0;
}

//Validación 1er ejercicio
function calcularInversion() {
    let cap = parseFloat(document.getElementById('capital').value) || 0;
    if (!esPositivo(cap)) return alert("El capital no puede ser negativo");
    document.getElementById('res1').innerText = "Ganancia: $" + (cap * 0.02).toFixed(2);
}

//Validación 2do ejercicio
function calcularSueldo() {
    let b = parseFloat(document.getElementById('sueldoBase').value) || 0;
    let v1 = parseFloat(document.getElementById('v1').value) || 0;
    let v2 = parseFloat(document.getElementById('v2').value) || 0;
    let v3 = parseFloat(document.getElementById('v3').value) || 0;
    
    if (!esPositivo(b) || !esPositivo(v1) || !esPositivo(v2) || !esPositivo(v3)) {
        return alert("Los montos deben ser positivos");
    }
    let comision = (v1 + v2 + v3) * 0.10;
    document.getElementById('res2').innerText = "Total mensual: $" + (b + comision).toFixed(2);
}

//Validación 3ro ejercicio
function calcularDescuento() {
    let t = parseFloat(document.getElementById('compra').value) || 0;
    if (!esPositivo(t)) return alert("El monto no puede ser negativo");
    document.getElementById('res3').innerText = "Total a pagar: $" + (t * 0.85).toFixed(2);
}

//Validación 4to ejercicio

function esNotaValida(n) {
    return n >= 0 && n <= 10;
}

function calcularNota() {
    let p1 = parseFloat(document.getElementById('p1').value) || 0;
    let p2 = parseFloat(document.getElementById('p2').value) || 0;
    let p3 = parseFloat(document.getElementById('p3').value) || 0;
    let ex = parseFloat(document.getElementById('examen').value) || 0;
    let tr = parseFloat(document.getElementById('trabajo').value) || 0;

    if (!esNotaValida(p1) || !esNotaValida(p2) || !esNotaValida(p3) || !esNotaValida(ex) || !esNotaValida(tr)) {
        return alert("Las calificaciones deben estar entre 0 y 10");
    }

    let promP = (p1 + p2 + p3) / 3;
    let final = (promP * 0.55) + (ex * 0.3) + (tr * 0.15);
    document.getElementById('res4').innerText = "Calificación Final: " + final.toFixed(2);
}

//Validación 5to ejercicio
function calcularPorcentajes() {
    let h = parseInt(document.getElementById('hombres').value) || 0;
    let m = parseInt(document.getElementById('mujeres').value) || 0;
    if (!esPositivo(h) || !esPositivo(m)) return alert("Las cantidades deben ser positivas");
    
    let total = h + m;
    if (total > 0) {
        document.getElementById('res5').innerText = "Hombres: " + ((h/total)*100).toFixed(1) + "% | Mujeres: " + ((m/total)*100).toFixed(1) + "%";
    }
}

//Validación 6to ejercicio
function calcularEdad() {
    let fI = document.getElementById('fecha').value;
    if (!fI) return alert("Selecciona una fecha");
    let fN = new Date(fI);
    let hoy = new Date();
    if (fN > hoy) return alert("La fecha no puede ser futura");
    
    let edad = hoy.getFullYear() - fN.getFullYear();
    document.getElementById('res6').innerText = "Edad: " + edad + " años";
}