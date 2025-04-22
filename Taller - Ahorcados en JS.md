### Taller

#### Ahorcado

**Descripción**
Crea una versión sencilla del clásico “Ahorcado”. El jugador deberá adivinar una palabra letra a letra. Por cada fallo, dibujarás una parte del muñeco…

**Objetivos de aprendizaje**

- Crear y eliminar nodos dinámicamente (`.createElement()`, `.appendChild()`, `.removeChild()`).
- Manejar eventos de teclado (`keydown`) y de clic en botones.
- Navegar la estructura del DOM para actualizar el dibujo (por ejemplo, con `parentElement`, `firstElementChild`).

**Requisitos**

1. **Palabra oculta**:
   - Define un array de palabras en tu JS.
   - Al iniciar, selecciona una al azar y crea tantos `<span>` vacíos como letras tenga, agregándolos a un contenedor con `appendChild()`.
2. **Teclado virtual**:
   - Genera botones `A–Z` dinámicamente con `insertAdjacentHTML("beforeend", ...)` o `createElement()`.
   - Añade un listener `addEventListener("click", …)` a cada botón para procesar la letra.
3. **Lógica de aciertos/fallos**:
   - Al pulsar una letra, recorre la palabra oculta; si coincide, rellena el `<span>` correspondiente (`span.textContent = letra`).
   - Si no coincide, incrementa un contador de errores y dibuja una parte del ahorcado: por ejemplo, puedes tener 6 `<div class="parte">` ocultos y mostrarlos uno a uno con `element.style.display = "block"`.
4. **Reinicio**:
   - Añade un botón “Reiniciar” que limpie todo (`removeChild` o `replaceChildren`) y comience una nueva partida.