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
			r["_" + self.usedColors[vertex.friendIndices[i]]] = true;
		}
		
		var gap = -1;
		for (var i = 0; i < self.maxColorCount(); i++) {
			if (!r["_" + i]) {
				gap = i;
				break;
			}
		}
		
		var c;
		
		if (gap < self.maxColorCount()-2) {
			c = gap;
			console.log("#" + vertex.index + ": gap " + gap + " < k-1 => " + c);
		} else if (gap == self.maxColorCount() - 2 && r["_" + (self.maxColorCount() - 1)]) {
			c = gap;
			console.log("#" + vertex.index + ": gap " + gap + " = k-1, k in friends => " + c);
		} else if (gap == self.maxColorCount() - 1 && r["_" + (self.maxColorCount() - 2)]) {
			c = gap;
			console.log("#" + vertex.index + ": gap " + gap + " = k, k-1 in friends => " + c);
		} else {
			self.adviceCount(self.adviceCount()+1);
			c = self.maxColorCount() - 2 + self.oracle.ask(vertex);
			console.log("#" + vertex.index + ": gap " + gap + " = ?, asking for advice => " + c);
		}
		
		console.log("#" + vertex.index + ": " + c);
		
		self.usedColors[vertex.index] = c;
		return c;
				
	}
	
}
