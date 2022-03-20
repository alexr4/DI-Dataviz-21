function setup(){
    createCanvas(500, 500, WEBGL);
}

function draw(){
    background(10)
    
    rotateY(millis() * .001)
    rotateX(millis() * .001)

    showAxis(100);

    stroke(255);
    fill(127, 150)

    // rectMode(CENTER)
    // rect(0, 0, 200, 200);

    // plane(200, 200);
    // box(200, 200, 200)

    // sphere(100)
    // sphere(100, 4, 24)
    // sphere(100, 24, 4)
    // ellipsoid(100, 50, 25)
    // ellipsoid(100, 50, 25, 12, 12)

    // cylinder(100, 100)
    // cylinder(100, 100, 12, 4, false, true)

    // cone(100, 100);
    // cone(100, 100, 12, 4, false);
    
    // torus(100, 50)
    torus(100, 50, 12, 8)
}

function showAxis(len){
    push();
    strokeWeight(3)
    stroke(255, 0, 0)
    line(0, 0, 0, len, 0, 0)
    stroke(0, 255, 0)
    line(0, 0, 0, 0, len, 0)
    stroke(0, 0, 255)
    line(0, 0, 0, 0, 0, len)
    pop();
}