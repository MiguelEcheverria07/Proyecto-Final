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
const formsAlertas = document.querySelectorAll('form');

formsAlertas.forEach(form => {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (form.checkValidity()) {
            const submitButton = document.activeElement;
            if (submitButton.name === 'action') {
                if (submitButton.value === 'guardar') {
                    guardarAlerta();
                } else if (submitButton.value === 'editar') {
                    actualizarAlerta();
                } else if (submitButton.value === 'eliminar') {
                    eliminarAlerta();
                }
            }
        } else {
            form.reportValidity();
        }
    });
});

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

function guardarAlerta() {
    const codigoAlerta = codigoAlertaInput.value;
    const alertaExistente = Object.keys(localStorage).some(key => key.startsWith('alerta') && JSON.parse(localStorage.getItem(key)).codigo === codigoAlerta);

    if (alertaExistente) {
        alert('Ya existe una alerta con el mismo código');
        return;
    }

    const alerta = {
        codigo: codigoAlerta,
        tipoAlerta: tipoAlertaInput.value,
        opcionRepeticion: opcionRepeticionInput.value,
        fecha: fechaAlertaInput.value,
        hora: horaAlertaInput.value,
        descripcion: descripcionAlertaInput.value
    };
    localStorage.setItem('alerta' + alerta.codigo, JSON.stringify(alerta));
    alert('Alerta guardada exitosamente');
    programarAlerta(alerta);
    limpiarInputsAlerta();
    codigoAlertaInput.focus();
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
        alert('No se encontró la alerta con el código ' + codigoAlerta);
        limpiarInputsAlerta();
        buscarCodigoAlertaInput.focus();
    }
}

function actualizarAlerta() {
    const codigoAlerta = buscarCodigoAlertaInput.value;
    const alertaAnteriorStr = localStorage.getItem('alerta' + codigoAlerta);
    const alertaAnterior = JSON.parse(alertaAnteriorStr);
    if (alertaAnterior) {
        const alerta = {
            codigo: codigoAlerta,
            tipoAlerta: editTipoAlertaInput.value,
            opcionRepeticion: editOpcionRepeticionInput.value,
            fecha: editFechaAlertaInput.value,
            hora: editHoraAlertaInput.value,
            descripcion: editDescripcionAlertaInput.value
        };
        localStorage.setItem('alerta' + codigoAlerta, JSON.stringify(alerta));
        alert('Alerta actualizada exitosamente');
        programarAlerta(alerta);
        limpiarInputsAlerta();
        buscarCodigoAlertaInput.focus();
    } else {
        alert('No se encontró la alerta con el código ' + codigoAlerta);
        buscarCodigoAlertaInput.focus();
    }

}

function eliminarAlerta() {
    const codigoAlerta = buscarCodigoAlertaInput.value;
    const alertaAnteriorStr = localStorage.getItem('alerta' + codigoAlerta);
    const alertaAnterior = JSON.parse(alertaAnteriorStr);
    if (alertaAnterior) {
        localStorage.removeItem('alerta' + codigoAlerta);
        alert('Alerta eliminada exitosamente');
        limpiarInputsAlerta();
        buscarCodigoAlertaInput.focus();
    } else {
        alert('No se encontró la alerta con el código ' + codigoAlerta);
        buscarCodigoAlertaInput.focus();
    }
}

function mostrarAgregarAlerta() {
    document.getElementById('add-alert').style.display = 'flex';
    document.getElementById('edit-alert').style.display = 'none';
}

function mostrarEditarAlerta() {
    document.getElementById('add-alert').style.display = 'none';
    document.getElementById('edit-alert').style.display = 'flex';
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
            alertDeNavegador(alerta);
        }, tiempoRestante);
    }
}

function alertDeNavegador(alerta) {
    if (Notification.permission === 'granted') {
        const opciones = {
            body: `${alerta.tipoAlerta}\n${alerta.descripcion}`,
            icon: 'path/to/icon.png'
        };

        const notificacion = new Notification(`Alerta: ${alerta.tipoAlerta}`, opciones);
        alertaSonido.play();

        setTimeout(() => {
            notificacion.close();
        }, 8000);
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

if(window.location.pathname.includes('gestionalertas.html')){
    document.getElementById('consultarAlertaBtn').addEventListener('click', function () {
        const codigoAlerta = buscarCodigoAlertaInput.value;
        if (codigoAlerta.length > 0) {
            consultarAlerta();
        }
    });
}