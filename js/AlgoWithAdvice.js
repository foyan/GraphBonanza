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
	
	this.assign = function (vertex) {
		
		var k = self.maxColorCount;
		
		var C = [];
		for (var i = 0; i < k; i++) {
			C.push(i);
		}
		
		C = $.grep(C, function (c) {
			return $.grep(vertex.friendIndices, function (fc) {
				return self.usedColors["_" + fc] == c;
			}).length == 0;
		});
		
		var result = {
			color: C[0],
			asked: false
		};
		
		if (C.length == 2 && C[0] == k-2 && C[1] == k-1) {
			self.adviceCount(self.adviceCount()+1);
			result = {
				color: k - 2 + oracle.ask(vertex),
				asked: true
			};
			
			var friendString = "#" + vertex.index;
			for (var i = 0; i < vertex.friendIndices.length; i++) {
				friendString += "#" + vertex.friendIndices[i]+ " (" + self.usedColors["_" + vertex.friendIndices[i]] + ") / ";
			}
			
			console.log(friendString);
		}
		
		self.usedColors["_" + vertex.index] = result.color;
		
		return result;
						
	}
	
}
