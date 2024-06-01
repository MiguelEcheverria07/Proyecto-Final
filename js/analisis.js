const allLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let transactions = {
    Ingresos: {},
    Egresos: {}
};

// Example structure for transactions:
// transactions = {
//     Ingresos: {
//         '2023-05': {
//             Salario: 10000,
//             Bono: 500
//         }
//     },
//     Egresos: {
//         '2023-05': {
//             Renta: 300,
//             Subsidio: 200
//         }
//     }
// };

const categories = ['Salario', 'Bono', 'Renta', 'Subsidio'];

const datasets = categories.map(category => ({
    label: category,
    data: [],
    backgroundColor: '',
    borderColor: '',
    borderWidth: 1
}));

const colors = {
    Salario: ['rgba(37, 2, 82, 0.7)', 'rgba(123, 104, 238, 1)'], // Púrpura neón
    Bono: ['rgba(150, 0, 11, 0.7)', 'rgba(255, 99, 71, 1)'], // Rojo neón
    Renta: ['rgba(11, 92, 4, 0.7)', 'rgba(50, 205, 50, 1)'], // Verde neón
    Subsidio: ['rgba(0, 191, 255, 0.7)', 'rgba(0, 191, 255, 1)'] // Azul neón
};

categories.forEach((category, index) => {
    datasets[index].backgroundColor = colors[category][0];
    datasets[index].borderColor = colors[category][1];
});

const config = {
    type: 'bar',
    data: {
        labels: [],
        datasets: datasets
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'rgba(255, 255, 255, 0.8)' // Color blanco claro para los números en el eje y
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)' // Color blanco claro para las líneas de la cuadrícula
                }
            },
            x: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.8)' // Color blanco claro para los números en el eje x
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)' // Color blanco claro para las líneas de la cuadrícula
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'rgba(255, 255, 255, 0.8)' // Color blanco claro para las etiquetas de la leyenda
                }
            }
        }
    }
};

const myBarChart = new Chart(
    document.getElementById('myBarChart'),
    config
);

// Function to update chart with dynamic data
function updateChart() {
    const selectedMonth = Array.from(document.querySelectorAll('.select-items div.selected')).map(div => parseInt(div.getAttribute('data-value')));
    
    const selectedCategory = "Ingresos"; // This can be "Ingresos" or "Egresos" based on your selection

    const newLabels = selectedMonth.map(monthIndex => allLabels[monthIndex]);
    const newDatasets = datasets.map(dataset => ({
        ...dataset,
        data: selectedMonth.map(monthIndex => {
            const monthKey = `2023-${String(monthIndex + 1).padStart(2, '0')}`;
            return transactions[selectedCategory][monthKey] && transactions[selectedCategory][monthKey][dataset.label] ? transactions[selectedCategory][monthKey][dataset.label] : 0;
        })
    }));

    myBarChart.data.labels = newLabels;
    myBarChart.data.datasets.forEach((dataset, index) => {
        dataset.data = newDatasets[index].data;
    });

    myBarChart.update();
}

// Function to add a transaction
function addTransaction(category, type, month, amount) {
    const monthKey = `2023-${String(month + 1).padStart(2, '0')}`;

    if (!transactions[type][monthKey]) {
        transactions[type][monthKey] = {};
    }

    if (!transactions[type][monthKey][category]) {
        transactions[type][monthKey][category] = 0;
    }

    transactions[type][monthKey][category] += amount;

    updateChart();
}

// Add example transactions
addTransaction('Salario', 'Ingresos', 4, 10000); // Add 10,000 to "Salario" in "Ingresos" for May

const customSelect = document.querySelector('.custom-select');
const selectSelected = customSelect.querySelector('.select-selected');
const selectItems = customSelect.querySelector('.select-items');
var selectDivs = document.getElementsByClassName('select-items');

selectSelected.addEventListener('click', () => {
    selectItems.classList.toggle('select-hide');
    selectSelected.classList.toggle('select-arrow-active');
});

selectItems.addEventListener('click', (e) => {
    if (e.target.tagName === 'DIV') {
        e.target.classList.toggle('selected');
        updateChart();
    }
});

document.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) {
        selectItems.classList.add('select-hide');
        selectSelected.classList.remove('select-arrow-active');
    }
});

updateChart();


