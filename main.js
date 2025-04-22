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

let juegoTerminado = false;

let juegoGanado = false;


let tecladoVirtual = document.getElementById('teclado');
let botonesTeclado = [];
for(let i = 65; i <= 90; i++) {
    botonesTeclado.push(document.getElementById(i.toString()));
}


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


    const horca = document.createElement(`div`);
    horca.classList.add(`horca`);
    
    const soga = document.createElement(`span`);
    soga.classList.add(`soga`);


    horca.appendChild(soga);
    muñeco.appendChild(horca);

});


let letrasPresionadas = [];

let abecedario = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//funcion para recibir la letra del teclado
document.addEventListener('keydown', (event) => {
    // console.log(event.key);
    let letra = event.key;

    letra = letra.toLowerCase();


    // console.log(letrasPresionadas);

    if(letrasPresionadas.includes(letra) || !abecedario.includes(letra) || juegoTerminado){
        console.log('La letra ya fue presionada');
    }else{
        console.log('La letra no fue presionada');
        letrasPresionadas.push(letra);




        let teclaASCII = recibirTeclaASCII(event);
        console.log(teclaASCII);
        deshabilitarTeclado(teclaASCII);





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

            if(palabraOculta.length === 0){
                juegoGanado = true;
                alert('¡Has ganado! La palabra era: ' + palabraAleatoria);
                juegoTerminado = true;
            }

        }else{
            console.log('La letra no existe en la palabra');
            error.innerHTML = parseInt(error.innerHTML) + 1;

            dibujarParteMuneco(parseInt(error.innerHTML));
            if(parseInt(error.innerHTML) >= 6){
                alert('¡Has perdido! La palabra era: ' + palabraAleatoria);
                juegoTerminado = true;
            }

        }
    }

});

document.addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON'){
        let tecla = event.target;
        let teclaASCII = tecla.id;
        let letra = tecla.textContent;

        if(!letrasPresionadas.includes(letra.toLowerCase()) && !juegoTerminado){
            letrasPresionadas.push(letra.toLowerCase());
            deshabilitarTeclado(parseInt(teclaASCII));

            if(palabraOculta.includes(letra.toLowerCase())){
                acerto.innerHTML = parseInt(acerto.innerHTML) + 1;
                palabraOculta = palabraOculta.filter(l => l !== letra.toLowerCase());
                let posiciones = encontrarPosicionLetra(letra.toLowerCase());
                for(let i = 0; i < posiciones.length; i++){
                    palabra.innerHTML = palabra.innerHTML.replace(`<span id="letra-${posiciones[i]}">_ </span>`, `<span id="letra-${posiciones[i]}">${letra.toLowerCase()} </span>`);
                }

                if(palabraOculta.length === 0){
                    juegoGanado = true;
                    alert('¡Has ganado! La palabra era: ' + palabraAleatoria);
                    juegoTerminado = true;
                }
            }else{
                error.innerHTML = parseInt(error.innerHTML) + 1;
                dibujarParteMuneco(parseInt(error.innerHTML));
                if(parseInt(error.innerHTML) >= 6){
                    alert('¡Has perdido! La palabra era: ' + palabraAleatoria);
                    juegoTerminado = true;
                }
            }
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


function dibujarParteMuneco(numError){
    const parte = document.createElement(`div`);

    switch(numError){
        case 1:
            parte.classList.add(`cabeza`);
            break;
        case 2:
            parte.classList.add(`cuerpo`);
            break;
        case 3:
            parte.classList.add(`brazo-izq`);
            break;
        case 4:
            parte.classList.add(`brazo-der`);
            break;
        case 5:
            parte.classList.add(`pierna-izq`);
            break;
        case 6:
            parte.classList.add(`pierna-der`);
            break;
    }

    muñeco.appendChild(parte);
}



btnReiniciar.addEventListener('click', () => {
    location.reload();
});


function recibirTeclaASCII(event){
    let tecla = event.key;
    tecla = tecla.toUpperCase();
    let teclaASCII = tecla.charCodeAt(0);
    return teclaASCII;
}


function deshabilitarTeclado(teclaASCII){
    botonesTeclado.forEach(boton => {
        if(parseInt(boton.id) === teclaASCII){
            boton.disabled = true;
            boton.style.backgroundColor = 'gray';
        }
    }); 
}

