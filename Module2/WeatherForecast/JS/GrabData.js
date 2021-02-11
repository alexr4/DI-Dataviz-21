let apiURL          = "https://api.openweathermap.org/data/2.5/onecall?";
let geolocation     = "lat="+48.85606350498785+"&lon="+2.3504867067592143;
let exclude         = "&exclude=current,minutely,hourly,alerts";
let units           = "&units=metric";
let lang            = "&lang=fr";
let appid           = "&appid="+token;

let request             = apiURL + geolocation + exclude + units + lang + appid;

let RGCApiURL           = "https://api.openweathermap.org/geo/1.0/reverse?";
let reverseGeoCoding    = RGCApiURL + geolocation + appid;

//Location as Name
//All dates & Starting Day → End day of Weather forecast
//Sunrise and Sunset
//Temperature, feelslike, min and max
//Wind Speed
//Wind direction (degrees)

let place;
let forecastDates           = [];
let collapsedForecastDates  = [];
let forecastWeather         = [];
let sunrises                = [];
let sunsets                 = [];
let temperatures            = [];
let feelslike               = [];
let minTemperatues          = [];
let maxTemperatures         = [];
let windSpeeds              = [];
let windDirections          = [];

let p5width, p5height;
let sunp5;   
let windSp5; 
let windDp5; 

LoadData(request)
    .then(response => {
        console.log(response);

        let dailies = response.daily;
        for(let i=0; i<dailies.length; i++){
            let date            = convertUnixTimeToFullDate(dailies[i].dt);
            let forecast        = dailies[i].weather[0].description;
            let collapsedDate   = convertUnixTimeToCollapseDate(dailies[i].dt);
            let sunrise         = dailies[i].sunrise;//convertUnixTimeToHoursMinutesSeconds(dailies[i].sunrise)
            let sunset          = dailies[i].sunset;//convertUnixTimeToHoursMinutesSeconds(dailies[i].sunset)
            
            let temp            = dailies[i].temp.day;
            let minTemp         = dailies[i].temp.min;
            let maxTemp         = dailies[i].temp.max;
            let feel            = dailies[i].feels_like.day;

            let windSpeed       = dailies[i].wind_speed;
            let windDeg         = dailies[i].wind_deg;

            forecastDates.push(date);
            forecastWeather.push(forecast);
            collapsedForecastDates.push(collapsedDate);
            sunrises.push(sunrise);
            sunsets.push(sunset);
            temperatures.push(temp);
            feelslike.push(feel);
            minTemperatues.push(minTemp);
            maxTemperatures.push(maxTemp);
            windSpeeds.push(windSpeed);
            windDirections.push(windDeg);
        }

        //feed the HTML page
        feedTextTo("startingDay", forecastDates[0]);
        feedTextTo("endDay", forecastDates[forecastDates.length-1]);
        feedList("dates", "ulDates", forecastDates);
        feedList("weather", "ulForecast", forecastWeather);

        setCanvas("temperaturesCanvas", "widget");
        //graph the temp data
        let tempsDatasetsNames = ["Températures minimales", "Températures maximales", "Températures", "Températures ressenties"];
        let tempDatasets = [
            minTemperatues,
            maxTemperatures,
            temperatures,
            feelslike
        ];
        LineGraph("temperaturesCanvas", collapsedForecastDates, tempsDatasetsNames, tempDatasets);

        //graph the p5 datas
        let p5sizes = getWidthHeight(document.getElementsByClassName('widget')[0]);
        p5width     = p5sizes[0];
        p5height    = p5sizes[1];
        
        sunp5   = new p5(dataSun, 'sunrisesSunsets');
        windSp5 = new p5(dataWindSpeed, 'windSpeeds');
        windDp5 = new p5(dataWindDeg, 'windDirections');
    })
    .catch(error => {
        console.error(error);
    })

LoadData(reverseGeoCoding)
    .then(response => {
        place = response[0].local_names.eu;

        feedTextTo("localisation", place);
    })
    .catch(error => {
        console.error(error);
    })

//tools
async function LoadData(request){
    const response  = await fetch(request);
    const data      = await response.json();

    return data;
}

function convertUnixTimeToFullDate(unix){
    let jsdate          = new Date(unix * 1000);
    const months        = ['Jan','Fev','Mars','Avr','Mai','Juin','Juil','Aout','Sept','Oct','Nov','Dec'];
    const days          = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    let year            = jsdate.getFullYear();
    let monthNumber     = jsdate.getMonth();
    let dayNumber       = jsdate.getDate();
    let weekDayNumber   = jsdate.getDay();

    let month           = months[monthNumber];
    let day             = days[weekDayNumber];

    return day+" "+dayNumber+" "+month+" "+year;
}

function convertUnixTimeToCollapseDate(unix){
    let jsdate          = new Date(unix * 1000);
   
    let monthNumber     = jsdate.getMonth();
    let dayNumber       = jsdate.getDate();
    let separator       = (monthNumber < 10) ? "/0" : "/";

    return dayNumber+separator+(monthNumber + 1);
}

function convertUnixTimeToHoursMinutesSeconds(unix){
    let jsdate          = new Date(unix * 1000);

    let hours           = jsdate.getHours();
    let minutes         = jsdate.getMinutes();
    let seconds         = jsdate.getSeconds();

    //min : 000000
    //max : 235959
    let separatorHours      = (hours < 10) ? "0" : "";
    let separatorMinutes    = (minutes < 10) ? ":0" : ":";
    let separatorSeconds    = (seconds < 10) ? ":0" : ":";

    return separatorHours + hours + separatorMinutes + minutes + separatorSeconds + seconds;
}

function feedTextTo(id, text){
    document.getElementById(id).innerHTML = text;
}

function feedList(id, ulid, array){
    let ul      = document.createElement('ul');

    ul.setAttribute('id', ulid);

    document.getElementById(id).appendChild(ul);

    for(let i=0; i<array.length; i++){
        let li  = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = array[i];
    }
}

function setCanvas(id, parentclass){
    let ctx     = document.getElementById(id);
    let parent  = document.getElementsByClassName(parentclass)[0];

    ctx.width   = parent.offsetWidth;
    ctx.height  = parent.offsetHeight;
}

function getWidthHeight(element){
    let computedStyle   = getComputedStyle(element);

    let elementWidth    = element.offsetWidth;
    let elementHeight   = element.offsetHeight;

    elementHeight       -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
    elementWidth        -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);

    let size = [elementWidth, elementHeight]

    return size;
}

window.onresize = function(){
    console.log("is this a resize");
    let p5sizes = getWidthHeight(document.getElementsByClassName('widget')[0]);
    p5width     = p5sizes[0];
    p5height    = p5sizes[1];
    
    // sunp5   = new p5(dataSun, 'sunrisesSunsets');
    // windSp5 = new p5(dataWindSpeed, 'windSpeeds');
    // windDp5 = new p5(dataWindDeg, 'windDirections');

    sunp5.windowResized(p5width, p5height)
}
