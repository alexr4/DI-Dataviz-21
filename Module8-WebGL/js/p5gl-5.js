let tex;

function preload(){
    tex = loadImage("./media/uvchecker.png");
}

function setup(){
    createCanvas(500, 500, WEBGL);
}

function draw(){
    background(10)
    

    let cx = sin(millis() * 0.001) * mouseX
    let cy = 0;
    let cz = cos(millis() * 0.001) * mouseX
    let ex = 0;
    let ey = map(mouseY, 0, height, -height/2, height/2);
    let ez = 0;

    // camera(cx, cy, cz, ex, ey, ez, 0, 1, 0);
    orbitControl()
    // perspective(PI / 10.0, width / height, 0.1, mouseX);
    // ortho()
    ortho(-250, 250, -250, 250, -1000, 1000)

    showAxis(255);
  
    push()
    texture(tex)
    noStroke()
    plane(250, 250)
    box(150)
    pop()
}

function showAxis(len){
    push();
    strokeWeight(3);
    stroke(255, 0, 0)
    line(0, 0, 0, len, 0, 0)
    stroke(0, 255, 0)
    line(0, 0, 0, 0, len, 0)
    stroke(0, 0, 255)
    line(0, 0, 0, 0, 0, len)
    pop();
}