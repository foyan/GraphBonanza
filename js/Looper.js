function Looper(builder) {

	var self = this;
	
	this.count = ko.observable(1000);
	
	this.runCount = 0;
	this.runner = null;
	
	this.builder = builder;
	
	this.firstFitVersusAdvice = function () {
		var graph = self.builder.build();
	}
	
	this.loop = function (runner) {
		self.runCount = 0;
		self.runner = runner;
		self.loop_();
	}
	
	this.loop_ = function() {
		if (self.runCount < self.count()) {
			console.log(self.runCount);
			self.runner();
			self.runCount++;
			setTimeout(self.loop_, 5);
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
	
	
	
}
