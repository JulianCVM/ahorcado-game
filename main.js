let palabras = ['Hola', 'Mundo', 'JavaScript', 'Adivina', 'Palabra', 'Ahorcado'];

let cantidadPalabras = palabras.length;

let palabraAleatoria = palabras[Math.floor(Math.random() * cantidadPalabras)];
let palabraAleatoriaMinuscula = palabraAleatoria.toLowerCase();
let palabraOculta = palabraAleatoriaMinuscula.split('');


let palabra = document.getElementById('palabra');
let acerto = document.getElementById('acerto');
let error = document.getElementById('error');
let teclado = document.getElementById('teclado');
let btnReiniciar = document.getElementById('btnReiniciar');
let muñeco = document.getElementById('muñeco');

//funcion para generar la palabra aleatoria
document.addEventListener('DOMContentLoaded', (event) => {

    let cantidadLetras = palabraAleatoriaMinuscula.length;
    console.log(palabraAleatoriaMinuscula);
    console.log(cantidadLetras);
    console.log(palabraOculta);


    for(let i = 0; i < cantidadLetras; i++){
        palabra.innerHTML += `<span id="letra-${i}">_ </span>`;
    }
    palabra.innerHTML = palabra.innerHTML.trim();
});


let letrasPresionadas = [];

let abecedario = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//funcion para recibir la letra del teclado
document.addEventListener('keydown', (event) => {
    // console.log(event.key);
    let letra = event.key;

    letra = letra.toLowerCase();


    // console.log(letrasPresionadas);

    if(letrasPresionadas.includes(letra) || !abecedario.includes(letra)){
        console.log('La letra ya fue presionada');
    }else{
        console.log('La letra no fue presionada');
        letrasPresionadas.push(letra);


        if(palabraOculta.includes(letra)){
            console.log('La letra existe en la palabra');
            acerto.innerHTML = parseInt(acerto.innerHTML) + 1;
            // palabraOculta.splice(palabraOculta.indexOf(letra), 1);
            palabraOculta = palabraOculta.filter(l => l !== letra);


            let posiciones = encontrarPosicionLetra(letra); 
            console.log(posiciones);
            for(let i = 0; i < posiciones.length; i++){
                palabra.innerHTML = palabra.innerHTML.replace(`<span id="letra-${posiciones[i]}">_ </span>`, `<span id="letra-${posiciones[i]}">${letra} </span>`);
            }  

            // palabra.innerHTML = palabra.innerHTML.replace(`<span id="letra-${posiciones}">_ </span>`, `<span id="letra-${posiciones}">${letra} </span>`);
            // console.log(encontrarPosicionLetra(letra));
            
            console.log(palabraOculta);

        }else{
            console.log('La letra no existe en la palabra');
            error.innerHTML = parseInt(error.innerHTML) + 1;
        }
    }

});


// function encontrarPosicionLetra(letra){
//     return palabraOculta.indexOf(letra);
// }

// function encontrarPosicionLetra(letra) {
//     for(let i = 0; i < palabraAleatoriaMinuscula.length; i++) {
//         if(palabraAleatoriaMinuscula[i] === letra) {
//             return i;
//         }
//     }
//     return -1;
// }
//funcion de encontrar la posicion de la letra arreglado, la diferencia con el anterior es que ahora se recorre la palabra aleatoria y se compara con la letra hasta encontrar la posicion donde se encuentra la letra y da el valor de esta posicion para luego usarla como indicador para reemplazar el guion bajo por la letra en la posicion que se encuentra la letra 
function encontrarPosicionLetra(letra) {
    let posiciones = [];
    for(let i = 0; i < palabraAleatoriaMinuscula.length; i++) {
        if(palabraAleatoriaMinuscula[i] === letra) {
            posiciones.push(i);
        }
    }
    return posiciones;
}
