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
		console.log(new Date() + ": Building...");
		self.graph(self.app.builder.build());
		console.log(new Date() + ": Built.");
	}
	
	this.drawGraph = function () {
		self.sigma = self.sigma || self.setupSigma($("#space").get(0));
		self.sigma.emptyGraph();
		
		var wnd = {
			start: 0,
			end: 100
		};

		self.sigma.addNode("head", {
			label: "Head",
			color: "gray",
			x: wnd.start - 1,
			y: 10
		});
		
		self.sigma.addNode("tail", {
			label: "Tail",
			color: "gray",
			x: wnd.end,
			y: 10
		});

		self.graph().eachVertex(function (vertex) {
			self.sigma.addNode("#" + vertex.index, {
				label: "#" + vertex.index,
				color: "white",
				x: vertex.index,
				y: vertex.shore * 20
			});
		}, wnd.start, wnd.end);

		self.graph().eachVertex(function (vertex) {
			if (vertex.shore == 0 || vertex.index < wnd.start || vertex.index >= wnd.end) {
				for (var i = 0; i < vertex.friends.length; i++) {
					var friend = vertex.friends[i];
					
					var friendId = "#" + friend.index;
					if (friend.index < wnd.start) {
						friendId = "head"
					} else if (friend.index >= wnd.end) {
						friendId = "tail"
					}
					
					self.sigma.addEdge(vertex.index + "#" + friend.index, "#" + vertex.index, friendId);
				}
			}
		}, wnd.start, wnd.end);
		
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
