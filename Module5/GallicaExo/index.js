//infos : https://api.bnf.fr/fr/api-gallica-de-recherche
let gallicaAPIURL   = "https://gallica.bnf.fr/SRU?version=1.2&operation=searchRetrieve&query="
let cql             = "dc.creator";
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
let start       = 0;
let max         = 50;
let startRecord = "startRecord=";
let maxRecord   = "maximumRecords=";
let maxLengthRecord;


SetPage();
function SetPage(){
    let target          = document.getElementById("datadisplay");
    target.innerHTML    = "";

    let request = gallicaAPIURL + cql + separator + operator[0] + separator + "Molière" + and + collapse + and + startRecord + start + and + maxRecord+max;

    LoadData(request)
        .then(data => {
            console.log(request); 
            console.log(data);

            let records = data.getElementsByTagName("srw:record")
            console.log(`Data has ${records.length} records`)
            maxLengthRecord = Number(data.getElementsByTagName("srw:numberOfRecords")[0].textContent);
            console.log(start, max, maxLengthRecord)
            
            for(let i=0; i<records.length; i++){
                let element = records[i];

                let imageurl    = element.getElementsByTagName("medres")[0].textContent;
                let title       = element.getElementsByTagName("dc:title")[0].textContent;
                let date        = element.getElementsByTagName("dc:date");

                let container       = document.createElement("div");
                container.id        = `record${i}`;
                container.className = "srwrecord";

                let imgcontainer        = document.createElement("div");
                imgcontainer.className  = "thumbnail"
                let infocontainer       = document.createElement("div");
                infocontainer.className = "infos"

                //img
                let img             = document.createElement("img");
                img.src             = imageurl;
                img.alt             = `Cover of ${title}`
                imgcontainer.appendChild(img);

                //info
                let h1              = document.createElement("h1");
                h1.innerHTML        = `${title}`;
                
                let datepublish     = date.length > 0 ? `⟶ ${date[0].textContent}` : "Date is unknown";
                // let datepublish = "Date is unknown";
                // if(data.length>0){
                //     datepublish = date[0].textContent;
                // }
                let h2              = document.createElement("h2");
                h2.innerHTML        = `${datepublish}`;

                infocontainer.appendChild(h1);
                infocontainer.appendChild(h2);

                appendDataToHtml(element, "dc:creator", "Creators", infocontainer);
                appendDataToHtml(element, "dc:contributor", "Contributors", infocontainer);
                appendDataToHtml(element, "dc:publisher", "Publisher", infocontainer);
                appendDataToHtml(element, "dc:source", "Publisher", infocontainer);
                appendDataToHtml(element, "dc:format", "Format", infocontainer);

                let values        = element.getElementsByTagName("dc:type");
                // values            = Array.from(values).shift();
                if(values.length > 0 && values[1] != undefined){
                    let valuesp        = document.createElement("p");
                    valuesp.innerHTML  = `<em>Type:</em> ${values[1].textContent}`;
                    infocontainer.appendChild(valuesp);
                }

                let link            = element.getElementsByTagName("dc:identifier");
                if(link.length > 0){
                    let valuesp        = document.createElement("a");
                    valuesp.href       = link[0].textContent;
                    valuesp.target     = "_Blank"; 
                    valuesp.innerHTML  = `<em>Voir sur Gallica</em>`;
                    infocontainer.appendChild(valuesp);
                }
            

                container.appendChild(imgcontainer);
                container.appendChild(infocontainer);
                target.appendChild(container);

                //check if next/prev are available
                let next = document.getElementById("next");
                let prev = document.getElementById("previous");

                if(start == 0) prev.style.display = "none"
                else prev.style.display = "inline";
                
                console.log(start + records.length)
                if(start + records.length >= maxLengthRecord) next.style.display = "none"
                else next.style.display = "inline"                
            };
        })
        .catch(e => console.error(e))
}

function appendDataToHtml(xml, dctarget, header, target){
    let values        = xml.getElementsByTagName(dctarget);
    if(values.length > 0){
        let arr            = Array.from(values).map(element => element.textContent);
        let valuesp        = document.createElement("p");
        valuesp.innerHTML  = `<em>${header}:</em> ${arr.join('<br>')}`;
        target.appendChild(valuesp);
    }
}

async function LoadData(request){
    const response  = await fetch(request);
    const rawdata   = await response.text();
    const xml       = await new window.DOMParser().parseFromString(rawdata, "text/xml");
    return xml;
}

function Next(){
    if(start < maxLengthRecord)
        start += max;

    SetPage();
}

function Previous(){
    if(start >= max)
        start -= max;
    
    SetPage();
}