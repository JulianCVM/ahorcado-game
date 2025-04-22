# 🎮 Juego del Ahorcado

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📝 Descripción

Este proyecto implementa el clásico juego del ahorcado utilizando tecnologías web estándar. El jugador debe adivinar una palabra letra por letra antes de que se complete el dibujo del ahorcado. Una experiencia interactiva perfecta para practicar y mejorar tus habilidades en JavaScript.

## 📋 Explicación del Código

### 1. Gestión de Palabras

```javascript
let palabras = ['Hola', 'Mundo', 'JavaScript', 'Adivina', 'Palabra', 'Ahorcado'];
let cantidadPalabras = palabras.length;
let palabraAleatoria = palabras[Math.floor(Math.random() * cantidadPalabras)];
let palabraAleatoriaMinuscula = palabraAleatoria.toLowerCase();
let palabraOculta = palabraAleatoriaMinuscula.split('');
```

- Se inicia con un array de posibles palabras a adivinar
- Se selecciona una palabra aleatoria mediante `Math.random()` y `Math.floor()`
- La palabra se convierte a minúsculas para facilitar las comparaciones
- Se crea un array `palabraOculta` que contiene cada letra de la palabra seleccionada

### 2. Inicialización del Juego

```javascript
document.addEventListener('DOMContentLoaded', (event) => {
    // Generar espacios para las letras
    for(let i = 0; i < cantidadLetras; i++){
        palabra.innerHTML += `<span id="letra-${i}">_ </span>`;
    }
    palabra.innerHTML = palabra.innerHTML.trim();
    
    // Crear la estructura de la horca
    const horca = document.createElement(`div`);
    horca.classList.add(`horca`);
    
    const soga = document.createElement(`span`);
    soga.classList.add(`soga`);
    
    horca.appendChild(soga);
    muñeco.appendChild(horca);
});
```

- Al cargar la página, se crean espacios (guiones bajos) para cada letra de la palabra
- Se elimina cualquier espacio en blanco extra con `trim()`
- Se crea dinámicamente la base de la horca mediante JavaScript

### 3. Doble Sistema de Entrada (Teclado Físico y Virtual)

#### Teclado Físico:

```javascript
document.addEventListener('keydown', (event) => {
    let letra = event.key;
    letra = letra.toLowerCase();
    
    if(letrasPresionadas.includes(letra) || !abecedario.includes(letra) || juegoTerminado){
        console.log('La letra ya fue presionada');
    } else {
        letrasPresionadas.push(letra);
        let teclaASCII = recibirTeclaASCII(event);
        deshabilitarTeclado(teclaASCII);
        
        // Verificación de letra...
    }
});
```

- Se capturan los eventos `keydown` del teclado
- Se convierte la letra a minúscula para estandarizar
- Se verifica si la letra ya fue usada o no es parte del abecedario
- Cuando se presiona una tecla, también se deshabilita el botón correspondiente en el teclado virtual

#### Teclado Virtual:

```javascript
document.addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON'){
        let tecla = event.target;
        let teclaASCII = tecla.id;
        let letra = tecla.textContent;
        
        if(!letrasPresionadas.includes(letra.toLowerCase()) && !juegoTerminado){
            // Procesamiento de la letra...
        }
    }
});
```

- Se detectan los clics en los botones del teclado virtual
- Cada botón tiene un ID que corresponde al código ASCII de la letra
- Se procesa la letra de manera similar al teclado físico

### 4. Procesamiento de Letras y Lógica del Juego

```javascript
if(palabraOculta.includes(letra.toLowerCase())){
    acerto.innerHTML = parseInt(acerto.innerHTML) + 1;
    palabraOculta = palabraOculta.filter(l => l !== letra.toLowerCase());
    
    let posiciones = encontrarPosicionLetra(letra.toLowerCase());
    for(let i = 0; i < posiciones.length; i++){
        palabra.innerHTML = palabra.innerHTML.replace(`<span id="letra-${posiciones[i]}">_ </span>`, 
        `<span id="letra-${posiciones[i]}">${letra.toLowerCase()} </span>`);
    }
    
    // Verificar victoria
    if(palabraOculta.length === 0){
        juegoGanado = true;
        alert('¡Has ganado! La palabra era: ' + palabraAleatoria);
        juegoTerminado = true;
    }
} else {
    error.innerHTML = parseInt(error.innerHTML) + 1;
    dibujarParteMuneco(parseInt(error.innerHTML));
    
    // Verificar derrota
    if(parseInt(error.innerHTML) >= 6){
        alert('¡Has perdido! La palabra era: ' + palabraAleatoria);
        juegoTerminado = true;
    }
}
```

- Si la letra existe en la palabra, se:
  - Incrementa el contador de aciertos
  - Elimina esa letra del array `palabraOculta`
  - Reemplaza los guiones en las posiciones correspondientes
  - Verifica si todas las letras fueron adivinadas (victoria)
  
- Si la letra no existe, se:
  - Incrementa el contador de errores
  - Dibuja una parte del muñeco
  - Verifica si se acumularon 6 errores (derrota)

### 5. Función de Búsqueda de Posiciones

```javascript
function encontrarPosicionLetra(letra) {
    let posiciones = [];
    for(let i = 0; i < palabraAleatoriaMinuscula.length; i++) {
        if(palabraAleatoriaMinuscula[i] === letra) {
            posiciones.push(i);
        }
    }
    return posiciones;
}
```

- Recorre la palabra y encuentra todas las posiciones donde aparece la letra
- Permite manejar palabras con letras repetidas
- Retorna un array con todas las posiciones encontradas

### 6. Dibujo Progresivo del Muñeco

```javascript
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
```

- Cada vez que se comete un error, se dibuja una parte del muñeco
- Las partes se dibujan en secuencia: cabeza, cuerpo, brazos y piernas
- Se utiliza un switch para determinar qué elemento crear en función del número de error
- Cada elemento se agrega al contenedor del muñeco mediante `appendChild()`

### 7. Gestión del Teclado Virtual

```javascript
function deshabilitarTeclado(teclaASCII){
    botonesTeclado.forEach(boton => {
        if(parseInt(boton.id) === teclaASCII){
            boton.disabled = true;
            boton.style.backgroundColor = 'gray';
        }
    }); 
}
```

- Cuando se usa una letra, el botón correspondiente se deshabilita
- Se cambia el estilo visual para indicar que ya no está disponible
- Funciona tanto para teclas físicas como para clics en el teclado virtual

### 8. Reinicio del Juego

```javascript
btnReiniciar.addEventListener('click', () => {
    location.reload();
});
```

- El juego se reinicia completamente al hacer clic en el botón "Reiniciar"
- Se usa `location.reload()` para refrescar la página y comenzar un nuevo juego
- Esto reinicia todas las variables y el estado del juego

## 💡 Aspectos Técnicos Destacados

- **Manipulación dinámica del DOM**: Creación y modificación de elementos HTML en tiempo de ejecución
- **Control de eventos**: Gestión de eventos de teclado y clic para una experiencia interactiva
- **Estructuras de datos**: Uso de arrays y métodos como `filter()` para manejar el estado del juego
- **Lógica de juego**: Sistemas de victoria/derrota y feedback visual inmediato
- **CSS avanzado**: Uso de animaciones, pseudoelementos y variables CSS para crear una interfaz atractiva

## 🚀 Cómo Ejecutar

1. Clona este repositorio
2. Abre el archivo `index.html` en tu navegador
3. ¡Comienza a jugar y diviértete!

## 👨‍💻 Desarrollado como parte del taller de JavaScript
