const request = '/api/get';

loadData(request)
    .then(function(response){
        console.log(response);

        for(let i=0; i<response.length; i++){
            console.log(response[i]);
            const elem  = document.createElement('div');

            elem.textContent = `latitude: ${response[i].coords.latitude}, longitude: ${response[i].coords.longitude}, et la température et de ${response[i].temp} degrés celsius`;
            
            document.body.append(elem);
        }
    })


