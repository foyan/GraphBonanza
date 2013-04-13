function OnlineProblem(graph, algo) {
	
	var self = this;
	
	this.graph = graph;
	
	this.algo = algo;
	
	this.index = 0;
	
	this.start = function() {
		self.index = 0;
		self.algo.init();
	}
	
	this.done = function () {
		return self.index == self.graph.verteces.length;
	}
	
	this.step = function() {
		
		var vertex = self.graph.verteces[self.index];
		var ov = new OnlineVertex(self.index);
		for (var i = 0; i < vertex.edges.length; i++) {
			var edge = vertex.edges[i];
			if (edge.vertex1.index < self.index) {
				ov.friendIndices.push(edge.vertex1.index);
			}
			if (edge.vertex2.index < self.index) {
				ov.friendIndices.push(edge.vertex2.index);
			}
		}
		
		vertex.color = self.algo.assign(ov);

		return self.index++;
	
	}
	
}
