

function BarGraph(canvasid, title, labels, values){
    const ctx   = document.getElementById(canvasid).getContext('2d');

    const chart = new Chart(ctx, {
        type: 'bar',
        data :{
            labels : labels,
            datasets: [{
                label: title,
                data: values
            }]
        },
        options: {
            responsive: true
        }
    });
}