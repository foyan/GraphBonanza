function Graph() {

	var self = this;
	
	this.verteces = [];
	
	this.edges = [];
	
	this.eachVertex = function (fn) {
		for (var i = 0; i < self.verteces.length; i++) {
			fn(self.verteces[i]);
		}
	}
	
	this.eachEdge = function (fn) {
		for (var i = 0; i < self.edges.length; i++) {
			fn(self.edges[i]);
		}
	}

}