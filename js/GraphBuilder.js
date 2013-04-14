function GraphBuilder() {

	var self = this;
	
	this.vertexCount = ko.observable(1000000);
	
	this.shoreDistributions = [
		new UniformDistribution(0.5)
	];
	
	this.shore1EdgeDistributions = [
		new UniformDistribution(0.35)
	];
	this.shore2EdgeDistributions = [
		new UniformDistribution(0.11)
	];
		
	this.shoreDistribution = ko.observable(this.shoreDistributions[0]);
	this.shore1EdgeDistribution = ko.observable(this.shore1EdgeDistributions[0]);
	this.shore2EdgeDistribution = ko.observable(this.shore2EdgeDistributions[0]);
	
	this.build = function() {
		
		var graph = new Graph();
		
		var shores = [ [], [] ];
		
		for (var i = 0; i < self.vertexCount(); i++) {
			var vertex = new Vertex();
			vertex.index = i;
			vertex.shore = Math.random() < self.shoreDistribution().get(i, 0, self.vertexCount()) ? 0 : 1;
			
			shores[vertex.shore].push(vertex);
			graph.verteces.push(vertex);			
		}
		
		for (var i = 0; i < shores[0].length; i++) {
			for (var j = 0; j < shores[1].length; j++) {
				if (Math.random() < self.shore1EdgeDistribution().get(i, 0, shores[0].length) * self.shore2EdgeDistribution().get(i, 0, shores[1].length)) {
					var edge = new Edge(shores[0][i], shores[1][j]);
					graph.edges.push(edge);
				}
			}
		}
				
		return graph;

	}
	
}
