function Playground(app) {
	
	var self = this;
	
	this.graph = null;
	
	this.sigma = null;
		
	this.app = app;
	
	this.setupSigma = function (space) {
		var si = sigma.init(space);
		
		si.drawingProperties({
			defaultLabelColor: '#ccc',
			edgeColor: "white"
		}).graphProperties({
			minNodeSize: 4,
			maxNodeSize: 4
		});

		return si;
	}
	
	this.buildGraph = function () {
		self.graph = self.app.builder.build();
	}
	
	this.drawGraph = function () {
		self.sigma = self.sigma || self.setupSigma($("#space").get(0));
		self.sigma.emptyGraph();

	
		var shoreIndices = [0, 0];
		for (var i = 0; i < self.graph.verteces.length; i++) {
			var vertex = self.graph.verteces[i];
			self.sigma.addNode("#" + i, {
				label: "#" + i,
				color: "white",
				x: shoreIndices[vertex.shore]++,
				y: vertex.shore * 10
			});
		}

		for (var i = 0; i < self.graph.edges.length; i++) {
			var edge = self.graph.edges[i];
			self.sigma.addEdge(edge.vertex1.index + "#" + edge.vertex2.index, "#" + edge.vertex1.index, "#" + edge.vertex2.index);
		}
		
		self.sigma.draw();
		
	}
	
}
