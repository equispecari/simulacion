class Person {
	constructor(x, y, i = false) {
		this.r = 10;
		this.x = x;
		this.y = y;
		this.vitX = random(-3, 3);
		this.vitY = random(-3, 3);
		this.infected = i;
		this.immune = false;
		this.dead = false;
		this.daysLeft = null;
	}

	move() {
		if (!this.dead) {
			if (this.infected && this.daysLeft === null) {
				this.daysLeft = random(30, 140);
			}
			if (this.infected && this.daysLeft <= 0) {
				this.infected = false;
				this.immune = true;
			}
			if (this.infected && this.daysLeft > 0 && !this.immune) {
				this.daysLeft--;
				var k = random(0, 1.0);
				if (k < 0.0005) {
					//mortalidad
					this.dead = true;
					this.infected = false;
					this.immune = false;
					this.daysLeft = 0;
				}
			}
			this.x += this.vitX;
			this.y += this.vitY;

			if (this.x > width) {
				this.vitX = random(-3, -1);
			}
			if (this.x < 0) {
				this.vitX = random(1, 3);
			}
			if (this.y > height) {
				this.vitY = random(-3, -1);
			}
			if (this.y < 0) {
				this.vitY = random(1, 3);
			}
		}
	}

	contractVirus() {
		if (!this.immune) this.infected = true;
	}

	isInfected() {
		return this.infected;
	}

	isImmune() {
		return this.immune;
	}

	isDead() {
		return this.dead;
	}

	calcDistance(other) {
		return dist(this.x, this.y, other.x, other.y);
	}

	getRadio() {
		return this.r;
	}

	show() {
		let c = "rgb(0%,100%,0%)";
		if (this.infected) c = "rgb(100%,0%,0%)";
		if (this.dead) c = "rgb(0%,0%,0%)";
		if (this.immune) c = "rgb(0%,0%,100%)";
		fill(c);
		noStroke();
		ellipse(this.x, this.y, this.r * 2);
	}
}
