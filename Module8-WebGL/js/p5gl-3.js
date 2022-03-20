function setup(){
    createCanvas(500, 500, WEBGL);
}

function draw(){
    background(10)
    

    showAxis(255);
    noStroke();
    let normalmouse = norm(mouseX, 0, width);

    // normalMaterial();
    ambientLight(25)// * normalmouse);
    // ambientMaterial(255, 0, 0)

    let dirX = -1;
    let dirY = -1;
    let dirZ = -1;
    directionalLight(0, 0, 255, dirX, dirY, dirZ)
    stroke(0, 0, 255)
    strokeWeight(10)
    line(0, 0, 0, dirX * 100, dirY * 100, dirZ * 100)
    noStroke();

    ///point light
    let locX = mouseX - width / 2;
    let locY = mouseY - height / 2;
    let locZ = 150;
    pointLight(255, 0, 0,locX, locY, locZ);
    stroke(255, 255, 255)
    strokeWeight(10)
    point(locX, locY, locZ)
    noStroke();

    // emissiveMaterial(130, 230, 0);

    specularMaterial(250);
    shininess(150);

    fill(0, 230, 130)
    push();
    rotateY(millis() * .001)
    rotateX(millis() * .001)
    torus(100, 50)
    pop();
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