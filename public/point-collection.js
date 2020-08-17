function PointCollection() {
	this.collection = [];
	this.show = function () {
		for (var i = 0; i < this.collection.length; i++) {
			this.collection[i].show();
		}
	};
	this.addPoint = function (p) {
		this.collection.push(p);
	};
}
