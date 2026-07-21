# Sonidos de Calma

Una app web sencilla para escuchar sonidos relajantes — lluvia, olas, ruido rosa — generados directamente en el navegador. La estoy construyendo para alguien cercano que vive con tinnitus (acúfenos) crónico, y que siente los sonidos más fuertes justo en el silencio de la noche.

## Por qué este proyecto

No es un proyecto de práctica cualquiera. Nace de una situación real: un familiar mío tiene un pitido constante en los oídos desde hace años, y empeora cuando todo está en silencio. Investigando encontré que la terapia de sonido (tener un ruido de fondo suave) es una recomendación real y respaldada para este tipo de casos — no cura el tinnitus, pero ayuda a que el cerebro deje de "engancharse" con el pitido.

Así que decidí construir algo yo mismo en vez de solo recomendarle una app cualquiera de la tienda. Quiero que sea:

- **Simple de usar** — sin menús raros, botones grandes, cero curva de aprendizaje. Si mi familiar no logra usarla en los primeros 10 segundos, fallé.
- **Ligera** — nada de frameworks pesados ni cargas lentas.
- **Funcional sin internet** — una vez que abre la página, no debería depender de conexión ni de archivos de audio pesados.

## Stack que estoy usando

| Tecnología | Para qué la uso |
|---|---|
| **HTML5 semántico** | Estructura de la página |
| **CSS3** | Diseño visual, tema oscuro, animaciones |
| **JavaScript vanilla** | Toda la lógica de la interfaz |
| **Web Audio API** | Generar los sonidos con código, sin archivos de audio |
| **LocalStorage** | Recordar el último sonido y volumen usados |
| **Git + GitHub** | Control de versiones |
| **VS Code + Live Server** | Mi entorno de desarrollo de siempre |

Decidí no usar archivos de audio grabados (.mp3) para los sonidos principales. Todo se genera con código, en tiempo real, usando el Web Audio API. Me pareció la parte más interesante de construir: aprender que el sonido, al final, es solo matemática — números que suben y bajan en el tiempo.

## Estructura del proyecto

```
sonidos-calma/
│
├── index.html              # Estructura semántica (Fase 1)
├── README.md
│
├── css/
│   └── style.css            # Estilos, tema oscuro, animaciones (Fase 2)
│
├── js/
│   ├── audio-engine.js      # Motor de sonido con Web Audio API (Fase 3)
│   └── app.js                # Conecta la interfaz con el motor (Fase 4)
│
├── assets/
│   └── favicon.svg
│
├── .claude/skills/
│   └── sonidos-calma-design/  # Skill propia: tokens de diseño de este proyecto
│       └── SKILL.md
│
├── .agents/skills/
│   └── frontend-design/       # Skill oficial de Anthropic (npx skills add)
│       └── SKILL.md
│
└── skills-lock.json          # Registro de versiones de las skills instaladas
```

Separé `audio-engine.js` de `app.js` a propósito: el motor de audio no necesita saber nada de botones ni del DOM, solo sabe generar sonido. `app.js` es el que conecta la interfaz con ese motor. Si mañana quiero cambiar el diseño, no toco el audio, y al revés.

Las carpetas de skills (`.claude/` y `.agents/`) no son parte de la app en sí — no se suben a producción, son solo guía para cuando trabajo con Claude Code en este proyecto. Las documento aquí para no olvidar por qué existen si vuelvo a este README en unos meses.

## Cómo voy a construirla — fases

Cada fase la voy cerrando con un commit, y no avanzo a la siguiente sin probar la anterior en el navegador.

### Fase 1 — HTML semántico
- [ ] `<header>` con el título y un mensaje de bienvenida cálido.
- [ ] `<main>` con: círculo de respiración, tarjetas de sonido (Lluvia, Olas, Bosque, Ruido rosa), control de volumen, temporizador de sueño.
- [ ] `<footer>` simple.
- [ ] Revisar accesibilidad básica: `lang="es"`, `aria-label` en los botones, `<label>` en el volumen.

### Fase 2 — CSS y diseño visual
- [ ] Paleta de colores en tema oscuro, tonos suaves.
- [ ] Tipografía legible, tamaños grandes.
- [ ] Tarjetas de sonido con estado "activo" claro.
- [ ] Animación del círculo de respiración (pulso lento y constante).
- [ ] Diseño responsive — pensado primero para celular.
- [ ] Contraste de color y foco de teclado visibles.

### Fase 3 — Motor de audio (`audio-engine.js`)
- [ ] `AudioContext`.
- [ ] Ruido blanco como base.
- [ ] Filtrar para obtener ruido rosa y ruido marrón (más suaves).
- [ ] Simular lluvia (ruido filtrado + gotas aleatorias).
- [ ] Simular olas (ruido modulado con un LFO que sube y baja el volumen).
- [ ] Fade in/out para que ningún sonido empiece o termine de golpe.

### Fase 4 — Interfaz interactiva (`app.js`)
- [ ] Clic en una tarjeta → inicia ese sonido y detiene cualquier otro.
- [ ] Volumen conectado en tiempo real.
- [ ] Temporizador de sueño con fade out al vencer.
- [ ] Círculo de respiración sincronizado con el estado de reproducción.
- [ ] Guardar en `localStorage` el último sonido y volumen.

### Fase 5 — Accesibilidad y pruebas
- [ ] Navegación solo con teclado.
- [ ] Prueba real en celular, no solo en el emulador.
- [ ] Textos legibles sin acercarse a la pantalla.
- [ ] Respetar `prefers-reduced-motion`.
- [ ] Favicon y título de pestaña.

### Fase 6 — Publicación
- [ ] Subir a GitHub.
- [ ] Publicar con GitHub Pages.
- [ ] Probar el link final en el celular real de mi familiar.
- [ ] (Más adelante) Convertirla en PWA para que funcione sin conexión.

## Cómo correrla localmente

1. Abrir la carpeta en VS Code.
2. Clic derecho sobre `index.html` → **Open with Live Server**.
3. Ver los cambios en vivo cada vez que guardo.

## Notas de diseño que quiero respetar

- Tema oscuro por defecto — se va a usar de noche.
- Botones grandes, sin pasos extra ni menús anidados.
- Nada de rojos ni colores de alerta — todo debe transmitir calma, incluso los errores.
- Sin animaciones bruscas ni parpadeos.