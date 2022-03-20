function setup(){
    createCanvas(500, 500, WEBGL);
}

function draw(){
    background(10)
    randomSeed(1)
    
    rotateY(millis() * .001)
    rotateX(millis() * .001)

    strokeWeight(3)
    stroke(255, 0, 0)
    line(0, 0, 0, 100, 0, 0)
    stroke(0, 255, 0)
    line(0, 0, 0, 0, 100, 0)
    stroke(0, 0, 255)
    line(0, 0, 0, 0, 0, 100)

    noStroke();
    fill(0, 255, 127)
    rectMode(CENTER)
    rect(0, 0, 50, 50)

    let w = 200;
    fill(0, 127, 255)
    for(let d=0; d<3; d++){
        for(let r=0; r<3; r++){
            for(let c=0; c<3; c++){
                let x = w/2 * c - w/2;
                let y = w/2 * r - w/2;
                let z = w/2 * d - w/2;
                let rndSpeedAxis = random(-0.0025, 0.0025)

                push();
                translate(x, y, z);
                rotateY(millis() * rndSpeedAxis)
                rotateX(millis() * rndSpeedAxis)
                rect(0, 0, 25, 25)
                pop();
            }
        }
    }
}