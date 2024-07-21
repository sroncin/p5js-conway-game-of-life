// Stéphane Roncin
// Game of Life

let grid;
let resolution = 10;
var drawThings;
var displayShape = 1; //1=rect, 2 = elipse
var nonStopPlaying = false;
var displayNeighbors = false;
var displayNewBorn = false;
var infectneighbors = true;
var changeGenerationColor = true;
let radioShape;
let sliderNeighbors;

function setup() {
	checkboxPlay = createCheckbox('Play non stop (Click to see evolution per steps when not checked)', false);
	checkboxPlay.parent('form-holder');
	checkboxPlay.changed(chkPlayNonStop);

	checkboxGenerationColor = createCheckbox('Change Color on new generation', true);
	checkboxGenerationColor.parent('form-holder');
	checkboxGenerationColor.changed(chkGenerationColor);

	checkboxNeighbors = createCheckbox('Show Neighbours', false);
	checkboxNeighbors.parent('form-holder');
	checkboxNeighbors.changed(chkNeighbors);

	checkboxNewBorns = createCheckbox('Highlight New Born cell', false);
	checkboxNewBorns.parent('form-holder');
	checkboxNewBorns.changed(chkNewBorns);

	checkboxInfectBorns = createCheckbox('New cells infect neighbors', true);
	checkboxInfectBorns.parent('form-holder');
	checkboxInfectBorns.changed(chkInfectBorns);

	radioShape = createRadio("radioShape");
	radioShape.option(1, 'rectangle');
	radioShape.option(4, 'star');
	radioShape.option(2, 'ellipse');
	radioShape.option(3, 'triangle');
	radioShape.selected('1');
	radioShape.parent('form-holder');

	sliderResolution = createSlider(2, 20, resolution);
	sliderResolution.style('width', '100px');
	sliderResolution.parent('resolution-holder');
	sliderResolution.changed(sliderResChange)
	
	buttonReset = createButton('reset');
	buttonReset.parent('reset-holder');
	buttonReset.mousePressed(resetButtonClick);

	var canvas = createCanvas(550, 550); //400, 400
	canvas.parent('conway-holder');
	
	sliderResChange();
	drawThings=true;
	//noLoop();
}

function chkPlayNonStop() {
	if (this.checked()) {
		nonStopPlaying = true;
	} else {
		nonStopPlaying = false;
	}
}
function chkGenerationColor() {
	if (this.checked()) {
		changeGenerationColor = true;
	} else {
		changeGenerationColor = false;
	}
}
function chkNeighbors() {
	if (this.checked()) {
		displayNeighbors = true;
	} else {
		displayNeighbors = false;
	}
}
function chkNewBorns() {
	if (this.checked()) {
		displayNewBorn = true;
	} else {
		displayNewBorn = false;
	}
}
function chkInfectBorns() {
	if (this.checked()) {
		infectneighbors = true;
	} else {
		infectneighbors = false;
	}
}
function sliderResChange() {
	resolution = parseInt(sliderResolution.value(), 10);
	document.getElementById('resVal').innerText = sliderResolution.value();
	resetButtonClick();
}

function resetButtonClick() {
	let cols = parseInt(width / resolution, 10);
	let rows = parseInt(height / resolution, 10);
	grid = new ConwayMatrice(cols, rows, resolution);
	grid.randomInitialize(); //will contains values from 0 to 1
}

function draw() {
	if (drawThings || nonStopPlaying == true) {
		background(255);
		displayShape = parseInt(radioShape.value(), 10);

		grid.drawGrid(displayShape, displayNeighbors, displayNewBorn);
		grid.computeNextGrid(changeGenerationColor)
		if (infectneighbors == true) grid.neighborsInfection();
		if (nonStopPlaying == false) drawThings = false;
	}
}

function mouseClicked() {
	drawThings = !drawThings;
}