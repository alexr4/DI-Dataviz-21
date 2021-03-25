//find fun data api here : https://medium.com/@vicbergquist/18-fun-apis-for-your-next-project-8008841c7be9

if ("geolocation" in navigator) {
    /* la géolocalisation est disponible */
    console.log("geoloc available");

    //recupérer la geoloc du client de manière asynchrone
    navigator.geolocation.getCurrentPosition(async function (position) {
        console.log(position);
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        //écrire la donnée sur la page
        document.getElementById("lat").innerHTML = lat;
        document.getElementById("long").innerHTML = long;

        loadData(`/weather/${lat},${long}`)
            .then(async data => {
                console.log(data);

                document.getElementById("temp").innerHTML = data.current.temp;

                //envoyer les donnée à l'API
                const dataToSave = {
                    coords: {
                        latitude: lat,
                        longitude: long
                    },
                    temp: data.current.temp
                };
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSave)
                }
                const response = await fetch('/api/send', options);
                //lire la réponse du serveur
                const rawData = await response.json();
                console.log(rawData);
            })
    });
} else {
    /* la géolocalisation n'est pas disponible */
    console.log("geoloc not available")
}
