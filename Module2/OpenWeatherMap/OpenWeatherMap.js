let token               = "e4f2b00369f0d2678803245c56414fb6";
let openwathermapURL    = "https://api.openweathermap.org/data/2.5/";
let API                 = "onecall?";
let lat                 = "lat="+48.86186361557422;
let long                = "&lon="+2.4166813419196163;
let exclude              = "&exclude=minutely,hourly,alerts";
let units               = "&units=metric";
let lang                = "&lang=fr";
let appid               = "&appid="+token;

let request             =   openwathermapURL + API + lat + long +
                            exclude + units + lang + appid;

let temperatures        = [];
let feelslike           = [];
let days                = [];


console.log(request);

LoadData(request)
    .then(response => {
        console.log(response);

        let daily = response.daily;
        for(let i=0; i<daily.length; i++){
            let temp = daily[i].temp.day;
            let feel = daily[i].feels_like.day;
            let date = convertUnixTopDay(daily[i].dt);


            temperatures.push(temp);
            feelslike.push(feel);
            days.push(date);
        }

        console.log(temperatures);
        console.log(feelslike);
        console.log(days);

        LineGraph("dailyforecast", "Temperature", "Temperature ressentie", 
                    days, temperatures, feelslike);
    })
    .catch(error => {
        console.error(error);
    })

async function LoadData(dataURL){
    const response  = await fetch(dataURL);
    const rawData   = await response.json();
    return rawData;
}

function convertUnixTopDay(unix){
    let a           = new Date(unix * 1000);
    const months    = ['Jan','Fev','Mars','Avr','Mai','Juin','Juil','Aout','Sept','Oct','Nov','Dec'];
    let year        = a.getFullYear();
    let month       = months[a.getMonth()];
    let day         = a.getDate();

    return day+"/"+month+"/"+year;
}