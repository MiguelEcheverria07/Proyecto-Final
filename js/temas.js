function desactivarHojaPorDefecto() {
    document.getElementById("temaOscuro").disabled = true;
}

function cambiarHojaDeEstilos() {
    var select = document.getElementById("seleccionarTema");
    var selectedOption = select.options[select.selectedIndex];
    var selectedStylesheet = selectedOption.value;

    if (selectedStylesheet === "temaOscuro") {
        document.getElementById("temaOscuro").disabled = false;
    } else if(selectedStylesheet === "temaClaro"){
        document.getElementById("temaOscuro").disabled = true;
    }
}