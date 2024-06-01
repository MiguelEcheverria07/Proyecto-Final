const codigoAlertaInput = document.getElementById('codigoAlerta');
const tipoAlertaInput = document.getElementById('tipoAlerta');
const opcionRepeticionInput = document.getElementById('opcionRepeticion');
const fechaAlertaInput = document.getElementById('fechaAlerta');
const horaAlertaInput = document.getElementById('horaAlerta');
const descripcionAlertaInput = document.getElementById('descripcionAlerta');

const buscarCodigoAlertaInput = document.getElementById('buscarCodigoAlerta');
const editTipoAlertaInput = document.getElementById('editTipoAlerta');
const editOpcionRepeticionInput = document.getElementById('editOpcionRepeticion');
const editFechaAlertaInput = document.getElementById('editFechaAlerta');
const editHoraAlertaInput = document.getElementById('editHoraAlerta');
const editDescripcionAlertaInput = document.getElementById('editDescripcionAlerta');

const alertaSonido = document.getElementById('alertaSonido');

function limpiarInputsAlerta() {
    codigoAlertaInput.value = '';
    tipoAlertaInput.value = 'Factura';
    opcionRepeticionInput.value = 'Una vez';
    fechaAlertaInput.value = '';
    horaAlertaInput.value = '';
    descripcionAlertaInput.value = '';

    buscarCodigoAlertaInput.value = '';
    editTipoAlertaInput.value = 'Factura';
    editOpcionRepeticionInput.value = 'Una vez';
    editFechaAlertaInput.value = '';
    editHoraAlertaInput.value = '';
    editDescripcionAlertaInput.value = '';
}

function mostrarNotificacion(mensaje) {
    alert(mensaje);
}

// Function to save alert
function guardarAlerta() {
    const alerta = {
        codigo: codigoAlertaInput.value,
        tipoAlerta: tipoAlertaInput.value,
        opcionRepeticion: opcionRepeticionInput.value,
        fecha: fechaAlertaInput.value,
        hora: horaAlertaInput.value,
        descripcion: descripcionAlertaInput.value
    };
    localStorage.setItem('alerta' + alerta.codigo, JSON.stringify(alerta));
    mostrarNotificacion('Alerta guardada exitosamente.');
    programarAlerta(alerta); 
    limpiarInputsAlerta(); 
}

function consultarAlerta() {
    const codigoAlerta = buscarCodigoAlertaInput.value;
    const alertaStr = localStorage.getItem('alerta' + codigoAlerta);
    const alerta = JSON.parse(alertaStr);

    if (alerta) {
        editTipoAlertaInput.value = alerta.tipoAlerta;
        editOpcionRepeticionInput.value = alerta.opcionRepeticion;
        editFechaAlertaInput.value = alerta.fecha;
        editHoraAlertaInput.value = alerta.hora;
        editDescripcionAlertaInput.value = alerta.descripcion;
    } else {
        mostrarNotificacion('No se encontró la alerta con el código proporcionado');
    }
}

function actualizarAlerta() {
    const codigoAlerta = buscarCodigoAlertaInput.value;
    const alerta = {
        codigo: codigoAlerta,
        tipoAlerta: editTipoAlertaInput.value,
        opcionRepeticion: editOpcionRepeticionInput.value,
        fecha: editFechaAlertaInput.value,
        hora: editHoraAlertaInput.value,
        descripcion: editDescripcionAlertaInput.value
    };
    localStorage.setItem('alerta' + codigoAlerta, JSON.stringify(alerta));
    mostrarNotificacion('Alerta actualizada exitosamente.');
    programarAlerta(alerta); 
    limpiarInputsAlerta(); 
}

function eliminarAlerta() {
    const codigoAlerta = buscarCodigoAlertaInput.value;
    localStorage.removeItem('alerta' + codigoAlerta);
    mostrarNotificacion('Alerta eliminada exitosamente.');
    limpiarInputsAlerta();
}

function mostrarAgregarAlerta() {
    document.getElementById('add-alert').style.display = 'block';
    document.getElementById('edit-alert').style.display = 'none';
}

function mostrarEditarAlerta() {
    document.getElementById('add-alert').style.display = 'none';
    document.getElementById('edit-alert').style.display = 'block';
}

function solicitarPermisoNotificaciones() {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                programarNotificacionesExistentes(); 
            }
        });
    } else {
        programarNotificacionesExistentes(); 
    }
}

function programarAlerta(alerta) {
    const fechaAlerta = new Date(`${alerta.fecha}T${alerta.hora}`);
    const tiempoRestante = fechaAlerta.getTime() - Date.now();

    if (tiempoRestante > 0) {
        setTimeout(() => {
            mostrarNotificacionDeNavegador(alerta);
        }, tiempoRestante);
    }
}

function mostrarNotificacionDeNavegador(alerta) {
    if (Notification.permission === 'granted') {
        const opciones = {
            body: `${alerta.tipoAlerta}\n${alerta.descripcion}`,
            icon: 'path/to/icon.png' 
        };

        const notificacion = new Notification(`Alerta: ${alerta.tipoAlerta}`, opciones);
        alertaSonido.play(); 

        setTimeout(() => {
            notificacion.close();
        }, 5000);
    }
}

function programarNotificacionesExistentes() {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('alerta')) {
            const alertaStr = localStorage.getItem(key);
            const alerta = JSON.parse(alertaStr);
            programarAlerta(alerta);
        }
    });
}

window.onload = () => {
    solicitarPermisoNotificaciones();
};