function Playground(app) {
	
	var self = this;
	
	this.graph = ko.observable(null);
	
	this.sigma = null;
		
	this.app = app;
	
	this.colorCount = ko.observable(null);
	
	this.colors = [
		"#2219B2",
		"#C10087",
		"#B1F100",
		"#FFC300",
		"#7872D8",
		"#7D0057",
		"#91B52D",
		"#BF9E30"
	];

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
		self.graph(self.app.builder.build());
	}
	
	this.drawGraph = function () {
		self.sigma = self.sigma || self.setupSigma($("#space").get(0));
		self.sigma.emptyGraph();

	
		var shoreIndices = [0, 0];
		for (var i = 0; i < self.graph().verteces.length; i++) {
			var vertex = self.graph().verteces[i];
			self.sigma.addNode("#" + i, {
				label: "#" + i,
				color: "white",
				x: i, //shoreIndices[vertex.shore]++,
				y: vertex.shore * 20,
				hidden: 1
			});
		}

		for (var i = 0; i < self.graph().edges.length; i++) {
			var edge = self.graph().edges[i];
			self.sigma.addEdge(edge.vertex1.index + "#" + edge.vertex2.index, "#" + edge.vertex1.index, "#" + edge.vertex2.index);
		}
		
		self.sigma.draw();
		
	}
	
	this.redraw = function () {
		
		self.graph().eachVertex(function (vertex) {
			self.sigma.iterNodes(function (node) {
				node.color = self.colors[vertex.color % self.colors.length];
				node.label = "#" + vertex.index + ". color: " + vertex.color + ", revealed friends: ";
				node.assignedColor = vertex.color;
			}, ["#" + vertex.index]);
		});
		
		self.sigma.draw();
	}
	
	this.solve = function () {
		var problem = new OnlineProblem(self.graph(), new FirstFitAlgo());
		
		problem.start();
		
		while (!problem.done()) {
			problem.step();
		}
		
		self.colorCount(problem.colorCount);
	}
	
	this.arrangeShores = function () {
		self.sigma.iterNodes(function (node) {
			node.y = node.attr.assignedColor * 20 / self.colorCount();
		});	
	}
	
}
