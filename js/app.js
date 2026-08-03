let sonidoActual = null;

const funcionesSonido = {
    lluvia: reproducirLluviaReal,
    olas: reproducirOlasReal,
    bosque: reproducirBosqueReal,
    fuego: reproducirFuegoReal,
    rosa: reproducirRuidoRosaReal,
};

function detenerSonidoActual() {
    if (!sonidoActual) return;

    const contexto = obtenerAudioContext();
    aplicarFadeOut(sonidoActual.volumen, contexto);

    const fuenteADetener = sonidoActual.fuente;
    setTimeout(() => {
        fuenteADetener.stop();
    }, 2000);

    sonidoActual = null;
    desactivarRespiracion();
}

async function manejarClicTarjeta(boton) {
    const nombreSonido = boton.dataset.sonido;
    const funcion = funcionesSonido[nombreSonido];

    if (!funcion) return;

    detenerSonidoActual();

    document.querySelectorAll('.tarjeta-sonido').forEach((tarjeta) => {
        tarjeta.classList.remove('activo');
    });
    boton.classList.add('activo');

    const resultado = await funcion();
    sonidoActual = resultado;
    activarRespiracion();
    guardarPreferencias(nombreSonido, controlVolumen.value);
}

const tarjetas = document.querySelectorAll('.tarjeta-sonido');
tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener('click', () => {
        manejarClicTarjeta(tarjeta);
    });
});

const controlVolumen = document.querySelector('#control-volumen');

controlVolumen.addEventListener('input', () => {
    if (!sonidoActual) return;

    const valorSlider = controlVolumen.value;
    const volumenNormalizado = valorSlider / 100;

    sonidoActual.volumen.gain.value = volumenNormalizado;
    localStorage.setItem('ultimoVolumen', valorSlider);
});

let temporizadorSueno = null;

function cancelarTemporizadorSueno() {
    if (temporizadorSueno) {
        clearTimeout(temporizadorSueno);
        temporizadorSueno = null;
    }
}

function manejarClicTemporizador(boton) {
    const minutos = Number(boton.dataset.minutos);

    cancelarTemporizadorSueno();

    document.querySelectorAll('.boton-temporizador').forEach((b) => {
        b.classList.remove('activo');
    });
    boton.classList.add('activo');

    if (minutos === 0) return;

    const milisegundos = minutos * 60 * 1000;

    temporizadorSueno = setTimeout(() => {
        detenerSonidoActual();
    }, milisegundos);
}

const botonesTemporizador = document.querySelectorAll('.boton-temporizador');
botonesTemporizador.forEach((boton) => {
    boton.addEventListener('click', () => {
        manejarClicTemporizador(boton);
    });
});

const circuloRespiracion = document.querySelector('.circulo-respiracion');

function activarRespiracion() {
    circuloRespiracion.classList.add('respirando');
}

function desactivarRespiracion() {
    circuloRespiracion.classList.remove('respirando');
}

function guardarPreferencias(nombreSonido, volumen) {
    localStorage.setItem('ultimoSonido', nombreSonido);
    localStorage.setItem('ultimoVolumen', volumen);
}

function cargarPreferencias() {
    const sonidoGuardado = localStorage.getItem('ultimoSonido');
    const volumenGuardado = localStorage.getItem('ultimoVolumen');

    if (volumenGuardado) {
        controlVolumen.value = volumenGuardado;
    }

    return sonidoGuardado;
}

const ultimoSonidoGuardado = cargarPreferencias();

if (ultimoSonidoGuardado) {
    const tarjetaGuardada = document.querySelector(`[data-sonido="${ultimoSonidoGuardado}"]`);
    if (tarjetaGuardada) {
        tarjetaGuardada.classList.add('activo');
    }
}