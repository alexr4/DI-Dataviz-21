const express   = require('express'); //appel et charge le package express
const Datastore = require('nedb'); //appel et charge du package nedb pour la base de donnée
const fetch     = require("node-fetch"); //appel et charge le package fetch pour node
require('dotenv').config(); //appel du packag dotenv permettant de charger les varibales d'environnement (qui cahce nos tokens d'API)

const app       = express(); //créer l'application server
const database  = new Datastore('database.db');//créer la base de donnée et définir son nom pour la sauvegarde
database.loadDatabase(); //charge la base de donnée existante. Si celle-ci n'existe pas, cela créer le fichier

//l'application écoute ce qu'il se passe sur le port 3333
const port = process.env.PORT || 3333;
app.listen(port, function(){
    console.log(`listening at port ${port}`);
})

//on autorise l'application a donner l'accès au dossier static public depuis l'exterieur
app.use(express.static('public'));
//on défini que l'application recevra des données au format JSON d'une taille max de 1mb
app.use(express.json({limit: '1mb'}));

//on créer une fonction post permettant au client d'envoyer des requetes
app.post('/api/send', function(request, response){
    const data          = request.body; //on récupère les données

    const timestamp     = Date.now(); //on récupère la date au format unix
    data.timestamp      = timestamp; //on l'ajoute à la data

    database.insert(data); //on ajoute la data à la BDD

    // console.log(database);
    //on renvoie une réponse au client afin de spécifié que le serveur à bien reçu l'information
    response.json({
        status: 'data have been received',
        dataset : data
    });
});

//on créer une fonction get permettant de récupérer les donnée stocké sur le serveur
app.get('/api/get', function(request, response){
    database.find({}, function(err, data){
        if(err){
            //on gère le server en cas d'erreur
            response.end();
            return;
        }
        response.json(data);//on renvoie la réponse
    })
})

app.get("/weather/:latlong", async function(request, response){
    const coords    = request.params.latlong.split(',');

    const owmkey    = process.env.OWM_APIKEY;
    const owm       = "https://api.openweathermap.org/data/2.5/onecall?lat="+coords[0]+"&lon="+coords[1]+"&exclude=minutely,hourly,daily,alerts&appid="+owmkey+"&units=metric&lang=fr";

    const apiResponse   = await fetch(owm);
    const rawData       = await apiResponse.json();

    response.json(rawData);
})

