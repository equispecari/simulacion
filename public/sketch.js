var community;
var rate;
var totalInfections;
var infectPerCycle;
var currCount;
var graph;

var rateSlider;
var resetButton;
var immuneToggle;
var deathToggle;
var diseaseDurationSlider;
var velSlider;
var infectionRadius;

var immuneOn;
var deathOn;

var num;
var vel;
var playing;
var time;
var totalImmune;
var totalDead;
var radiusOfInfection;
//todo
/*
 * Integrate death rate
 * Set duration bounds on disease
 * Set number of transmission points
 * Integrate information panel
 * Label Axes
 * Integrate mutation/viral classes
 */
function setup() {
	createCanvas(windowWidth, windowHeight);
	num = 500;
	time = 0;

	rateSlider = createSlider(0, 1000, 50);
	rateSlider.position(10, height - 95);
	rateSlider.style("width", "100px");

	infectionRadius = createSlider(1, 100, 25);
	infectionRadius.position(10, height - 35);
	infectionRadius.style("width", "100px");

	resetButton = createButton("Reinicia poblacion");
	resetButton.position(10, height - 300);
	resetButton.mousePressed(resetPop);

	velSlider = createSlider(0, 1000, 50);
	velSlider.position(10, height - 65);
	velSlider.style("width", "100px");

	vel = velSlider.value();
	radiusOfInfection = infectionRadius.value();

	deathToggle = createSlider(0, 1, 0);
	deathToggle.position(10, height - 250);
	deathToggle.style("width", "20px");

	deathOn = false;

	immuneToggle = createSlider(0, 1, 0);
	immuneToggle.position(10, height - 230);
	immuneToggle.style("width", "20px");

	immuneOn = true;

	playing = false;
	rate = 0.05;
	community = [];
	totalDead = 0;
	totalImmune = 0;

	for (var i = 0; i < num; i++) {
		community.push(new Person());

		community[i].vx = random(-vel / 100, vel / 100);
		community[i].vy = random(-vel / 100, vel / 100);
	}
	for (i = 0; i < num; i++) {
		//community[i].setVel(0,0);
	}
	community[0].contractVirus();
	totalInfections = 1;
	infectPerCycle = 1;
	currCount = 0;
	graph = new PointCollection();
}

function draw() {
	background(255);
	text("Probabilidad de transmisión: " + rate, 10, height - 95);
	text(
		"Velocidad de movimientos de la poblacion: " + velSlider.value() / 100,
		10,
		height - 65
	);
	text("Radio de infeccion: " + infectionRadius.value(), 10, height - 35);
	var immuneText;
	if (immuneToggle.value() == 0) {
		if (immuneOn == true) immuneCheck();
		immuneOn = false;
		immuneText = "off";
	} else {
		if (immuneOn == false) immuneCheck();
		immuneOn = true;
		immuneText = "on";
	}

	var deathText;
	if (deathToggle.value() == 0) {
		if (deathOn == true) deathCheck();
		deathOn = false;
		deathText = "off";
	} else {
		if (deathOn == false) deathCheck();
		deathOn = true;
		deathText = "on";
	}

	text("Inmunidad: " + immuneText, 40, height - 220);
	text("Muerte: " + deathText, 40, height - 240);

	rate = rateSlider.value() / 1000.0;
	radiusOfInfection = infectionRadius.value();
	if (velSlider.value() != vel) {
		vel = velSlider.value();
		changeVel();
	}
	if (playing) {
		for (var i = 0; i < community.length; i++) {
			var p = community[i];
			if (p.isInfected()) {
				for (var j = 0; j < community.length; j++) {
					var p1 = community[j];
					if (i != j && !p1.isDead() && !p1.isInfected() && !p1.isImmune()) {
						if (p.calcDistance(p1) < radiusOfInfection) {
							var r = random(0, 1);
							if (r < rate) {
								p1.contractVirus();
							}
						}
					}
				}
			}
			p.show();
			if (p.isInfected()) currCount++;
			if (p.isImmune()) totalImmune++;
			if (p.isDead()) totalDead++;
			if (frameCount % 1 == 0) {
				p.move();
			}
		}
		//populate the graph
		graph.addPoint(
			new Point(
				time + 200,
				height -
					map(totalImmune + currCount + totalDead, 0, community.length, 0, 300),
				255,
				0,
				255
			)
		);
		graph.addPoint(
			new Point(
				time + 200,
				height - map(totalImmune, 0, community.length, 0, 300),
				0,
				0,
				255
			)
		);
		graph.addPoint(
			new Point(
				time + 200,
				height - map(currCount, 0, community.length, 0, 300),
				255,
				0,
				0
			)
		);
		graph.addPoint(
			new Point(
				time + 200,
				height -
					map(
						community.length - (totalImmune + currCount + totalDead),
						0,
						community.length,
						0,
						300
					),
				0,
				255,
				0
			)
		);
		graph.addPoint(
			new Point(
				time + 200,
				height - map(totalDead, 0, community.length, 0, 300),
				0,
				0,
				0
			)
		);
		time++;
	} else {
		text(
			"Precione <ESPACIO> para empezar simulacion o pausar.",
			width / 2 - 100,
			height / 2
		);
	}
	graph.show();
	legend();
	currCount = 0;
	totalDead = 0;
	totalImmune = 0;
	fill(0);
	stroke(0);
}

