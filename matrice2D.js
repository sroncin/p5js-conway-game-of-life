class Matrice2D {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.arr = new Array(this.cols);
        for (let i=0; i < this.cols; i++) {
            this.arr[i] = new Array(this.rows);
        }
    }

    getGrid() {
        return this.arr;
    }

    getCellVal(x, y) {
        let val = 0;
        if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) 
            val = this.arr[x][y];
        return val;
    }

    setCellVal(x, y, val) {
        if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) 
            this.arr[x][y] = val;
    }

    randomInitialize(maxIntValue) {
        for (let i=0; i < this.cols; i++) {
            for (let j=0; j < this.rows; j++) {
                this.arr[i][j] = floor(random(maxIntValue));
            }
        }
    }

}