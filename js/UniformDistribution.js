function UniformDistribution() {
	
	var self = this;
	
	this.p = ko.observable(0.5);
	
	this.name = ko.computed(function () {
		return "Uniform, p = " + self.p();
	});
	
	this.get = function(current, min, max) {
		return self.p();
	}
	
}
