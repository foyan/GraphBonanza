function AlgoWithAdvice(maxColorCount, adviceCount, oracle) {
	
	var self = this;
	
	this.maxColorCount = maxColorCount;
	this.adviceCount = adviceCount;
	this.oracle = oracle;
	
	this.usedColors = {};
	
	this.init = function () {
		self.usedColors = {};
		self.adviceCount(0);		
	}
	
	this.hasColor = function (vertex, c) {
		return $.grep(vertex.friendIndices, function (fc) {
			return self.usedColors["_" + fc] == c;
		}).length > 0;
	}
	
	this.assign = function (vertex) {
		
		var k = self.maxColorCount;
		
		var c = -1;
		
		for (var i = 0; i < k; i++) {
			if (!self.hasColor(vertex, i)) {
				c = i;
				break;
			}
		}
		
		var result = {
			color: c,
			asked: false
		};
		
		if (c == k-2 && !self.hasColor(vertex, k-1)) {
			self.adviceCount(self.adviceCount()+1);
			result = {
				color: k - 2 + oracle.ask(vertex),
				asked: true
			};
		}
		
		self.usedColors["_" + vertex.index] = result.color;
		
		return result;
						
	}
	
}
