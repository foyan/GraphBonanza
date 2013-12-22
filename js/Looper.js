function Looper(app) {

	var self = this;
	
	this.count = ko.observable(100);
	
	this.runCount = ko.observable(0);
	this.runner = null;
	
	this.builder = app.builder;
	
	this.app = app;
	
	this.optimalVersusAdvice = function () {

		var builder = new GraphBuilder();
		var n = (self.runCount() % 100) * 10;
		builder.vertexCount(n);
		builder.probability(0.01);

		var graph = builder.build();
				
		var benchmark = n / 10;
		
		for (var i = self.results().length; i <= benchmark; i++) {
			var res = {
				colors: i,
				samples: ko.observable(0),
				minAdvices: ko.observable(9999),
				maxAdvices: ko.observable(-9999),
				avgAdvices: ko.observable(0),
				upperBound: 0,
				badHits: ko.observableArray()
			};
			self.results.push(res);
		}
		
		var result = self.results()[benchmark];
			
		var adviceCount = ko.observable(0);
		var aa = new AlgoWithAdvice(2, adviceCount, new Oracle(graph));
		
		var problem2 = new OnlineProblem(graph, aa);
		
		problem2.start();
		
		while (!problem2.done()) {
			problem2.step();
		}
		
		if (result.minAdvices() > adviceCount()) {
			result.minAdvices(adviceCount());
		}
		if (result.maxAdvices() < adviceCount()) {
			result.maxAdvices(adviceCount());
		}
		
		result.avgAdvices((result.avgAdvices() * result.samples() + adviceCount()) / (result.samples() + 1));

		result.samples(result.samples()+1);
		self.avgAdvices(self.avgAdvices() + adviceCount());
		self.avgColors(self.avgColors() + benchmark);

	}
	
	
	this.firstFitVersusAdvice = function () {
		
		var graph = self.builder.build();
				
		var ff = new FirstFitAlgo();
		var problem = new OnlineProblem(graph, ff);
		
		problem.start();
		
		while (!problem.done()) {
			problem.step();
		}
		
		var benchmark = problem.colorCount;
		
		var theorUpperBound = graph.verteces.length / Math.sqrt(Math.pow(2, benchmark - 1));

		for (var i = self.results().length; i <= benchmark; i++) {
			var res = {
				colors: i,
				samples: ko.observable(0),
				minAdvices: ko.observable(9999),
				maxAdvices: ko.observable(-9999),
				avgAdvices: ko.observable(0),
				upperBound: Math.floor(graph.verteces.length / Math.sqrt(Math.pow(2, i - 1))),
				badHits: ko.observableArray()
			};
			self.results.push(res);
		}
		
		var result = self.results()[benchmark];
				
		var k = benchmark;
		var ac = theorUpperBound + 1;
		while (ac > theorUpperBound) {
			var adviceCount = ko.observable(0);
			var aa = new AlgoWithAdvice(k, adviceCount, new Oracle(graph));
			
			var problem2 = new OnlineProblem(graph, aa);
			
			problem2.start();
			
			while (!problem2.done()) {
				problem2.step();
			}
			
			ac = adviceCount();
			k--;			
		}
				
		if (result.minAdvices() > adviceCount()) {
			result.minAdvices(adviceCount());
		}
		if (result.maxAdvices() < adviceCount()) {
			result.maxAdvices(adviceCount());
		}
		
		if (adviceCount() > theorUpperBound && benchmark > 2) {
			console.log(graph);
			result.badHits.push({
				graph: graph,
				name: "#" + self.runCount()
			});
		}
		
		result.avgAdvices((result.avgAdvices() * result.samples() + adviceCount()) / (result.samples() + 1));

		result.samples(result.samples()+1);
		self.avgAdvices(self.avgAdvices() + adviceCount());
		self.avgColors(self.avgColors() + benchmark);

	}
	
	this.loop = function (runner) {
		self.runCount(0);
		self.results([]);
		self.avgAdvices(0);
		self.avgColors(0);
		self.runner = runner;
		self.loop_();
	}
	
	this.loop_ = function() {
		if (self.runCount() < self.count()) {
			self.runner();
			self.runCount(self.runCount() + 1);
			setTimeout(self.loop_, 0);
		} else {
			console.log("Ciao");
		}
	}
	

	this.experiments = [
		{name: "FF vs. Advice", runner: this.firstFitVersusAdvice},
		{name: "Opt vs. Advice", runner: this.optimalVersusAdvice}
	];
	
	this.results = ko.observableArray();
	
	this.avgAdvices = ko.observable(0);
	
	this.avgAdvicesDisplay = ko.computed(function () {
		return self.runCount() > 0 ? self.avgAdvices() / self.runCount() : 0;
	});
	
	this.avgColors = ko.observable(0);
	
	this.avgColorsDisplay = ko.computed(function () {
		return self.runCount() > 0 ? self.avgColors() / self.runCount() : 0;
	});
	
	this.sendToPlayground = function(graph) {
		self.app.show(self.app.showPlayground);
		self.app.playground.graph(graph.graph);
		self.app.playground.drawGraph();
	}

}
