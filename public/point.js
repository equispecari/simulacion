function Point(x, y, red, green, blue) {
	this.x = x;
	this.y = y;
	this.red = red;
	this.green = green;
	this.blue = blue;

	this.calculateDistance = function (other) {
		return Math.sqrt(
			Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
		);
	};
	this.toString = function () {
		return "(" + this.x + "," + this.y + ")";
	};
	this.show = function () {
		stroke(this.red, this.green, this.blue);
		strokeWeight(1);
		fill(this.red, this.green, this.blue);
		ellipse(this.x, this.y, 2, 2);
	};
	this.getX = function () {
		return this.x;
	};
	this.getY = function () {
		return this.y;
	};
}
