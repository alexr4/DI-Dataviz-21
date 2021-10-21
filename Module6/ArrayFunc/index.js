//Array functions https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array
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
let maxRecords  = "maximumRecords="+50;

let request = gallicaAPIURL + cql + separator + operator[1] + separator + types[0] + and + collapse + and + maxRecords;

LoadData(request)
    .then(data => {
        console.log(request); 
        console.log(data);

        let xmlAuthors      = data.getElementsByTagName("dc:creator");
        let xmlDates        = data.getElementsByTagName("dc:date");
        let authors         = []; //create an array with all the authors as string
        let dates           = []; //create an array with all the authors as string

        //foreach
        Array.from(xmlAuthors).forEach(element => {
            console.log(element.textContent);
            authors.push(element.textContent);
        });

        Array.from(xmlDates).forEach(element => {
            let date = Number(element.textContent.substring(0, 4));
            console.log(date);
            dates.push(date);
        });

        //* Manipulate index and array

        //Delete first element of an array
        console.log(authors[0]);
        authors.shift();
        console.log(authors[0]);

        //Delete last element of an array
        console.log(authors[authors.length-1]);
        authors.pop();
        console.log(authors[authors.length-1]);

        //find index of an element
        let authorToFind = 'Bisch, Jean (1733-1824). Auteur du texte';
        let index = authors.indexOf(authorToFind);
        console.log(`${authorToFind} is at index: ${index}`);

        // Remove elements from specific index
        let splicedList = authors.splice(index, 4); //delete 1 element from specified index
        console.log(splicedList);

        //Add element at the end of the array
        authors.push("Alexandre Rivaux, Designer")
        console.log(authors[authors.length-1])

        //Add element at the begining of the array
        authors.unshift("Alexandre Rivaux, Designer")
        console.log(authors[0])

        // * Sort and filter
        //.join() aggregate all the values of the array into one value
        let creators = authors.join(", ");
        console.log(creators);

        // .every() check if all the element of an array validate a condition
        const minmaxdate = 1500;
        const isBelowThreshold = (value) => value < minmaxdate;
        const isAboveThreshold = (value) => value > minmaxdate;

        console.log(`is all the dates below ${minmaxdate}: ${dates.every(isBelowThreshold)}`);
        console.log(`is all the dates above ${minmaxdate}: ${dates.every(isAboveThreshold)}`);
        
        // .filter() returns a new array filled with data which validate a probvided condition
        let threshold = 1850;
        const filteringResult = dates.filter(element => element >= threshold);
        console.log(`Filter all trhe date equal or above ${threshold}: ${filteringResult}`);
        console.log(filteringResult);

        // .find() returns the firs element of the array which validate a condition
        console.log(`First date above ${threshold} is ${dates.find(element => element > threshold)}`);

        // .includes() returns true/false if an array contains the specified value
        console.log(`Is dates contains the year ${threshold}: ${dates.includes(threshold)}`)

        // .sort() returns a sorted array
        const sortedDates = Array.from(dates).sort();
        console.log(`Sorted dates: `)
        console.log(sortedDates);

        //.reverse() reverse the order of an array
        const reverseDates = Array.from(sortedDates).reverse();
        console.log(`Reversed sorted data: `)
        console.log(reverseDates);

        // .map() returns a new array of data whic validate a condition
        const decenia = dates.map(element => Math.floor(element / 100.0) * 100);
        console.log(`Map dates into decenia: `)
        console.log(decenia);

    })

async function LoadData(request){
    const response  = await fetch(request);
    const rawdata   = await response.text();
    const xml       = await new window.DOMParser().parseFromString(rawdata, "text/xml");
    return xml;
}