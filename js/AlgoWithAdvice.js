function AlgoWithAdvice(maxColorCount, adviceCount, oracle) {
	
	var self = this;
	
	this.maxColorCount = maxColorCount;
	this.adviceCount = adviceCount;
	this.usedColors = [];
	this.oracle = oracle;
	
	this.init = function () {
		self.usedColors = [];
		self.adviceCount(0);		
	}
	
	this.assign = function (vertex) {
		
		var r = {};
		for (var i = 0; i < vertex.friendIndices.length; i++) {
			r[self.usedColors[vertex.friendIndices]] = true;
		}
		
		var gap = -1;
		for (var i = 0; i < self.maxColorCount() -1; i++) {
			if (!r[i]) {
				gap = i;
				break;
			}
		}
		
		var c;
		
		if (gap == self.maxColorCount() - 2 && r[self.maxColorCount() - 1]) {
			c = gap;
		} else if (gap == self.maxColorCount() - 1 && r[self.maxColorCount() - 2]) {
			c = gap;
		} else if  (gap < self.maxColorCount()) {
			c = gap;
		} else {
			self.adviceCount(self.adviceCount()+1);
			c = self.maxColorCount() - 2 + self.oracle.ask(vertex);
		}
		
		self.usedColors[vertex.index] = c;
		return c;
				
	}
	
}
