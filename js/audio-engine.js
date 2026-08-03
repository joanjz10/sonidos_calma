let audioContext = null;

function obtenerAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function aplicarFadeIn(nodoGanancia, contexto, duracion = 2) {
  const volumenFinal = nodoGanancia.gain.value;
  nodoGanancia.gain.setValueAtTime(0, contexto.currentTime);
  nodoGanancia.gain.linearRampToValueAtTime(volumenFinal, contexto.currentTime + duracion);
}

function aplicarFadeOut(nodoGanancia, contexto, duracion = 2) {
  const volumenActual = nodoGanancia.gain.value;
  nodoGanancia.gain.setValueAtTime(volumenActual, contexto.currentTime);
  nodoGanancia.gain.linearRampToValueAtTime(0, contexto.currentTime + duracion);
}

async function cargarSonido(url) {
  const contexto = obtenerAudioContext();
  const respuesta = await fetch(url);
  const datosArrayBuffer = await respuesta.arrayBuffer();
  const buffer = await contexto.decodeAudioData(datosArrayBuffer);
  return buffer;
}

async function reproducirLluviaReal() {
  const contexto = obtenerAudioContext();
  const buffer = await cargarSonido('assets/sonidos/sonido_lluvia.wav');

  const fuente = contexto.createBufferSource();
  fuente.buffer = buffer;
  fuente.loop = true;

  const volumen = contexto.createGain();
  volumen.gain.value = 1;

  fuente.connect(volumen);
  volumen.connect(contexto.destination);

  fuente.start();
  aplicarFadeIn(volumen, contexto);

  return { fuente, volumen };
}

async function reproducirOlasReal() {
  const contexto = obtenerAudioContext();
  const buffer = await cargarSonido('assets/sonidos/sonido_oceano.wav');

  const fuente = contexto.createBufferSource();
  fuente.buffer = buffer;
  fuente.loop = true;

  const volumen = contexto.createGain();
  volumen.gain.value = 1;

  fuente.connect(volumen);
  volumen.connect(contexto.destination);

  fuente.start();
  aplicarFadeIn(volumen, contexto);

  return { fuente, volumen };
}

async function reproducirBosqueReal() {
  const contexto = obtenerAudioContext();
  const buffer = await cargarSonido('assets/sonidos/sonido_bosque.wav');

  const fuente = contexto.createBufferSource();
  fuente.buffer = buffer;
  fuente.loop = true;

  const volumen = contexto.createGain();
  volumen.gain.value = 1;

  fuente.connect(volumen);
  volumen.connect(contexto.destination);

  fuente.start();
  aplicarFadeIn(volumen, contexto);

  return { fuente, volumen };
}

async function reproducirFuegoReal() {
  const contexto = obtenerAudioContext();
  const buffer = await cargarSonido('assets/sonidos/sonido_fuego.wav');

  const fuente = contexto.createBufferSource();
  fuente.buffer = buffer;
  fuente.loop = true;

  const volumen = contexto.createGain();
  volumen.gain.value = 1;

  fuente.connect(volumen);
  volumen.connect(contexto.destination);

  fuente.start();
  aplicarFadeIn(volumen, contexto);

  return { fuente, volumen };
}

async function reproducirRuidoRosaReal() {
  const contexto = obtenerAudioContext();
  const buffer = await cargarSonido('assets/sonidos/sonido_rosa.wav');

  const fuente = contexto.createBufferSource();
  fuente.buffer = buffer;
  fuente.loop = true;

  const volumen = contexto.createGain();
  volumen.gain.value = 1;

  fuente.connect(volumen);
  volumen.connect(contexto.destination);

  fuente.start();
  aplicarFadeIn(volumen, contexto);

  return { fuente, volumen };
}