

let opendataparisURL    = "https://opendata.paris.fr/api/records/";
let version             = "1.0/";
let question            = "search/?dataset=";
let datasetID           = "les-1000-titres-les-plus-reserves-dans-les-bibliotheques-de-pret";
let rows                = "&q=&rows="+1000;
let sort                = "&sort="+"reservations"
let facetrequest        = "&facet=";
let facets              = facetrequest+"type_de_document"+facetrequest+"auteur";

let request             = opendataparisURL+version+question+datasetID+rows+sort+facets;

//shows a top ten book/auteur
//Top ten auteurs (with  multiple book) how many title are book per authors
//top ten of document type
let topTenBooks = [];
let topTenBooksLabels = [];
let topTenAuthors = [];
let topTenAuthorsLabels = [];
let topTenDocumentType = [];
let topTenDocumentTypeLabels = [];

LoadData(request)
    .then(response => {
        console.log("All data have been loaded");
        console.log(response);

        //top ten books
        let records = response.records;
        for(let i=0; i<10; i++){
            let field   = records[i].fields;
            let author  = field.auteur.split(",");
            let label   = field.titre+"\nde"+author[1]+" "+author[0];
            let count   = field.reservations;

            topTenBooks.push(count);
            topTenBooksLabels.push(label);
        }
        console.log(topTenBooks);
        console.log(topTenBooksLabels);
        
        //top ten document
        let facetDocumentType = response.facet_groups[1].facets;
        for(let i=0; i<10; i++){
            let label = facetDocumentType[i].name;
            let count = facetDocumentType[i].count;

            topTenDocumentTypeLabels.push(label);
            topTenDocumentType.push(count);
        }
        console.log(topTenDocumentTypeLabels);
        console.log(topTenDocumentType);

        let countPerAuthors = new Map()
        let facetAuthor     = response.facet_groups[0].facets;
        for(let i=0; i<facetAuthor.length; i++){
            let author = facetAuthor[i].name;

            if(countPerAuthors.get(author) == undefined){
                countPerAuthors.set(author, 0);
            }

            for(let j=0; j<records.length; j++){
                let field = records[j].fields;
                let fauthors = field.auteur;
                if(author === fauthors){
                    let actualValue = countPerAuthors.get(author);
                    countPerAuthors.set(author, actualValue + field.reservations);
                }else{
                }
            }
        }
        // console.log(countPerAuthors);
        var mapAsc = new Map([...countPerAuthors.entries()].sort((a, b) => b[1] - a[1]));
        // console.log(mapAsc);

        let i = 0;
        for (let key of mapAsc.keys()) {
            if(i > 9) break;
            let author  = key.split(",");
            let count   = mapAsc.get(key);

            topTenAuthorsLabels.push(author[1]+ " "+author[0]);
            topTenAuthors.push(count);
            i++;
        }

        console.log(topTenAuthorsLabels);
        console.log(topTenAuthors);

        //draw
        BarGraph(   "topTenBooks", 
                    "Top dix des titres les plus réservés dans les bibliothèques de prêt",
                    topTenBooksLabels, topTenBooks);

        BarGraph(   "topTenAuthors", 
        "Top dix des auteurs les plus réservés dans les bibliothèques de prêt",
        topTenAuthorsLabels, topTenAuthors);

        BarGraph(   "topTenDocumentType", 
        "Top dix des type de documents les plus réservés dans les bibliothèques de prêt",
        topTenDocumentTypeLabels, topTenDocumentType);

    })
    .catch(error => {
        console.error(error);
    });


async function LoadData(dataURL){
    const response  = await fetch(dataURL);
    const rawData   = await response.json();
    return rawData;
}