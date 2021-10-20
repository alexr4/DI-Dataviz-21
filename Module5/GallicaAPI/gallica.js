//infos : https://api.bnf.fr/fr/api-gallica-de-recherche
let gallicaAPIURL   = "https://gallica.bnf.fr/SRU?version=1.2&operation=searchRetrieve&query="
let cql             = "dc.type";
let operator        = ["all", "any", "adj", "prox"];
let and             = "&";
let separator       = "%20";
let types           = [
    "monographie",
    "carte",
    "image",
    "fascicule",
    "manuscrit",
    "partition",
    "sonore",
    "objet",
    "video"
];
let collapse    = "collapsing=true";

let request = gallicaAPIURL + cql + separator + operator[1] + separator + types[1] + and + collapse;

LoadData(request)
    .then(data => {
        console.log(request); 
        console.log(data);

        let oaiData = data.getElementsByTagName("oai_dc:dc");

        for(let i=0; i<oaiData.length; i++){
            let gallicadata = oaiData[i];
            for(let j=0; j<gallicadata.children.length; j++){
                let value = gallicadata.children[j].textContent;
                console.log(value)
            }
        }
    })

async function LoadData(request){
    const response  = await fetch(request);
    const rawdata   = await response.text();
    const xml       = await new window.DOMParser().parseFromString(rawdata, "text/xml");
    return xml;
}