function setup(){
    createCanvas(500, 500, WEBGL);
}

function draw(){
    background(10)
    
    rotateY(millis() * .001)
    rotateX(millis() * .001)

    showAxis(255);

    normalMaterial()
    noStroke();
    sphere(100)

    //get point on sphere
    stroke(255, 100)
    let res = 8;
    for(let i=0; i<res; i++){
        for(let j=0; j<res; j++){
            let theta = map(i, 0, res, 0, PI)
            let phi = map(j, 0, res, 0, TWO_PI)

            let x = sin(theta) * cos(phi) * 100;
            let y = sin(theta) * sin(phi) * 100;
            let z = cos(theta) * 100;
            
            let p = createVector(x, y, z)
            let normal = p.copy().mult(-1).normalize();
            let np = p.copy().add(normal.mult(-10));
            stroke(normal.x * 255, normal.y * 255, normal.z * 255)
            line(p.x, p.y, p.z, np.x, np.y, np.z)
        }
    }
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