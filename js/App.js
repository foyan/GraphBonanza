function App () {
	
	var self = this;
	
	this.builder = new GraphBuilder();
	
	this.playground = new Playground(this);
	
	this.looper = new Looper(this.builder);
	
}
