function AdversaryBuilder() {
	
	var self = this;
	
	this.build = function(n, k) {
		
		var graph = new Graph();
		
		var levels = [];
		for (var i = 0; i <= k-2; i++) {
			levels.push([]);
		}
		
		var roots = [];
		
		for (var i = 1; i <= k-2; i++) {
			roots.push(self.buildTree(i, graph, levels, 0));
		}
		
		var ij = 0;
		for (var i = 0; i < levels.length; i++) {
			for (var j = 0; j < levels[i].length; j++) {
				levels[i][j].index = ij++;
			}
		}
		
		graph.verteces.sort(function (a, b) {
			return a.index - b.index;
		});
		

		for (var i = ij; i < n; i++) {
			var v = new Vertex();
			v.shore = 1;
			v.index = i;
			for (var j = 0; j < roots.length; j++) {
				v.friends.push(roots[j]);
				roots[j].friends.push(v);
			}
			graph.verteces.push(v);
		}
		
		
		return graph;
		
/*		var root = new Vertex();
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
		
		return graph;*/
		
	}
	
	this.buildTree = function (k, graph, levels, shore) {
				
		var x = new Vertex();
		x.shore = shore;

		for (var kk = k-1; kk >= 1; --kk) {
			var tm1 = self.buildTree(kk, graph, levels, shore == 0 ? 1 : 0);
			x.friends.push(tm1);
			tm1.friends.push(x);
		}
		
		graph.verteces.push(x);
		levels[k].push(x);
		
		return x;
				
	}
	
	
}
