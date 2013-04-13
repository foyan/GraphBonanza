function Edge(vertex1, vertex2) {
	
	var self = this;
	
	this.vertex1 = vertex1;
	
	this.vertex2 = vertex2;
	
	vertex1.edges.push(this);
	
	vertex2.edges.push(this);
	
}
