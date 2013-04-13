function GraphBuilder() {

	var self = this;
	
	this.vertexCount = 100;
	
	this.getBalance = function(index) {
		return 0.5;
	}
	
	this.getEdgeProbability = function(index) {
		return 0.01;
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
		
		graph.eachVertex(function (vertex) {
			if (vertex.edges.length == 0) {
				var otherShore = shores[(vertex.shore + 1) % 2];
				var index = Math.floor(Math.random() * otherShore.length);
				
				var edge = new Edge(vertex, otherShore[index]);
				vertex.edges.push(edge);
				otherShore[index].edges.push(edge);
				graph.edges.push(edge);
			}
		});
		
		return graph;

	}
	
}
