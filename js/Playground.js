function Playground(app) {
	
	var self = this;
	
	this.graph = ko.observable(null);
	
	this.sigma = null;
		
	this.app = app;
	
	this.colorCount = ko.observable(null);
	
	this.maxColorCount = ko.observable(4);
	
	this.adviceCount = ko.observable(0);
		
		
	this.upperAdviceBound = ko.computed(function () {
		if (!self.graph()) {
			return 0;
		}
		return Math.ceil(self.graph().verteces.length / Math.sqrt(Math.pow(2, self.maxColorCount() - 1)));
	});
		
	this.wnd = {
		start: ko.observable(0),
		end: ko.observable(100)
	}
	
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
	
	this.getVertexColor = function (vertex) {
		if (vertex.color == -1) {
			return "white";
		}
		return self.colors[vertex.color % self.colors.length];
	}

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
		
		self.sigma.addNode("head", {
			label: "Head",
			color: "gray",
			x: self.wnd.start() - 1,
			y: 10
		});
		
		self.sigma.addNode("tail", {
			label: "Tail",
			color: "gray",
			x: self.wnd.end(),
			y: 10
		});

		self.graph().eachVertex(function (vertex) {
			self.sigma.addNode("#" + vertex.index, {
				label: "#" + vertex.index,
				x: vertex.index,
				y: vertex.shore * 15,
				assignedColor: vertex.color,
				color: self.getVertexColor(vertex)
			});
		}, self.wnd.start(), self.wnd.end());
		
		var connectedToHead = {};
		var connectedToTail = {};
		
		self.graph().eachVertex(function (vertex) {
			for (var i = 0; i < vertex.friends.length; i++) {
				var friend = vertex.friends[i];
						
				var edgeColor = "white";
									
				var friendId = "#" + friend.index;
				if (friend.index < self.wnd.start()) {
					if (connectedToHead[vertex.index]) {
						continue;
					}
					connectedToHead[vertex.index] = true;
					friendId = "head";
					edgeColor = "gray";
				} else if (friend.index >= self.wnd.end()) {
					if (connectedToTail[vertex.index]) {
						continue;
					}
					connectedToTail[vertex.index] = true;
					friendId = "tail";
					edgeColor = "gray";
				} else if (vertex.shore == 1) {
					continue;
				}
				
				self.sigma.addEdge(vertex.index + "#" + friend.index, "#" + vertex.index, friendId, { color: edgeColor });
			}
		}, self.wnd.start(), self.wnd.end());
		
		self.sigma.draw();
		
	}
	
	this.redraw = function () {
		
		self.graph().eachVertex(function (vertex) {
			if (vertex.index >= self.wnd.start() && vertex.index < self.wnd.end()) {
				self.sigma.iterNodes(function (node) {
					node.color = self.colors[vertex.color % self.colors.length];
					node.label = "#" + vertex.index + ". color: " + vertex.color + ", revealed friends: ";
					node.assignedColor = vertex.color;
				}, ["#" + vertex.index]);
			}
		});
		
		self.sigma.draw();
	}
	
	this.solve = function (algo) {
		var problem = new OnlineProblem(self.graph(), algo);
		
		problem.start();
		
		while (!problem.done()) {
			problem.step();
		}
		
		self.colorCount(problem.colorCount);
	}
	
	this.arrangeShores = function () {
		self.sigma.iterNodes(function (node) {
			if (node.label != "Head" && node.label != "Tail")
			node.y = node.attr.assignedColor * 20 / self.colorCount();
		});	
	}
	
	this.changeWindow = function (offset) {
		self.wnd.start(self.wnd.start() + offset);
		self.wnd.end(self.wnd.end() + offset);
	}
	
	this.windowDisplay = ko.computed(function () {
		return "#" + self.wnd.start() + " – #" + self.wnd.end();
	});
	
}
