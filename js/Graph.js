function Graph() {

	var self = this;
	
	this.verteces = [];
		
	this.eachVertex = function (fn, start, end) {
		start = start || 0;
		end = Math.min(end || self.verteces.length, self.verteces.length);
		for (var i = start; i < end; i++) {
			fn(self.verteces[i]);
		}
	}
	
}