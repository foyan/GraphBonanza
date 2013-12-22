function FirstFitAlgo() {
	
	var self = this;
	
	this.usedColors = [];
	
	this.init = function () {
		self.usedColors = [];
	}
	
	this.assign = function (vertex) {

		var c = 0;
		while (true) {
			var ok = true;
			for (var f = 0; f < vertex.friendIndices.length; f++) {
				ok &= self.usedColors[vertex.friendIndices[f]] != c;
			}
			if (ok) {
				break;
			}
			c++;
		}
		
		self.usedColors[vertex.index] = c;
		
		return {color: c, asked: false};

	}
	
}
