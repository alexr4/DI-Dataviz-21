const Axios   = require("axios");
const Cheerio = require("cheerio");
const Express = require("express");
const fs      = require("fs");

const App     = Express();
const PORT    = 5500;
const request = "https://fr.wikipedia.org/wiki/Jeux_olympiques_d%27%C3%A9t%C3%A9_de_2024";

const server    = App.listen(PORT || 5500, () => {
    console.log(`App is running on port ${PORT}`);
})

Axios(request)
    .then(response => {
        const webpage = response.data;
        // console.log(webpage);

        const $ = Cheerio.load(webpage);

        const content = $("#content", webpage);
        const title   = $("#firstHeading", content).text();
        console.log(title);

        const paragraphs = [];
        $("p", content).each(function(){
            let txt = $(this).text();
            // console.log(txt);
            paragraphs.push(txt);
        })
        console.log(paragraphs.length)

        //grab specific elements
        const wikitables = [];
        $(".wikitable", content).each(function(){
            wikitables.push($(this));
            // console.log($(this).text())
        })
        // console.log(wikitables.length);

        const disciplineTable = wikitables[1];
        const caption         = $("caption", disciplineTable).text();
        const tbody           = [];
        const disciplines     = [];
        const headers         = []

        $("tbody", disciplineTable).each(function(){
            tbody.push($(this));
        })

        //header
        $("th", tbody[0]).each(function(){
            let titleCol = $(this).text();
            headers.push({titleCol})
        })
        // console.log(header);

        $("tr", tbody[1]).each((index, element)=>{
            let icolink = $(element).find("img").attr("src");
            let nom     = $($(element).find("td")[0]).text();
            let hommes  = $($(element).find("td")[1]).text();
            let femmes  = $($(element).find("td")[2]).text();
            let mixtes  = $($(element).find("td")[3]).text();
            let total   = $($(element).find("td")[4]).text();

            let discipline = {
                icolink, 
                nom,
                hommes,
                femmes,
                mixtes,
                total
            }

            disciplines.push(discipline);
        })

        const data = {
            caption,
            headers,
            disciplines
        }

        console.log(data);
        let sdata = JSON.stringify(data);
        fs.writeFileSync("JO2024-disciplines.json", sdata);

        server.close(() => {
            console.log("App is now closed")
        })

    })
    .catch(error => {
        console.error(error);
    })