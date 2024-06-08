const categoriaSelect = document.getElementById('categoriaSelect');
const tipoSelect = document.getElementById('tipoSelect');
const desdeInput = document.getElementById('desdeInput');
const hastaInput = document.getElementById('hastaInput');
const transaccionesTable = document.getElementById('transaccionesTable');

const tipos = Object.keys(localStorage)
    .filter(key => key.startsWith('tipo'))
    .map(key => JSON.parse(localStorage.getItem(key)));

tipos.forEach(tipo => {
    const option = document.createElement('option');
    option.value = tipo.categoria;
    option.textContent = tipo.categoria;
    categoriaSelect.appendChild(option);
});

function mostrarTransacciones(transacciones) {
    while (transaccionesTable.rows.length > 1) {
        transaccionesTable.deleteRow(1);
    }

    transacciones.forEach(transaccion => {
        const tipoEncontrado = tipos.find(t => t.codigo === transaccion.tipoAsociado);
        const row = transaccionesTable.insertRow();
        row.insertCell(0).textContent = transaccion.tipoTransaccion;
        row.insertCell(1).textContent = tipoEncontrado ? tipoEncontrado.categoria : '';
        row.insertCell(2).textContent = transaccion.valor;
        row.insertCell(3).textContent = transaccion.fechaTransaccion;
    });
}

const transacciones = Object.keys(localStorage)
    .filter(key => key.startsWith('transaccion'))
    .map(key => JSON.parse(localStorage.getItem(key)));

mostrarTransacciones(transacciones);

function filtrarTransacciones() {
    const categoria = categoriaSelect.value;
    const tipo = tipoSelect.value;
    let desde = desdeInput.value ? new Date(desdeInput.value) : null;
    let hasta = hastaInput.value ? new Date(hastaInput.value) : null;

    if (desde) {
        desde = new Date(desde.getTime() + 86400000);
    }
    if (hasta) {
        hasta = new Date(hasta.getTime() + 86400000);
    }

    if (desde) {
        desde.setHours(0, 0, 0, 0);
    }
    if (hasta) {
        hasta.setHours(23, 59, 59, 999);
    }

    const transaccionesFiltradas = transacciones.filter(transaccion => {
        const tipoEncontrado = tipos.find(t => t.codigo === transaccion.tipoAsociado);
        const transaccionFecha = new Date(transaccion.fechaTransaccion);
        if (isNaN(transaccionFecha.getTime())) {
            console.error("Fecha inválida en la transacción:", transaccion);
            return false;
        }
        transaccionFecha.setHours(0, 0, 0, 0);

        const categoriaCoincide = categoria === 'Todas' || (tipoEncontrado && tipoEncontrado.categoria === categoria);
        const tipoCoincide = !tipo || transaccion.tipoTransaccion === tipo;
        const desdeCoincide = !desde || transaccionFecha >= desde;
        const hastaCoincide = !hasta || transaccionFecha <= hasta;

        return categoriaCoincide && tipoCoincide && desdeCoincide && hastaCoincide;
    });

    mostrarTransacciones(transaccionesFiltradas);
}

categoriaSelect.addEventListener('change', filtrarTransacciones);
tipoSelect.addEventListener('change', filtrarTransacciones);
desdeInput.addEventListener('change', filtrarTransacciones);
hastaInput.addEventListener('change', filtrarTransacciones);
