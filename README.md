# Sonidos de Calma

Una app web sencilla para escuchar sonidos relajantes — lluvia, olas, ruido rosa — pensada para acompañar a alguien con tinnitus (acúfenos) crónico, que siente los sonidos más fuertes justo en el silencio de la noche.

## Por qué este proyecto

No es un proyecto de práctica cualquiera. Nace de una situación real: un familiar mío tiene un pitido constante en los oídos desde hace años, y empeora cuando todo está en silencio. Investigando encontré que la terapia de sonido (tener un ruido de fondo suave) es una recomendación real y respaldada para este tipo de casos — no cura el tinnitus, pero ayuda a que el cerebro deje de "engancharse" con el pitido.

Así que decidí construir algo yo mismo en vez de solo recomendarle una app cualquiera de la tienda. Quiero que sea:

- **Simple de usar** — sin menús raros, botones grandes, cero curva de aprendizaje. Si mi familiar no logra usarla en los primeros 10 segundos, fallé.
- **Ligera** — nada de frameworks pesados ni cargas lentas.
- **Funcional sin conexión a internet** — los sonidos son grabaciones reales, pero viven guardadas dentro del propio proyecto (no se transmiten desde ningún servidor externo), así que la app funciona igual con o sin internet una vez que la tienes descargada.

## Stack que estoy usando

| Tecnología | Para qué la uso |
|---|---|
| **HTML5 semántico** | Estructura de la página |
| **CSS3** | Diseño visual, tema oscuro, animaciones |
| **JavaScript vanilla** | Toda la lógica de la interfaz |
| **Web Audio API** | Reproducir, controlar volumen y aplicar fade in/out a los sonidos |
| **LocalStorage** | Recordar el último sonido y volumen usados |
| **Git + GitHub** | Control de versiones |
| **VS Code + Live Server** | Mi entorno de desarrollo de siempre |

Al principio decidí no usar archivos de audio grabados, y generar todo con código en tiempo real usando Web Audio API — me pareció la parte más interesante de construir: aprender que el sonido, al final, es solo matemática, números que suben y bajan en el tiempo. Construí un motor completo así (ruido filtrado, gotas con envolvente, olas con LFO), pero al compararlo con grabaciones reales, estas sonaban notablemente más naturales. Decidí priorizar la experiencia de quien va a usar la app por encima de mantenerme fiel al enfoque 100% sintetizado — el motor de síntesis quedó documentado en el historial de Git como parte del proceso.

## Créditos de los sonidos

Todos los sonidos son grabaciones reales, con licencias que permiten uso libre (incluyendo proyectos personales), obtenidas de Freesound.org:

- **Lluvia** — "Rain Ambience" por nick121087 — dominio público.
- **Olas** — "Ocean Waves.wav" por Noted451 — dominio público.
- **Bosque** — "Forest birds - ambient seamless loop" por Magnesus — CC0.
- **Fuego** — "fire crackling loop.wav" por soundofsong — CC0.
- **Ruido rosa** — "Pink Noise -20dBFS 30 Second.wav" por JarredGibb — CC0.

No es obligatorio dar crédito bajo estas licencias, pero lo hago de todas formas porque me parece justo reconocer el trabajo de quien grabó y compartió estos sonidos.

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
│   ├── favicon.svg
│   └── sonidos/
│       ├── sonido_lluvia.wav
│       ├── sonido_oceano.wav
│       ├── sonido_bosque.wav
│       ├── sonido_fuego.wav
│       └── sonido_rosa.wav
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
- [x] `<header>` con el título y un mensaje de bienvenida cálido.
- [x] `<main>` con: círculo de respiración, tarjetas de sonido (Lluvia, Olas, Bosque, Ruido rosa), control de volumen, temporizador de sueño.
- [x] `<footer>` simple.
- [x] Revisar accesibilidad básica: `lang="es"`, `aria-label` en los botones, `<label>` en el volumen.

### Fase 2 — CSS y diseño visual
- [x] Paleta de colores en tema oscuro, tonos suaves.
- [x] Tipografía legible, tamaños grandes.
- [x] Tarjetas de sonido con estado "activo" claro.
- [x] Animación del círculo de respiración (pulso lento y constante).
- [x] Diseño responsive — pensado primero para celular.
- [x] Contraste de color y foco de teclado visibles.

### Fase 3 — Motor de audio (`audio-engine.js`)
- [x] `AudioContext`.
- [x] Construí un motor completo de síntesis por código: ruido blanco, ruido rosa/marrón filtrados, gotas de lluvia con envolvente, olas con LFO, chispas de fuego, y pájaros con osciladores.
- [x] Comparé el resultado sintetizado contra grabaciones reales, y decidí priorizar las grabaciones por su calidad más natural.
- [x] Integré 5 grabaciones reales (lluvia, olas, bosque, fuego, ruido rosa), todas con licencias de uso libre.
- [x] Fade in/out aplicado a las 5 reproducciones, para que ningún sonido empiece o termine de golpe.

### Fase 4 — Interfaz interactiva (`app.js`)
- [x] Clic en una tarjeta → inicia ese sonido y detiene cualquier otro.
- [x] Volumen conectado en tiempo real.
- [x] Temporizador de sueño con fade out al vencer.
- [x] Círculo de respiración sincronizado con el estado de reproducción.
- [x] Guardar en `localStorage` el último sonido y volumen.

### Fase 5 — Accesibilidad y pruebas
- [x] Navegación solo con teclado.
- [x] Prueba real en celular, no solo en el emulador.
- [x] Textos legibles sin acercarse a la pantalla.
- [x] Respetar `prefers-reduced-motion`.
- [x] Favicon y título de pestaña.

### Fase 6 — Publicación
- [x] Subir a GitHub.
- [x] Publicar con GitHub Pages.
- [x] Probar el link final en el celular real de mi familiar.
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