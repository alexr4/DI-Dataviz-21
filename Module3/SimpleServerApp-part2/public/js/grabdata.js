function setup(){

    noCanvas() //on indique a p5 js de ne pas créer de canvas. La vidéo de la camera sera affiché en HTML directement
    const video = createCapture(VIDEO); //ref : https://p5js.org/reference/#/p5/createCapture → le type VIDEO permet de définir que nous ne recupérons que l'image et non l'audio
    video.size(480, 360);

    if ("geolocation" in navigator) {
        /* la géolocalisation est disponible */
        console.log("geoloc available");

        //recupérer la geoloc du client de manière asynchrone
        navigator.geolocation.getCurrentPosition(async function(position){
            console.log(position);
            const lat           = position.coords.latitude;
            const long          = position.coords.longitude;

            video.loadPixels(); //on charge les pixel de la vidéo pour les rendre lisible
            const image64       = video.canvas.toDataURL(); //on récupère l'image de la vidéo en base 64

            //écrire la donnée sur la page
            document.getElementById("lat").innerHTML    = lat;
            document.getElementById("long").innerHTML   = long;

            //envoyer les donnée à l'API
            const data = {
                coords : {
                    latitude: lat, 
                    longitude : long
                },
                image : image64
            };
            const options = {
                method: 'POST', 
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            }
            const response  = await fetch('/api/send', options);
            //lire la réponse du serveur
            const rawData   = await response.json();
            console.log(rawData);
        });
    } else {
        /* la géolocalisation n'est pas disponible */
        console.log("geoloc not available")
    }
}