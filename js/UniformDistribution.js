function UniformDistribution(p) {
	
	var self = this;
	
	this.p = ko.observable(p);
	
	this.name = ko.computed(function () {
		return "Uniform, p = " + self.p();
	});
	
	this.get = function(current, min, max) {
		return self.p();
	}
	
}
