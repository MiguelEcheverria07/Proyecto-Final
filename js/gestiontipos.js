const codigoTipoInput = document.getElementById('codigoTipo');
const nombreTipoInput = document.getElementById('nombreTipo');
const tipoInput = document.getElementById('tipo');
const categoriaInput = document.getElementById('categoria');
const descripcionTipoInput = document.getElementById('descripcionTipo');

const buscarCodigoTipoInput = document.getElementById('buscarCodigoTipo');
const editNombreTipoInput = document.getElementById('editNombreTipo');
const editTipoInput = document.getElementById('editTipo');
const editCategoriaInput = document.getElementById('editCategoria');
const editDescripcionTipoInput = document.getElementById('editDescripcionTipo');

function mostrarAgregarTipo() {
    document.getElementById('add-type').style.display = 'flex';
    document.getElementById('edit-type').style.display = 'none';
}

function mostrarEditarTipo() {
    document.getElementById('add-type').style.display = 'none';
    document.getElementById('edit-type').style.display = 'flex';
}

function limpiarInputsTipo() {
    codigoTipoInput.value = '';
    nombreTipoInput.value = '';
    tipoInput.value = ''; 
    categoriaInput.value = '';
    descripcionTipoInput.value = '';

    buscarCodigoTipoInput.value = '';
    editNombreTipoInput.value = '';
    editTipoInput.value = ''; 
    editCategoriaInput.value = '';
    editDescripcionTipoInput.value = '';
}

function guardarTipo() {
    const codigoTipo = codigoTipoInput.value;
    const tipoExistente = Object.keys(localStorage).some(key => key.startsWith('tipo') && JSON.parse(localStorage.getItem(key)).codigo === codigoTipo);

    if (tipoExistente) {
        alert('Ya existe un tipo con el mismo código.');
        return;
    }

    const tipo = {
        codigo: codigoTipo,
        nombre: nombreTipoInput.value,
        tipo: tipoInput.value,
        categoria: categoriaInput.value,
        descripcion: descripcionTipoInput.value
    };
    localStorage.setItem('tipo' + tipo.codigo, JSON.stringify(tipo));
    alert('Tipo guardado exitosamente');
    limpiarInputsTipo(); 
}


function consultarTipo() {
    const codigoTipo = buscarCodigoTipoInput.value;
    const tipoStr = localStorage.getItem('tipo' + codigoTipo);
    const tipo = JSON.parse(tipoStr);

    if (tipo) {
        editNombreTipoInput.value = tipo.nombre;
        editTipoInput.value = tipo.tipo;
        editCategoriaInput.value = tipo.categoria;
        editDescripcionTipoInput.value = tipo.descripcion;
    } else {
        alert('No se encontró el tipo con el código proporcionado');
    }
}

function actualizarTipo() {
    const codigoTipo = buscarCodigoTipoInput.value;
    const tipo = {
        codigo: codigoTipo,
        nombre: editNombreTipoInput.value,
        tipo: editTipoInput.value,
        categoria: editCategoriaInput.value,
        descripcion: editDescripcionTipoInput.value
    };
    localStorage.setItem('tipo' + codigoTipo, JSON.stringify(tipo));
    alert('Tipo actualizado exitosamente');
    limpiarInputsTipo(); 
}

function eliminarTipo() {
    const codigoTipo = buscarCodigoTipoInput.value;
    localStorage.removeItem('tipo' + codigoTipo);
    alert('Tipo eliminado exitosamente');
    limpiarInputsTipo(); 
}
