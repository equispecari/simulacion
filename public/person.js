function Person() {
	this.x = random(0, width);
	this.y = random(0, height - 300);
	this.infected = false;
	this.immune = false;
	this.daysLeft = random(30, 140);
	this.vx = random(-5, 5);
	this.vy = random(-5, 5);
	this.dead = false;
	var r = random(0, 1);
	this.immunityOn = false;
	this.deathOn = false;
	this.comorbidities = false;
	if (r < 0.05) this.comorbidities = true;

	this.setVel = function (vx, vy) {
		this.vx = vx;
		this.vy = vy;
	};
	this.resetVel = function () {
		this.vx = random(-5, 5);
		this.vy = random(-5, 5);
	};

	this.show = function () {
		if (this.infected) fill(200, 0, 0);
		else if (this.immune) fill(0, 0, 200);
		else if (this.dead) fill(0, 0, 0);
		else fill(0, 200, 0);
		ellipse(this.x, this.y, 10, 10);
	};

	this.move = function () {
		if (
			this.x + this.vx > width ||
			this.x + this.vx < 0 ||
			this.y + this.vy > height - 300 ||
			this.y + this.vy < 0
		) {
			this.resetVel();
		} else {
			if (this.infected) {
				if (this.immunityOn && this.daysLeft <= 0) {
					this.infected = false;
					this.immune = true;
				} else if (this.deathOn) {
					var k = random(0, 1);
					if (this.comorbidities) {
						if (k < 0.02) {
							this.dead = true;
							this.infected = false;
							this.immune = false;
							this.daysLeft = 0;
						}
					} else if (k < 0.00001) {
						this.dead = true;
						this.infected = false;
						this.immune = false;
						this.daysLeft = 0;
					}
				}
				if (this.deathOn || this.immunityOn) this.daysLeft--;
			}
			if (!this.dead) {
				this.x += this.vx;
				this.y += this.vy;
			}
		}
	};
	this.contractVirus = function () {
		if (!this.immune) this.infected = true;
	};
	this.isInfected = function () {
		return this.infected;
	};
	this.isImmune = function () {
		return this.immune;
	};
	this.isDead = function () {
		return this.dead;
	};
	this.calcDistance = function (other) {
		return dist(this.x, this.y, other.x, other.y);
	};
}
