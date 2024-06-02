document.addEventListener('DOMContentLoaded', function() {
    const categoriaSelect = document.getElementById('categoriaSelect');
    const tipoSelect = document.getElementById('tipoSelect');
    const desdeInput = document.getElementById('desdeInput');
    const hastaInput = document.getElementById('hastaInput');
    const transaccionesTable = document.getElementById('transaccionesTable');

    // Obtener todos los tipos del localStorage
    const tipos = Object.keys(localStorage)
        .filter(key => key.startsWith('tipo'))
        .map(key => JSON.parse(localStorage.getItem(key)));

    // Cargar categorías en el select de categorías
    tipos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.categoria;
        option.textContent = tipo.categoria;
        categoriaSelect.appendChild(option);
    });

    // Función para mostrar todas las transacciones
    function mostrarTransacciones(transacciones) {
        // Limpiar la tabla de transacciones
        while (transaccionesTable.rows.length > 1) {
            transaccionesTable.deleteRow(1);
        }

        // Agregar las transacciones a la tabla
        transacciones.forEach(transaccion => {
            const tipoEncontrado = tipos.find(t => t.codigo === transaccion.tipoAsociado); // Buscar el tipo correspondiente
            const row = transaccionesTable.insertRow();
            row.insertCell(0).textContent = transaccion.tipoTransaccion;
            row.insertCell(1).textContent = tipoEncontrado ? tipoEncontrado.categoria : '';
            row.insertCell(2).textContent = transaccion.valor;
            row.insertCell(3).textContent = new Date(transaccion.fechaTransaccion).toLocaleDateString();
        });
    }

    // Obtener todas las transacciones del localStorage
    const transacciones = Object.keys(localStorage)
        .filter(key => key.startsWith('transaccion'))
        .map(key => JSON.parse(localStorage.getItem(key)));

    // Mostrar todas las transacciones al cargar la página
    mostrarTransacciones(transacciones);

    // Función para filtrar transacciones
    function filtrarTransacciones() {
        const categoria = categoriaSelect.value;
        const tipo = tipoSelect.value;
        let desde = desdeInput.value ? new Date(desdeInput.value) : null;
        let hasta = hastaInput.value ? new Date(hastaInput.value) : null;

        if (desde) {
            desde = new Date(desde.getTime() + 86400000); // 86400000 milisegundos = 1 día
        }
        if (hasta) {
            hasta = new Date(hasta.getTime() + 86400000); // 86400000 milisegundos = 1 día
        }
    
        // Normalizar las fechas para compararlas correctamente
        if (desde) {
            desde.setHours(0, 0, 0, 0);
        }
        if (hasta) {
            hasta.setHours(23, 59, 59, 999);
        }

        console.log("Filtrando transacciones:");
        console.log("Desde:", desde);
        console.log("Hasta:", hasta);

        const transaccionesFiltradas = transacciones.filter(transaccion => {
            const tipoEncontrado = tipos.find(t => t.codigo === transaccion.tipoAsociado); // Buscar el tipo correspondiente
            const transaccionFecha = new Date(transaccion.fechaTransaccion);
            if (isNaN(transaccionFecha.getTime())) {
                console.error("Fecha inválida en la transacción:", transaccion);
                return false;
            }
            transaccionFecha.setHours(0, 0, 0, 0); // Normalizar la fecha de la transacción para la comparación

            console.log("Transacción Fecha:", transaccionFecha);

            const categoriaCoincide = categoria === 'Todas' || (tipoEncontrado && tipoEncontrado.categoria === categoria);
            const tipoCoincide = !tipo || transaccion.tipoTransaccion === tipo;
            const desdeCoincide = !desde || transaccionFecha >= desde;
            const hastaCoincide = !hasta || transaccionFecha <= hasta;

            console.log("Categoría coincide:", categoriaCoincide);
            console.log("Tipo coincide:", tipoCoincide);
            console.log("Desde coincide:", desdeCoincide);
            console.log("Hasta coincide:", hastaCoincide);

            return categoriaCoincide && tipoCoincide && desdeCoincide && hastaCoincide;
        });

        mostrarTransacciones(transaccionesFiltradas);
    }

    // Agregar eventos de cambio para los filtros
    categoriaSelect.addEventListener('change', filtrarTransacciones);
    tipoSelect.addEventListener('change', filtrarTransacciones);
    desdeInput.addEventListener('change', filtrarTransacciones);
    hastaInput.addEventListener('change', filtrarTransacciones);
});
