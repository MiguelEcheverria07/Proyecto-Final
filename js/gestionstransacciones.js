const codigoTransaccionInput = document.getElementById('codigoTransaccion');
const tipoTransaccionInput = document.getElementById('tipoTransaccion');
const tipoAsociadoInput = document.getElementById('tipoAsociado');
const cuentaAsociadaInput = document.getElementById('cuentaAsociada');
const valorTransaccionInput = document.getElementById('valorTransaccion');
const fechaTransaccionInput = document.getElementById('fechaTransaccion');
const descripcionTransaccionInput = document.getElementById('descripcionTransaccion');

const buscarCodigoTransaccionInput = document.getElementById('buscarCodigoTransaccion');
const editTipoTransaccionInput = document.getElementById('editTipoTransaccion');
const editTipoAsociadoInput = document.getElementById('editTipoAsociado');
const editCuentaAsociadaInput = document.getElementById('editCuentaAsociada');
const editValorTransaccionInput = document.getElementById('editValorTransaccion');
const editFechaTransaccionInput = document.getElementById('editFechaTransaccion');
const editDescripcionTransaccionInput = document.getElementById('editDescripcionTransaccion');

function limpiarInputsTransaccion() {
    codigoTransaccionInput.value = '';
    tipoTransaccionInput.value = 'Ingreso';
    tipoAsociadoInput.innerHTML = '';
    cuentaAsociadaInput.innerHTML = '';
    valorTransaccionInput.value = '';
    fechaTransaccionInput.value = '';
    descripcionTransaccionInput.value = '';

    buscarCodigoTransaccionInput.value = '';
    editTipoTransaccionInput.value = 'Ingreso';
    editTipoAsociadoInput.innerHTML = '';
    editCuentaAsociadaInput.innerHTML = '';
    editValorTransaccionInput.value = '';
    editFechaTransaccionInput.value = '';
    editDescripcionTransaccionInput.value = '';
}

function cargarTiposYCuentas() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('tipo')) {
            const tipo = JSON.parse(localStorage.getItem(key));
            const option = document.createElement('option');
            option.value = tipo.codigo;
            option.textContent = tipo.nombre;
            tipoAsociadoInput.appendChild(option);
            editTipoAsociadoInput.appendChild(option.cloneNode(true));
        }
    }

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('numeroCuenta')) {
            const cuenta = JSON.parse(localStorage.getItem(key));
            const option = document.createElement('option');
            option.value = cuenta.numeroCuenta;
            option.textContent = `${cuenta.numeroCuenta} - ${cuenta.nombreBanco}`;
            cuentaAsociadaInput.appendChild(option);
            editCuentaAsociadaInput.appendChild(option.cloneNode(true));
        }
    }
}

function guardarTransaccion() {
    const codigoTransaccion = codigoTransaccionInput.value;
    const transaccionExistente = Object.keys(localStorage).some(key => key.startsWith('transaccion') && JSON.parse(localStorage.getItem(key)).codigo === codigoTransaccion);

    if (transaccionExistente) {
        alert('Ya existe una transacción con el mismo código.');
        return;
    }

    const transaccion = {
        codigo: codigoTransaccion,
        tipoTransaccion: tipoTransaccionInput.value,
        tipoAsociado: tipoAsociadoInput.value,  // Guardar el ID del tipo asociado
        cuentaAsociada: cuentaAsociadaInput.value,
        valor: valorTransaccionInput.value,
        fechaTransaccion : fechaTransaccionInput.value,
        descripcion: descripcionTransaccionInput.value
    };
    localStorage.setItem('transaccion' + transaccion.codigo, JSON.stringify(transaccion));
    alert('Transacción guardada exitosamente.');
    limpiarInputsTransaccion(); 
    cargarTiposYCuentas(); 
}



function consultarTransaccion() {
    const codigoTransaccion = buscarCodigoTransaccionInput.value;
    const transaccionStr = localStorage.getItem('transaccion' + codigoTransaccion);
    const transaccion = JSON.parse(transaccionStr);

    if (transaccion) {
        editTipoTransaccionInput.value = transaccion.tipoTransaccion;
        editTipoAsociadoInput.value = transaccion.tipoAsociado;
        editCuentaAsociadaInput.value = transaccion.cuentaAsociada;
        editValorTransaccionInput.value = transaccion.valor;
        editFechaTransaccionInput.value = transaccion.fechaTransaccion;
        editDescripcionTransaccionInput.value = transaccion.descripcion;
    } else {
        alert('No se encontró la transacción con el código proporcionado');
    }
}

function actualizarTransaccion() {
    const codigoTransaccion = buscarCodigoTransaccionInput.value;
    const transaccion = {
        codigo: codigoTransaccion,
        tipoTransaccion: editTipoTransaccionInput.value,
        tipoAsociado: editTipoAsociadoInput.value,
        cuentaAsociada: editCuentaAsociadaInput.value,
        valor: editValorTransaccionInput.value,
        fechaTransaccion : editFechaTransaccionInput.value,
        descripcion: editDescripcionTransaccionInput.value
    };
    localStorage.setItem('transaccion' + codigoTransaccion, JSON.stringify(transaccion));
    alert('Transacción actualizada exitosamente.');
    limpiarInputsTransaccion();
    cargarTiposYCuentas(); 
}

function eliminarTransaccion() {
    const codigoTransaccion = buscarCodigoTransaccionInput.value;
    localStorage.removeItem('transaccion' + codigoTransaccion);
    alert('Transacción eliminada exitosamente.');
    limpiarInputsTransaccion(); 
    cargarTiposYCuentas(); 
}

function mostrarAgregarTransaccion() {
    document.getElementById('add-trade').style.display = 'block';
    document.getElementById('edit-trade').style.display = 'none';
}

function mostrarEditarTransaccion() {
    document.getElementById('add-trade').style.display = 'none';
    document.getElementById('edit-trade').style.display = 'block';
}

window.onload = function() {
    cargarTiposYCuentas();
};
