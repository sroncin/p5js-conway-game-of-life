class ConwayMatrice extends Matrice2D {
    constructor(cols, rows, resolution) {
        super(cols, rows);
        this.resolution = resolution || 40;
        this.generationColor = color(0, 210, 0);
    }

    getCellLife(x, y) {
        let isInlive = 0;
        if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) 
            isInlive = this.arr[x][y].live;
        return isInlive;
    }

    newCell(parentCell, live, createColor) {
        let x = parentCell.x;
        let y = parentCell.y;
        let colorR = parentCell.getColor().levels[0];
        let colorG = parentCell.getColor().levels[1];
        let colorB = parentCell.getColor().levels[2];
        if (createColor == true) {
            colorR = this.generationColor.levels[0];
            colorG = this.generationColor.levels[1];
            colorB = this.generationColor.levels[2];
        }
        if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
            this.arr[x][y] = new ConwayCell(x,y,this.resolution, live);
            this.arr[x][y].setColor(color(colorR, colorG, colorB));
        }
    }	

    countLiveNeighbors(x, y) {
        let sum = 0;
        //Loop around the x,y cell to check the neighbors
        for (let i=-1; i <= 1; i++) {
            for (let j=-1; j <= 1; j++) {
                //Edges work around
                // consider the grid edges to touch each others
                // x = 0 && i == -1 >> 0 -1 + 10 % 10 = 9
                let col = (x + i + this.cols) % this.cols;
                let row = (y + j + this.rows) % this.rows;

                //get values
                sum += this.getCellLife(col, row);
            }
        }
        sum -= this.getCellLife(x, y); //remove our current cell value
        return sum;
    }

    computeNextGrid(changeColor) {
        let gridNext = new ConwayMatrice(this.cols, this.rows, this.resolution);
        gridNext.generationColor = color(random(180), random(255), random(200));
        for (let i=0; i < this.cols; i++) {
            for (let j=0; j < this.rows; j++) {
                let neighbors = this.arr[i][j].nbNeighbors; //this.countLiveNeighbors(i, j);
                let state = this.getCellLife(i, j);
                if (state == 1) { //Live cell
                    if (neighbors < 2) {
                        //Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                        gridNext.newCell(this.arr[i][j], 0);
                    } 
                    else if (neighbors == 2 || neighbors == 3) {
                        //Any live cell with two or three live neighbours lives on to the next generation.
                        gridNext.newCell(this.arr[i][j], state);
                    } 
                    else if (neighbors > 3) {
                        //Any live cell with more than three live neighbours dies, as if by overpopulation.
                        gridNext.newCell(this.arr[i][j], 0);
                    } else gridNext.newCell(this.arr[i][j], state);
                } else { //Dead Cell
                    if (neighbors == 3) {
                        //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                        gridNext.newCell(this.arr[i][j], 1, changeColor); //generate a color
                        gridNext.arr[i][j].setBorn();
                    } else {
                        //Keep Dead State
                        gridNext.newCell(this.arr[i][j], state);
                    }
                }
            }
        }
        this.arr = gridNext.arr;
        this.computeNeighbors();
    }

    computeNeighbors() {
        for (let i=0; i < this.cols; i++) {
            for (let j=0; j < this.rows; j++) {
                let neighbors = this.countLiveNeighbors(i, j);
                this.arr[i][j].setNbNeighbors(neighbors);
            }
        }
    }

    randomInitialize() {
        for (let i=0; i < this.cols; i++) {
            for (let j=0; j < this.rows; j++) {
                this.arr[i][j] = new ConwayCell(i, j, resolution, floor(random(2)));
            }
        }
        this.computeNeighbors();
    }

    neighborsInfection() {
        for (let i=0; i < this.cols; i++) {
            for (let j=0; j < this.rows; j++) {
                if (this.arr[i][j].born == true) {
                    //Infect neighbourhood
                    var currentColor = this.arr[i][j].getColor();
                    let colorR = currentColor.levels[0];
                    let colorG = currentColor.levels[1];
                    let colorB = currentColor.levels[2];
                    for (let ci=-1; ci <= 1; ci++) {
                        for (let cj=-1; cj <= 1; cj++) {
                            let col = (i + ci + this.cols) % this.cols;
                            let row = (j + cj + this.rows) % this.rows;
                            if (col != i || row != j) {
                                let neighborsCell = this.arr[col][row];
                                if (neighborsCell != undefined && neighborsCell.live == 1) {
                                    neighborsCell.setColor(color(colorR, colorG, colorB));
                                }
                            }
                        }
                    }
                }
            }
        }
    }	

    drawGrid(displayShape, displayNeighbors, displayNewBorn) {
        for (let i=0; i < this.cols; i++) {
            for (let j=0; j < this.rows; j++) {
                this.arr[i][j].render(displayShape, displayNeighbors, displayNewBorn);
                this.arr[i][j].resetBorn();
            }
        }
    }
}