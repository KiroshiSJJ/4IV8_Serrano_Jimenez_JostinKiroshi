function validar(formulario) {
    //Validar nombre
    var nombre = formulario.nombre.value.trim();
    var abcOK = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (nombre.length < 3) {
        alert("Por favor ingrese un nombre mayor de tres caracteres.");
        formulario.nombre.focus();
        return false;
    }
    if (!abcOK.test(nombre)) {
        alert("Por favor escriba únicamente letras en el campo nombre.");
        formulario.nombre.focus();
        return false;
    }

    //Validar edad
    var edad = formulario.edad.value.trim();
    var edadOK = /^[0-9]+$/;

    if (edad === "" || !edadOK.test(edad)) {
        alert("Por favor escriba únicamente números en el campo edad.");
        formulario.edad.focus();
        return false;
    }

    //Validar email
    var email = formulario.email.value.trim();
    var correoelectronico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correoelectronico.test(email)) {
        alert("El formato de Email no es válido.");
        formulario.email.focus();
        return false;
    }

    alert("Enviando datos.");
    return true;
}