let data = [12, 22, 54, 69, 75, 42, 10, 5, 56];

function setup(){
    createCanvas(windowWidth, windowHeight)
}

function draw(){
    background(200);

    randomSeed(1000);

    noFill();
    stroke(0);
    for(let i=0; i<data.length; i++){
        let x = width/2;
        let y = height/2;
        let radius  = data[i] * 5;
        let inc     = random(0, 1);
        let strokew = random(1, 5);
        strokeWeight(strokew)

        let res = data[i] * 10;
        beginShape();
        for(let j=0; j<res; j++){
            //pos point
            let angle   = map(j, 0, res, 0, TWO_PI);
            let rnd     = noise(sin(angle) + inc, cos(angle) + inc, inc) * 25;
            let px      = cos(angle) * (radius + rnd) + width/2;
            let py      = sin(angle) * (radius + rnd) + height/2;
            vertex(px, py);
        }
        endShape(CLOSE);

        
    }
}