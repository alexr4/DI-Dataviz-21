const request = '/api/get';

loadData(request)
    .then(function(response){
        console.log(response);

        for(let i=0; i<response.length; i++){
            console.log(response[i]);
            const elem  = document.createElement('div');
            const img   = document.createElement('img');
            const p     = document.createElement('p');

            elem.textContent = 'latitude: '+response[i].coords.latitude+' longitude: '+response[i].coords.longitude;
            img.src          = response[i].filepath;
            img.alt          = "Some selfies — This is selfie n°" + i;
            
            p.append(img);
            elem.append(p);
            document.body.append(elem);
        }
    })


async function loadData(request){
    const response  = await fetch(request);
    const rawData   = await response.json();
    return rawData;
}