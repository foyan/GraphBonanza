function App () {
	
	var self = this;
	
	this.builder = new GraphBuilder();
	
	this.playground = new Playground(this);
	
	this.looper = new Looper(this);
	
	this.showLooperResults = ko.observable(false);
	this.showPlayground = ko.observable(true);
	
	this.show = function(what) {
		$.each([ self.showLooperResults, self.showPlayground ], function () {
			this(this == what);
		});
	}
	
}
