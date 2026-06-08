//Vamos hacer un viaje en el tiempo y ahora vamos a programar todo bajo el esquema ES6
/* Para Jaavascript ya conocemos el concepto de variable

var 

se sustituye por las nuevas variables: 

let --> es una variable de tipo ""protegida, ya que solo funciona dentro de un fragmento de codigo

const --> si es constante


if(true){
    const x = "x";
    console.log(x);
}

let x = "y";
console.log(x);



//PARA DECLARAR EN JAVASCRIPT LAS FUNCIONES HAY UNA FROMA MAS EFECTIVA PARA DECLARARLAS Y A PARTIR DE UNA FUNCION FLECHA

//una funcion flecha en JS a diferencia de una funcion normal, no genera su propio contexto (this), necesita ser declarada antes de ser usada y no necesita un return

//funtion cosa(String hola){ this.hola = hola}

//vamos a hacer una funcion que sume dos numeros

function sumarnumeros(n1, n2){
    return n1 + n2;
}

const sumarDosNumeros = (n1,n2) => n1+n2;

console.log(`la suma de la función es: (2,3): ${sumarnumeros(2,3)} ` );

console.log(`la suma de la función es: (4,3): ${sumarDosNumeros(5,2)} ` );

//para armar una funcion flecha debemos entender su estructura:
// "cadena" (tipo de variable, nombre de la funcion y los argumentos)  => operación


*/

const razaDePerros = [
    "Gran Danes",
    "Doverman",
    "Chihuahua",
    "Pastor Aleman",
    "Pitbull",
    "San Bernardo",
    "Xoloescuincle"
];

/*
for(let i = 0; i < razaDePerros.length; i++){
    console.log(razaDePerros[i]);
}

for(const raza of razaDePerros){
    console.log(raza);
}

for(const indice in razaDePerros){
    console.log(razaDePerros[indice]);
}

forEach
Iterar sobre elemetnos de arreglo que devueleven nada

razaDePerros.forEach((raza, indice, arregloOriginal) => console.log(raza));


razaDePerros.forEach(raza => console.log(raza));

Por ejemplo necesitamos una funcion para bscar la raza Chihuahua y si no existe agregarla


//funcion map esta funcion itera sobre los elementos del arreglo y regresa un arreglo diferente con él podemos hacer lo que queramos sin necesidad de modificar el arreglo original

const razasDePerrosEnMayusculas = razaDePerros.map((razaDePerros, InputDeviceInfo, arregloOriginal) => console.log(razaDePerros.toUpperCase()));
*/

if(razaDePerros.find(raza => raza === "Chihuahua")){
    console.log("La raza si se encontro y es Chihuahua")
    console.log(razaDePerros);
}else{
    razaDePerros.push("Chihuahua");
    console.log("Se agrego Chihuahua al arreglo");
    console.log(razaDePerros);
}