function Oracle (graph) {
	
	var self = this;
	
	this.graph = graph;
	
	this.ask = function (vertex) {
		var offlineVertex = self.graph.verteces[vertex.index];
		return offlineVertex.shore;
	}
	
}
