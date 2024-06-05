const transacciones = Object.keys(localStorage)
    .filter(key => key.startsWith('transaccion'))
    .map(key => JSON.parse(localStorage.getItem(key)));

const ctx = document.getElementById('myBarChart').getContext('2d');

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

const myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [], 
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

function obtenerMes(fecha) {
    const date = new Date(fecha);
    return date.getMonth();
}

function actualizarGraficoPorMes(mesSeleccionado, tipoTransaccion) {
    console.log("Mes seleccionado:", mesSeleccionado);
    console.log("Tipo de transacción:", tipoTransaccion);

    // Resetear los datos de los datasets
    myBarChart.data.datasets.forEach(dataset => {
        dataset.data = []; // Reiniciar los datos
    });

    // Agregar las etiquetas del mes seleccionado
    myBarChart.data.labels = [obtenerNombreMes(mesSeleccionado)];

    // Filtrar las transacciones por el mes seleccionado y el tipo
    transacciones.forEach(transaccion => {
        const tipoStr = localStorage.getItem('tipo' + transaccion.tipoAsociado);
        const tipo = JSON.parse(tipoStr);
        const mes = obtenerMes(transaccion.fechaTransaccion);
        
        console.log('Mes de la transacción:', mes);
        console.log('Tipo de la transacción:', transaccion.tipoTransaccion);
        console.log('Tipo esperado:', tipoTransaccion);
        
        // Filtrar por mes y tipo de transacción
        if (mesSeleccionado === mes && transaccion.tipoTransaccion.toLowerCase() === tipoTransaccion.toLowerCase()) {
            console.log('Ejecutando condicion');
            console.log("Transacción válida:", transaccion);
            const dataset = myBarChart.data.datasets.find(dataset => dataset.label === tipo.categoria);
            if (dataset) {
                if (!dataset.data[0]) {
                    dataset.data[0] = 0;
                }
                dataset.data[0] += parseFloat(transaccion.valor);
            }
        }
    });

    myBarChart.update();
    if (tipoTransaccion === 'ingreso') {
        document.getElementById('link-ingresos').classList.add('selected-ingreso');
        document.getElementById('link-ingresos').classList.remove('selected-egreso');
        document.getElementById('link-egresos').classList.remove('selected-egreso');
    } else if (tipoTransaccion === 'egreso') {
        document.getElementById('link-egresos').classList.add('selected-egreso');
        document.getElementById('link-egresos').classList.remove('selected-ingreso');
        document.getElementById('link-ingresos').classList.remove('selected-ingreso');
    }
    document.getElementById('selected-month').textContent = obtenerNombreMes(mesSeleccionado);

}


function obtenerNombreMes(mes) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[mes];
}

// Evento para la selección de mes
document.querySelector('.custom-select').addEventListener('click', function (e) {
    if (e.target.classList.contains('select-items') || e.target.parentElement.classList.contains('select-items')) {
        const mesSeleccionado = parseInt(e.target.getAttribute('data-value'));
        const tipoTransaccion = document.querySelector('.header-analysis .selected').dataset.tipo;
        actualizarGraficoPorMes(mesSeleccionado, tipoTransaccion);
    }
});

let menuVisible = false;

document.querySelector('.custom-select').addEventListener('click', () => {
    const selectItems = document.querySelector('.select-items');
    menuVisible = !menuVisible;
    selectItems.style.display = menuVisible ? 'block' : 'none';
});

document.querySelectorAll('.select-items div').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.select-items').style.display = 'none';
    });
});

// Inicializar la gráfica con el mes actual y los ingresos
const mesActual = new Date().getMonth();
actualizarGraficoPorMes(mesActual, 'ingreso');

document.getElementById('link-ingresos').addEventListener('click', () => {
    document.querySelector('.header-analysis .selected').classList.remove('selected');
    document.getElementById('link-ingresos').classList.add('selected');
    actualizarGraficoPorMes(mesActual, 'ingreso');
});

document.getElementById('link-egresos').addEventListener('click', () => {
    document.querySelector('.header-analysis .selected').classList.remove('selected');
    document.getElementById('link-egresos').classList.add('selected');
    actualizarGraficoPorMes(mesActual, 'egreso');
});
