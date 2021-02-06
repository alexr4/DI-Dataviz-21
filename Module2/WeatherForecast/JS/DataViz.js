const dataSun = (p5) => {

    let hues    = [0, 11, 22, 39, 45];
    let sats    = [78, 78, 83, 84, 84];
    let brights = [95, 95, 95, 95, 95];

    p5.setup = () => {
        console.log(sunrises, sunsets)
        let canvas = p5.createCanvas(p5width, p5height);
        p5.colorMode(p5.HSB, 360, 100, 100, 100);
    } 

    p5.draw = () => {
        p5.background(46, 18, 93);

        let globalRadius    = p5.width * 0.55 * 0.5;
        let globalX         = p5.width * 0.5;
        let globalY         = p5.height * 0.75;
        let sunRadius       = p5.width * 0.15;

        let minRise         = sunrises[0];
        let maxRise         = sunrises[sunrises.length - 1];
        let minSet          = sunsets[0];
        let maxSet          = sunsets[sunsets.length - 1];

        let angleStart      = 0.02;
        let angleEnd        = 0.35;

        p5.noStroke();
        p5.noFill();
        p5.textFont('Sintony');
        // p5.strokeWeight(4);
        for(let i=0; i<sunrises.length; i++){
            let sunrise         = sunrises[i];
            let sunset          = sunsets[i];
            
            let textRise        = convertUnixTimeToHoursMinutesSeconds(sunrise);
            let textSet         = convertUnixTimeToHoursMinutesSeconds(sunset);

            let indexRise       = p5.round(p5.map(i, sunrises.length-1, 0, 0, hues.length-1));
            let indexSet        = p5.round(p5.map(i, sunrises.length-1, 0, 0, hues.length-1));
            
            let sunriseAngle    = p5.map(sunrise, maxRise, minRise, p5.PI + p5.PI * angleStart,  p5.PI + p5.PI * angleEnd);
            let sunsetAngle     = p5.map(sunset, minSet, maxSet, p5.TWO_PI - p5.PI * angleEnd, p5.TWO_PI - p5.PI * angleStart);

            let sunriseX        = p5.cos(sunriseAngle) * globalRadius + globalX;
            let sunriseY        = p5.sin(sunriseAngle) * globalRadius + globalY;
            let sunriseTX       = p5.cos(sunriseAngle) * globalRadius * 1.35 + globalX;
            let sunriseTY       = p5.sin(sunriseAngle) * globalRadius * 1.35 + globalY;


            let sunsetX         = p5.cos(sunsetAngle) * globalRadius + globalX;
            let sunsetY         = p5.sin(sunsetAngle) * globalRadius + globalY;
            let sunsetTX        = p5.cos(sunsetAngle) * globalRadius * 1.35 + globalX;
            let sunsetTY        = p5.sin(sunsetAngle) * globalRadius * 1.35 + globalY;
            
            
            p5.fill(hues[indexRise], sats[indexRise], brights[indexRise], 35);
            p5.stroke(hues[indexRise], sats[indexRise], brights[indexRise]);
            p5.ellipse(sunriseX, sunriseY, sunRadius, sunRadius);
            
            p5.fill(hues[indexSet], sats[indexSet], brights[indexSet], 35);
            p5.stroke(hues[indexSet], sats[indexSet], brights[indexSet]);
            p5.ellipse(sunsetX, sunsetY, sunRadius, sunRadius);

            p5.stroke(46, 22, 45, 45);
            p5.line(sunriseTX, sunriseTY, sunriseX, sunriseY)
            p5.line(sunsetTX, sunsetTY, sunsetX, sunsetY)
            

            let margin = 10;
            p5.fill(46, 22, 45);
            p5.textAlign(p5.RIGHT);
            p5.text(textRise, sunriseTX - margin, sunriseTY)
            p5.textAlign(p5.LEFT);
            p5.text(textSet,sunsetTX + margin, sunsetTY)
        }
        p5.noStroke();
        p5.fill(46, 22, 85);
        p5.rect(0, globalY, p5.width, p5.height);

        p5.fill(46, 22, 45);
        p5.noStroke();
        p5.textSize(12);
        p5.textStyle(p5.NORMAL);
        p5.textAlign(p5.CENTER, p5.TOP);
        p5.text("Aube", globalX - globalRadius, globalY + 20);
        p5.text("Crépuscule", globalX + globalRadius, globalY + 20);

        
        p5.noLoop();
    }

    
    p5.windowResized = () => {
        p5.resizeCanvas(p5width, p5height);
        p5.loop();
    }
}

