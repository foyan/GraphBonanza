function GraphBuilder() {

	var self = this;
	
	this.vertexCount = 100;
	
	this.getBalance = function(index) {
		return 0.5;
	}
	
	this.getEdgeProbability = function(index1, index2) {
		return 0.2;
	} 

	this.build = function() {
		
		var graph = new Graph();
		
		var shores = [ [], [] ];
		
		for (var i = 0; i < self.vertexCount; i++) {
			var vertex = new Vertex();
			vertex.index = i;
			vertex.shore = Math.random() < self.getBalance(i) ? 0 : 1;
			
			shores[vertex.shore].push(vertex);
			graph.verteces.push(vertex);			
		}
		
		for (var i = 0; i < shores[0].length; i++) {
			for (var j = 0; j < shores[1].length; j++) {
				if (Math.random() < self.getEdgeProbability(i, j)) {
					var edge = new Edge(shores[0][i], shores[1][j]);
					graph.edges.push(edge);
				}
			}
		}
				
		return graph;

	}
	
}
