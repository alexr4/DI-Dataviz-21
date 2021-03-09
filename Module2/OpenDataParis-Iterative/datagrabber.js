let opendataparisURL    = "https://opendata.paris.fr/api/records/";
let version             = "1.0/";
let download            = "download"
let datasetID           = "/?dataset="+"liste_des_prenoms";
let format              = "&format=json"

let request             = opendataparisURL+version+download+datasetID+format;

LoadData(request)
    .then(function(data){
        console.log(data);
    })
    .catch(function(error){
        console.error(error)
    })

async function LoadData(dataURL){
    console.log("Loading... please wait")
    const response  = await fetch(dataURL);
    const rawData   = await response.json();

    return rawData;
}