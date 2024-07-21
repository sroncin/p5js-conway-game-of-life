class ConwayCell {
    constructor(x, y, resolution, live) {
        this.x = x;
        this.y = y;
        this.resolution = resolution;
        this.r = resolution -1;
        this.setLive(live);
        this.cellColor = color(0, 210, 0); //color(random(100), random(255), random(100));
        this.born = false;
        this.nbNeighbors = 0;
    }

    
    resetBorn() 		{ this.born = false; }
    setBorn() 			{ this.born = true; }
    setNbNeighbors(val) { this.nbNeighbors = val; }
    setLive(value) 		{ this.live = value; }
    setColor(aColor) 	{ this.cellColor = aColor; }

    getColor()			{ return this.cellColor; }

    render(displayShape, displayNeighbors, displayNewBorn) {
        //Render using p5.js
        let x = this.x * this.resolution;
        let y = this.y * this.resolution;
        displayShape = displayShape || 1;
        displayNeighbors = displayNeighbors || false;
        displayNewBorn = displayNewBorn || false;
        if (this.live == 1) {
            noStroke();
            fill(this.cellColor);
            if (this.born == true && displayNewBorn == true) {
                fill(255,255,0);
                //stroke(255, 0, 0);
            }

            switch (displayShape) {
                case 1: //rectangle
                    rect(x, y, this.resolution - 1, this.resolution - 1);
                    break;
                case 2: //ellipse
                    ellipse(x + this.r/2, y + this.r/2, this.r);
                    break;
                case 3: //triangle
                    triangle(x + this.resolution/2, y,
                        x, y+this.resolution,
                        x + this.resolution, y+this.resolution
                    );
                    break;
                case 4: //star
                    let downCoeff = this.resolution /4;
                    triangle(x + this.resolution/2, y ,
                        x, y+this.resolution - downCoeff,
                        x + this.resolution, y+this.resolution - downCoeff
                    );
                    triangle(x + this.resolution/2, y+this.resolution ,
                        x, y + downCoeff,
                        x + this.resolution, y + downCoeff
                    );

                    break;
            }
        }

        //Display Neighbors
        if (displayNeighbors) {
            let fontSize = 1.6;
            fill(0);
            strokeWeight(1);
            stroke(0);
            textSize(this.resolution / fontSize);
            text(this.nbNeighbors, x + this.resolution / fontSize / 2, y + this.resolution / fontSize + 1);
        }
    }
}