const dataWindSpeed = (p5) => {
    let maxWind = 50.0;

    p5.setup = () => {
        console.log(windSpeeds)
        let canvas = p5.createCanvas(p5width, p5height);
    } 

    p5.draw = () => {
        p5.background('#FDEBED');

        let marginX         = p5.width * 0.2;
        let marginY         = p5.height * 0.05;
        let len             = p5.width - (marginX * 2.0);
        let starty          = p5.height * 0.17;
        let designHeight    = p5.height - (starty + marginY);
        let offset          = designHeight / windSpeeds.length;
        let diameter        = p5.width * 0.05;

        p5.textFont('Sintony');
        p5.strokeWeight(2)

        p5.fill('#FA7585');
        p5.noStroke();
        p5.textSize(10);
        p5.textStyle(p5.NORMAL);
        p5.textAlign(p5.RIGHT);
        p5.text("vitesse max : "+maxWind+"m/s", p5.width - marginX, starty);

        for(let i=0; i<windSpeeds.length; i++){
            let windSpeed       = windSpeeds[i];

            let normWindSpeed   = windSpeed / maxWind;
            let x               = normWindSpeed * len;
            let y               = starty + offset * i + offset * 0.5;

            p5.noFill();
            p5.stroke('#FFB4BF');
            p5.line(marginX, y, p5.width - marginX, y);
            
            p5.noStroke();
            p5.fill('#F23005');
            p5.ellipse(marginX + x, y, diameter, diameter);

            p5.fill('#F23005');
            p5.textSize(12);
            p5.textStyle(p5.BOLD);
            p5.textAlign(p5.LEFT);
            p5.text(windSpeed+"m/s", marginX + x + diameter * 0.75, y - diameter * 0.5);

            
            p5.fill('#FA7585')
            p5.textSize(10);
            p5.textAlign(p5.RIGHT);
            p5.textStyle(p5.NORMAL);
            p5.text(forecastDates[i], marginX + x - diameter * 0.75, y - diameter * 0.5);
        }
    }

    p5.windowResized = () => {
        p5.resizeCanvas(p5width, p5height);
        p5.loop();
    }
}

const dataWindDeg = (p5) => {
    p5.setup = () => {
        console.log(windDirections)
        let canvas = p5.createCanvas(p5width, p5height);
    } 

    p5.draw = () => {
        p5.background('#F5E1FF');

        let marginX         = p5.width * 0.1;
        let marginY         = p5.height * 0.05;
        let startX          = marginX;
        let startY          = p5.height * 0.15;
        let gridWidth       = p5.width - (marginX + startX);
        let gridHeight      = p5.height - (marginY + startY);
        let cols            = 3;
        let rows            = 3;
        let offsetX         = gridWidth / cols;
        let offsetY         = gridHeight / rows;
        let diameter        = (offsetX > offsetY) ? offsetY * 0.5 : offsetX * 0.5;

        // p5.rect(startX, startY, gridWidth, gridHeight);
        p5.rectMode(p5.CENTER);
        p5.textFont('Sintony');
        for(let i=0; i<windDirections.length; i++){
            let c   = i % cols;
            let r   = (i - c) / cols;

            let x   = c * offsetX + startX + offsetX * 0.5;
            let y   = r * offsetY + startY + offsetY * 0.5;

            let windDirection = p5.radians(windDirections[i]) - p5.PI * 0.5;

            let px  = (diameter * 0.5) * p5.cos(windDirection) + x;
            let py  = (diameter * 0.5) * p5.sin(windDirection) + y;

            let lx  = (diameter * 0.75) * p5.cos(windDirection) + x;
            let ly  = (diameter * 0.75) * p5.sin(windDirection) + y;

            let dx  = x;
            let dy  = y - offsetY * 0.5;

            // p5.rect(x, y, offsetX, offsetY)
            p5.fill('#EDC4F2')
            p5.noStroke();
            p5.ellipse(x, y, diameter, diameter);

            p5.strokeWeight(12);
            p5.stroke('#F5E1FF');
            p5.line(x, y, px, py);

            p5.strokeWeight(2);
            p5.stroke('#5576D9');
            p5.line(x, y, px, py);
            
            p5.fill('#824EC9')
            p5.noStroke();
            p5.textSize(12);
            p5.textStyle(p5.BOLD);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.text(windDirections[i]+"°", lx, ly);

            p5.fill('#9080F2')
            p5.textSize(10);
            p5.textAlign(p5.CENTER, p5.TOP);
            p5.textStyle(p5.NORMAL);
            p5.text(forecastDates[i], dx, dy);

        }
        p5.noLoop();
    }

    
    p5.windowResized = () => {
        p5.resizeCanvas(p5width, p5height);
        p5.loop();
    }

}