function resetPop() {
	num = 500;
	playing = false;
	rate = 0;
	time = 0;
	totalDead = 0;
	totalImmune = 0;
	community = [];

	for (var i = 0; i < num; i++) {
		community.push(new Person());
	}
	vel = velSlider.value();
	changeVel();
	community[0].contractVirus();
	totalInfections = 1;
	infectPerCycle = 1;
	currCount = 0;
	graph = new PointCollection();
	immuneCheck();
	deathCheck();
}

function legend() {
	fill(0);
	stroke(0);
	strokeWeight(0);
	var positionY = 200;
	var positionX = 40;
	text("Susceptibles", positionX, height - positionY + 2);
	fill(0, 255, 0);
	ellipse(positionX - 20, height - positionY, 10, 10);

	fill(0);
	text("Immune", positionX, height - positionY + 23);
	fill(0, 0, 255);
	ellipse(positionX - 20, height - positionY + 20, 10, 10);

	fill(0);
	text("Infectados", positionX, height - positionY + 43);
	fill(255, 0, 0);
	ellipse(positionX - 20, height - positionY + 40, 10, 10);

	fill(0);
	text("Muertos", positionX, height - positionY + 63);
	fill(0, 0, 0);
	ellipse(positionX - 20, height - positionY + 60, 10, 10);

	fill(0);
	text(
		"Total infectado (actual y recuperado)",
		positionX,
		height - positionY + 83
	);
	stroke(255, 0, 255);
	strokeWeight(2);
	line(
		positionX - 15,
		height - positionY + 80,
		positionX - 25,
		height - positionY + 80
	);
	strokeWeight(0);
}

function keyPressed() {
	if (keyCode == 32) {
		playing = !playing;
	}
}

function mouseClicked() {
	for (var i = 0; i < community.length; i++) {
		if (dist(mouseX, mouseY, community[i].x, community[i].y) < 5) {
			community[i].infected = !community[i].infected;
		}
	}
}

function immuneCheck() {
	for (var i = 0; i < community.length; i++) {
		if (immuneToggle.value() == 0) community[i].immunityOn = false;
		else community[i].immunityOn = true;
	}
}

function deathCheck() {
	for (var i = 0; i < community.length; i++) {
		if (deathToggle.value() == 0) community[i].deathOn = false;
		else community[i].deathOn = true;
	}
}

function changeVel() {
	for (var i = 0; i < community.length; i++) {
		community[i].vx = random(-vel / 100, vel / 100);
		community[i].vy = random(-vel / 100, vel / 100);
	}
}
