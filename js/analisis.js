// Obtener todas las transacciones del localStorage
const transacciones = Object.keys(localStorage)
    .filter(key => key.startsWith('transaccion'))
    .map(key => JSON.parse(localStorage.getItem(key)));

// Obtener el contexto del canvas
const ctx = document.getElementById('myBarChart').getContext('2d');

// Obtener todas las categorías de los tipos del localStorage
const categorias = Object.keys(localStorage)
    .filter(key => key.startsWith('tipo'))
    .map(key => {
        const tipoStr = localStorage.getItem(key);
        const tipo = JSON.parse(tipoStr);
        return tipo.categoria;
    });

// Generar un color aleatorio para cada categoría
const colores = categorias.map(() => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
});

// Crear un dataset para cada categoría
const datasets = categorias.map((categoria, index) => ({
    label: categoria,
    data: [], // Inicialmente, no hay datos
    backgroundColor: colores[index],
    borderColor: colores[index].replace('0.5', '1'),
    borderWidth: 1
}));

// Crear la gráfica de barras
const myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [], // Inicialmente, no hay etiquetas en el eje x
        datasets: datasets
    },
    options: {
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: ''
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Valor'
                }
            }
        }
    }
});

// Función para actualizar los datos del gráfico según el mes seleccionado
function actualizarGraficoPorMes(mesSeleccionado) {
    // Resetear los datos de los datasets
    myBarChart.data.datasets.forEach(dataset => {
        dataset.data = []; // Reiniciar los datos
    });

    // Agregar las etiquetas del mes seleccionado
    myBarChart.data.labels = [obtenerNombreMes(mesSeleccionado)];

    // Filtrar las transacciones por el mes seleccionado y actualizar los datasets
    transacciones.forEach(transaccion => {
        const tipoStr = localStorage.getItem('tipo' + transaccion.tipoAsociado);
        const tipo = JSON.parse(tipoStr);
        const mes = obtenerMes(transaccion.fechaTransaccion);
        if (mesSeleccionado === mes) {
            const dataset = myBarChart.data.datasets.find(dataset => dataset.label === tipo.categoria);
            dataset.data[0] = transaccion.valor;
        }
    });

    // Actualizar la gráfica
    myBarChart.update();
}

// Función para obtener el mes como número a partir de una fecha
function obtenerMes(fecha) {
    const date = new Date(fecha);
    return date.getMonth();
}

// Función para obtener el nombre del mes a partir del número del mes
function obtenerNombreMes(mes) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[mes];
}

// Evento para la selección de mes
document.querySelector('.custom-select').addEventListener('click', function (e) {
    if (e.target.classList.contains('select-items') || e.target.parentElement.classList.contains('select-items')) {
        const mesSeleccionado = parseInt(e.target.getAttribute('data-value'));
        actualizarGraficoPorMes(mesSeleccionado);
    }
});

// Inicializar la gráfica con el mes actual
const mesActual = new Date().getMonth();
actualizarGraficoPorMes(mesActual);
