const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function graphicUser(dados) {
    let dataChart = [];

    dados.forEach(dataGraphic => {
        dataChart.push(dataGraphic.qtd_usuario);
    });

    const data = {
        labels: labels,
        datasets: [{
            label: 'Novos Usuários',
            data: dataChart,
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
}

function graphicPost(dados) {
    let dataChart = [];

    dados.forEach(dataGraphic => {
        dataChart.push(dataGraphic.qtd_postagem);
    });
    const data = {
        labels: labels,
        datasets: [{
            label: 'Fichas de Gato Publicadas',
            data: dataChart,
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

    new Chart(document.getElementById('graphic-post'), config);

}
