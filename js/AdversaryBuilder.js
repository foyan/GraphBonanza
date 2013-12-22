function AdversaryBuilder() {
	
	this.build = function(n, k) {
		
		var graph = new Graph();
		
		var root = new Vertex();
		root.index = 0;
		root.shore = 0;
		
		graph.verteces.push(root);
		
		for (var i = 1; i < n; i++) {
			var v = new Vertex();
			v.shore = 1;
			v.index = i;
			v.friends.push(root);
			root.friends.push(v);
			graph.verteces.push(v);
		}
		
		return graph;
		
	}
	
}
