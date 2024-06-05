var temas = [
    { value: "temaClaro", text: "Tema claro" },
    { value: "temaOscuro", text: "Tema oscuro" },
    { value: "temaVibrante", text: "Tema vibrante" },
];

var fuentes = [
    { value: "Segoe UI", text: "Segoe UI" },
    { value: "cursive", text: "Cursiva" },
    { value: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif", text: "Cambria" }
];

var temaActual = localStorage.getItem('tema') || 'temaClaro';
var fuenteActual = localStorage.getItem('fuente') || 'Segoe UI';

function cambiarTema(tema) {
    temaActual = tema;
    localStorage.setItem('tema', temaActual);
    aplicarTema();
}

function aplicarTema() {
    // Deshabilitar todas las hojas de estilos de tema
    var hojasEstilos = document.querySelectorAll('link[rel="stylesheet"][id^="tema"]');
    hojasEstilos.forEach(function(hojaEstilo) {
        hojaEstilo.disabled = true;
    });

    // Habilitar la hoja de estilos normal
    document.getElementById("hojaNormal").disabled = false;

    // Habilitar solo la hoja de estilos correspondiente al tema seleccionado
    document.getElementById(temaActual).disabled = false;

    // Actualizar el valor seleccionado en el <select> de temas
    document.getElementById("seleccionarTema").value = temaActual;
}




function cargarOpciones() {
    var select = document.getElementById("seleccionarTema");
    select.innerHTML = "";
    temas.forEach(function(tema) {
        var option = document.createElement("option");
        option.value = tema.value;
        option.text = tema.text;
        select.appendChild(option);
    });
    select.value = temaActual; 
}

function cambiarFuente(fuente) {
    fuenteActual = fuente;
    localStorage.setItem('fuente', fuenteActual);
    aplicarFuente();
}

function aplicarFuente() {
    document.body.style.fontFamily = fuenteActual;
    document.getElementById("seleccionarFuente").value = fuenteActual;
}

function cargarOpcionesFuente() {
    var selectFuente = document.getElementById("seleccionarFuente");
    selectFuente.innerHTML = "";
    fuentes.forEach(function(fuente) {
        var optionFont = document.createElement("option");
        optionFont.value = fuente.value;
        optionFont.text = fuente.text;
        selectFuente.appendChild(optionFont);
    });
    selectFuente.value = fuenteActual;

}

window.onload = function() {
    if (window.location.pathname.includes('gestiontransacciones.html')) {
        cargarTiposYCuentas();
    }
    cargarOpcionesFuente();
    aplicarFuente();
    cargarOpciones();
    aplicarTema();
};
