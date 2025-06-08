const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const data = {
    labels: labels,
    datasets: [{
        label: 'Novos Usuários',
        data: [65, 59, 80, 81, 56, 55, 40, 56, 55, 40, 23, 14],
        backgroundColor: [
            '#A3F1F1',
            '#28CCCC',
            '#1A8F8F',
        ],
        borderColor: [
            '#A3F1F1',
            '#28CCCC',
            '#1A8F8F',
        ],
        borderWidth: 1
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
};

new Chart(document.getElementById('graphic-user'), config);

const dataLiked = {
    labels: labels,
    datasets: [{
        label: 'Fichas de Gato Publicadas',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
            '#8ed9ff',
            '#23aeff',
            '#177fbf',
        ],
        borderColor: [
            '#8ed9ff',
            '#23aeff',
            '#177fbf',
        ],
        borderWidth: 1
    }]
};

const configLiked = {
    type: 'bar',
    data: dataLiked,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
};

new Chart(document.getElementById('graphic-like'), configLiked);
