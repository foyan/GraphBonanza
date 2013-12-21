function Looper(builder) {

	var self = this;
	
	this.count = ko.observable(100);
	
	this.runCount = ko.observable(0);
	this.runner = null;
	
	this.builder = builder;
	
	this.firstFitVersusAdvice = function () {
		var graph = self.builder.build();
		
		var ff = new FirstFitAlgo();
		var problem = new OnlineProblem(graph, ff);
		
		problem.start();
		
		while (!problem.done()) {
			problem.step();
		}
		
		var benchmark = problem.colorCount;
		
		for (var i = self.results().length; i <= benchmark; i++) {
			var res = {
				colors: i,
				samples: ko.observable(0),
				minAdvices: ko.observable(9999),
				maxAdvices: ko.observable(-9999),
				avgAdvices: ko.observable(0)
			};
			self.results.push(res);
		}
		
		var result = self.results()[benchmark];
				
		
		var adviceCount = ko.observable(0);
		var aa = new AlgoWithAdvice(benchmark, adviceCount, new Oracle(graph));
		
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
		
		result.avgAdvices(Math.ceil((result.avgAdvices() * result.samples() + adviceCount()) / (result.samples() + 1)));

		result.samples(result.samples()+1);

	}
	
	this.loop = function (runner) {
		self.runCount(0);
		self.results([]);
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
	
	this.optimalVersusAdvice = function () {
	}
	
	this.experiments = [
		{name: "FF vs. Advice", runner: this.firstFitVersusAdvice},
		{name: "Opt vs. Advice", runner: this.optimalVersusAdvice}
	];
	
	this.results = ko.observableArray();
	
	
	
}
