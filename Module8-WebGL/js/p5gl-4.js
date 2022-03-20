let tex;

function preload(){
    tex = loadImage("./media/uvchecker.png");
}

function setup(){
    createCanvas(500, 500, WEBGL);
}

function draw(){
    background(10)
    

    rotateY(millis() * .001)
    rotateX(millis() * .001)

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