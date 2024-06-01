const numeroCuentaInput = document.getElementById('numeroCuenta');
const nombreBancoInput = document.getElementById('nombreBanco');
const tipoCuentaInput = document.getElementById('tipoCuenta');
const fechaCuentaInput = document.getElementById('fechaCuenta');
const saldoCuentaInput = document.getElementById('saldoCuenta');
const descripcionCuentaInput = document.getElementById('descripcionCuenta');

const buscarNumeroCuentaInput = document.getElementById('buscarNumeroCuenta');
const editNombreBancoInput = document.getElementById('editNombreBanco');
const editTipoCuentaInput = document.getElementById('editTipoCuenta');
const editSaldoCuentaInput = document.getElementById('editSaldoCuenta');
const editEstadoCuentaInput = document.getElementById('editEstadoCuenta');
const editFechaCuentaInput = document.getElementById('editFechaCuenta');
const editDescripcionCuentaInput = document.getElementById('editDescripcionCuenta');

function mostrarAgregarCuenta() {
    document.getElementById('add-account').style.display = 'flex';
    document.getElementById('edit-account').style.display = 'none';
}

function mostrarEditarCuenta() {
    document.getElementById('add-account').style.display = 'none';
    document.getElementById('edit-account').style.display = 'flex';
}

function guardarCuenta() {
    const cuenta = {
        numeroCuenta: numeroCuentaInput.value,
        nombreBanco: nombreBancoInput.value,
        tipoCuenta: tipoCuentaInput.value,
        estadoCuenta: 'Activa', 
        fechaCuenta: fechaCuentaInput.value,
        saldoCuenta: saldoCuentaInput.value,
        descripcionCuenta: descripcionCuentaInput.value
    };
    localStorage.setItem('numeroCuenta' + cuenta.numeroCuenta, JSON.stringify(cuenta));
    alert('Cuenta guardada exitosamente');
    limpiarInputs(); 
    numeroCuentaInput.focus()
}

function consultarCuenta() {
    const numeroCuenta = buscarNumeroCuentaInput.value;
    const cuentaStr = localStorage.getItem('numeroCuenta' + numeroCuenta);
    const cuenta = JSON.parse(cuentaStr);

    if (cuenta) {
        editNombreBancoInput.value = cuenta.nombreBanco;
        editTipoCuentaInput.value = cuenta.tipoCuenta;
        editSaldoCuentaInput.value = cuenta.saldoCuenta;
        editEstadoCuentaInput.value = cuenta.estadoCuenta;
        editFechaCuentaInput.value = cuenta.fechaCuenta;
        editDescripcionCuentaInput.value = cuenta.descripcionCuenta;
    } else {
        alert('No se encontró la cuenta con el número proporcionado');
    }
}

function actualizarCuenta() {
    const numeroCuenta = buscarNumeroCuentaInput.value;
    const cuenta = {
        numeroCuenta: numeroCuenta,
        nombreBanco: editNombreBancoInput.value,
        tipoCuenta: editTipoCuentaInput.value,
        estadoCuenta: editEstadoCuentaInput.value,
        fechaCuenta: editFechaCuentaInput.value,
        saldoCuenta: editSaldoCuentaInput.value,
        descripcionCuenta: editDescripcionCuentaInput.value
    };
    localStorage.setItem('numeroCuenta' + numeroCuenta, JSON.stringify(cuenta));
    alert('Cuenta actualizada exitosamente.');
    limpiarInputs();
    buscarNumeroCuentaInput.focus();
}

function eliminarCuenta() {
    const numeroCuenta = buscarNumeroCuentaInput.value;
    localStorage.removeItem('numeroCuenta' + numeroCuenta);
    alert('Cuenta eliminada exitosamente.');
    limpiarInputs();
    buscarNumeroCuentaInput.focus();
}

function limpiarInputs() {
    numeroCuenta.value = '';
    nombreBanco.value = '';
    tipoCuenta.value = 'Ahorros'; 
    fechaCuenta.value = '';
    saldoCuenta.value = '';
    descripcionCuentaInput.value = '';

    buscarNumeroCuentaInput.value = '';
    editNombreBancoInput.value = '';
    editTipoCuentaInput.value = 'Ahorros'; 
    editSaldoCuentaInput.value = '';
    editEstadoCuentaInput.value = 'Activa'; 
    editFechaCuentaInput.value = '';
    editDescripcionCuentaInput.value = '';
}
