function Walker(position, target, radius, speed = 10){
    this.position   = position;
    this.target     = target;
    this.vel        = p5.Vector.sub(target, position).normalize().mult(speed);
    this.radius     = radius;
    this.stuck      = false;
    this.added      = false;

    this.walk = function(){
        this.position.add(this.vel);
        // this.checkEdge();
    }


    this.checkEdge = function(){
        if(this.position.x < 0){
            this.position.x = width;
        }
        if(this.position.x > width){
            this.position.x = 0;
        }
        if(this.position.y < 0){
            this.position.y = height;
        }
        if(this.position.y > height){
            this.position.y = 0;
        }
    }

    this.check = function(others){
        for(let i=others.length-1; i>=0; i--){
            let d = this.distSquared(others[i].position, this.position);
            if(d < this.radius * this.radius + others[i].radius * others[i].radius)
            {
                this.stuck = true;
                //reposition walker
                let toWalker = p5.Vector.sub(this.position, others[i].position).normalize().mult(others[i].radius + this.radius);
                this.position = others[i].position.copy().add(toWalker)
            }
        }
    }

    this.distSquared = function(a, b){
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        return dx * dx + dy * dy;
    }
}