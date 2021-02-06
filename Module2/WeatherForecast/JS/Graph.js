function LineGraph(canvasID, xLabels, dataNames, dataset){
    const element   = document.getElementById(canvasID);
    const ctx       = element.getContext('2d');

    Chart.defaults.global.defaultFontColor = '#46727F';
    Chart.defaults.global.defaultFontFamily = 'Sintony';

    const chart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: xLabels,
            datasets: [
                {
                    label: dataNames[0],
                    data: dataset[0],
                    fill : false,
                    borderColor : '#05C7F2',
                    backgroundColor : '#05C7F2',
                    borderWidth: 3,
                    pointStyle : 'circle',
                    radius : 2,
                    hoverRadius : 10
                },
                {
                    label: dataNames[1],
                    data: dataset[1],
                    fill : false,
                    borderColor : '#0367A6',
                    backgroundColor : '#0367A6',
                    borderWidth: 3,
                    pointStyle : 'circle',
                    hoverRadius : 10
                },
                {
                    label: dataNames[2],
                    data: dataset[2],
                    fill : false,
                    borderColor : '#F20574',
                    backgroundColor : '#F20574',
                    borderWidth: 3,
                    pointStyle : 'circle',
                    hoverRadius : 10
                },
                {
                    label: dataNames[3],
                    data: dataset[3],
                    fill : false,
                    borderColor : '#F2A0B6',
                    backgroundColor : '#F2A0B6',
                    borderWidth: 3,
                    pointStyle : 'circle',
                    hoverRadius : 10
                }
            ]
        },

        options: {
            reponsive: true,
            legend : {
                position : 'bottom'
            },
            layout: {
                padding:{
                    top : 100
                }
            },
            animation: {
                duration: 0
            }
        }
    });
}
