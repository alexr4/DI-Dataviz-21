function LineGraph(canvasid, titleData1, titleData2, labels, values1, values2){
    const ctx   = document.getElementById(canvasid).getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data :{
            labels : labels,
            datasets: [
                {
                    label: titleData1,
                    data: values1
                },
                {
                    label: titleData2,
                    data: values2
                }
            ]
        },
        options: {
            responsive: true
        }
    });
}