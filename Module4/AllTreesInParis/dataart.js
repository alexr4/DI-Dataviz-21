/**
 * This part define all the parameters for grabbing the data
*/
let opendataparisURL    = "https://opendata.paris.fr/api/records/";
let version             = "1.0/";
let download            = "download"
let search              = "search"
let datasetID           = "/?dataset="+"les-arbres";
let format              = "&format=json"
let facet               = "&facet="
let genre               = "genre"
let espece              = "espece"
let circonferenceencm   = "circonferenceencm"
let hauteurenm          = "hauteurenm";
let remarquable         = "remarquable"

let fulldataRequest     = opendataparisURL+version+download+datasetID+format;
let dataFacetsRequest   = opendataparisURL+version+search+datasetID+facet+genre+facet+espece+facet+circonferenceencm+facet+hauteurenm+facet+remarquable

/**
 * This variables will store the data for drawing
 */
let fulldata;
let genres;
let especes;
let circonferences;
let hauteurs;
let remarquables;
let numberOfData;

/**
 * This variable handles the design parts
 */
let points  = [];
let radius  = 4;
let walkers = [];
let batch;
let rndGenre;

/**
 * in the preload fuinction we will make the request for the data
 */
function preload(){
    // fulldata    = loadJSON(fulldataRequest)
    let facets = loadJSON(dataFacetsRequest, setData)
}

/**
 * This call back function is call as soon as we have the data
 * It push the data into the propers arrays
 */
function setData(data){
    numberOfData    = data.nhits;
    genres          = data.facet_groups[0].facets;
    circonferences  = data.facet_groups[1].facets;
    hauteurs        = data.facet_groups[2].facets;
    especes         = data.facet_groups[3].facets;
    remarquables    = data.facet_groups[4].facets;

    console.log(genres)
}

/**
 * The steup function handle the start of the program
 * It comes after the preload
 */
function setup(){
    // createCanvas(windowWidth, windowHeight);
    createCanvas(windowWidth, windowHeight);

    let startPos = createVector(width/2, height/2);
    points[0] = new Walker(startPos, startPos, radius);

    rndGenre    = floor(random(genres.length));
    batch       = floor((genres[rndGenre].count-1) * .15);
    addRandomWalkers(batch);

}

function addRandomWalkers(maxWalker){
    for(let i=0; i<maxWalker; i++){
        let angle       = random(PI * 2);
        let rad         = random(height/2, height);
        let startPos    = createVector(width/2 + cos(angle) * rad, height/2 + sin(angle) * rad);
        walkers.push(new Walker(startPos, points[0].position, radius, 10));
    }
}

/**
 * The draw loop handle the data art
 */
function draw(){
    background('#F2F2F2');
    noStroke()
    strokeWeight(1)
    fill(0)
    textAlign(LEFT)
    text(genres[rndGenre].name+": "+genres[rndGenre].count, 10, 50)
    text("points: "+points.length+" | walkers: "+walkers.length+" | batch: "+batch, 10, height - 10)
    textAlign(RIGHT)
    text(round(frameRate()), width-10, 50)

    if(walkers.length == 0 && points.length < genres[rndGenre].count){
        if(points.length + batch > genres[rndGenre].count){
            batch = genres[rndGenre].count - points.length;
        }
        addRandomWalkers(batch);
        console.log("batch "+points.length);
    }
    
    noStroke();
    fill('#D94A4A')
    for(let i=0; i<walkers.length; i++){
        let walker = walkers[i];
        if(!walker.stuck){
            walker.walk();
            walker.check(points);
        }else{
            if(!walker.added){
                points.push(new Walker(walker.position, walker.target, walker.radius));
                walker.added = true;
            }
        }
        circle(walker.position.x, walker.position.y, walker.radius * 2)
    }

    //clean walker
    for(let i=walkers.length-1; i>=0; i--){
        if(walkers[i].added){
            walkers.splice(i, 1)
        }
    }

    let maxCircDist     = height * 0.75;
    let greenDark       = color('#18594D');//'#18594D');
    let greenLight      = color('#8ABFA6');//0, 0, 255);//'#4F8C6F');

    stroke(greenLight)
    noFill()
    circle(width/2, height/2, maxCircDist);

    noStroke();
    // noFill()
    //draw all points
    for(let i=0; i<points.length; i++){
        let pt          = points[i];
        let normDist    = dist(pt.position.x, pt.position.y, width/2, height/2) / (maxCircDist * 0.5);
        normDist        = constrain(normDist, 0, 1.0);
        let sizeScale   = lerp(0.9, 0.2, normDist);

        let newColor    = lerpColor(greenDark, greenLight, normDist);
        stroke(newColor)
        strokeWeight(pt.radius * 2 * sizeScale)
        // circle(pt.position.x, pt.position.y, pt.radius * 2 * sizeScale)
        point(pt.position.x, pt.position.y)
    }
}



/**
 * this part handle the responsivness of the data
 */
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
