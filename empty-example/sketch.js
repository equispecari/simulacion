//direction et vitesse des déplacements

let persons = [];

var community;
var rate;
var totalInfections;
var totalDead;
var totalImmune;

var currCount;

var radiusOfInfection;
function setup() {
	createCanvas(800, 400);
	community = 100;
	rate = 0.5;
	totalInfections = 0;
	totalDead = 0;
	generatePopulation(community);
	resetButton = createButton("Reset Population");
	resetButton.position(0, windowHeight - 25);
	resetButton.mousePressed(resetPop);
}

function generatePopulation(max = 1) {
	for (let i = 0; i < max; i++) {
		let x = random(width);
		let y = random(height);
		persons[i] = new Person(x, y);
	}
}

function draw() {
	//le fond change selon y
	background(150);
	for (let i = 0; i < persons.length; i++) {
		if (persons[i].isInfected()) {
			for (let j = 0; j < persons.length; j++) {
				if (
					i != j &&
					!persons[j].isDead() &&
					!persons[j].isInfected() &&
					!persons[j].isImmune()
				) {
					if (
						persons[i].calcDistance(persons[j]) <=
						persons[j].getRadio() * 2 + 10
					) {
						var r = random(0, 1);
						if (r < rate) {
							persons[j].contractVirus();
							totalInfections++;
						}
					}
				}
			}
		}
		persons[i].move();
		persons[i].show();
	}
}

function mousePressed() {
	if (mouseY < windowHeight - 150) {
		//rate
		persons.push(new Person(mouseX, mouseY, true));
		community++;
		totalInfections++;
	}
}

function resetPop() {
	persons = [];
	generatePopulation(community);
}

function keyPressed() {
	if (keyCode == 32) {
		playing = !playing;
	}
}
