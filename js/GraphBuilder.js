function GraphBuilder() {

	var self = this;

	this.vertexCount = ko.observable(1000);
	this.probability = ko.observable(0.1);
	this.shoreBalance = ko.observable(0.5);

	this.build = function() {

		var graph = new Graph();

		var shores = [[], []];
		
		var shore1 = shores[0];
		var shore2 = shores[1];
		
		console.log(": Starting vertices...");

		var shore1Count = Math.round(self.vertexCount() * self.shoreBalance());
		var vertexCount = self.vertexCount();
		for (var i = 0; i < vertexCount; i++) {
			var vertex = new Vertex();
			vertex.shore = i < shore1Count ? 0 : 1;
			
			shores[vertex.shore].push(vertex);
			graph.verteces.push(vertex);
		}

		console.log(": Done vertices. Starting edges...");

		var edgeCount = shore1Count * (vertexCount - shore1Count);
		var prob = self.probability();
		
		var logProb = Math.log(1 - prob);
		var e = -1;
		while (e < edgeCount) {
			var r = Math.random();
			var k = Math.max(0, Math.ceil(Math.log(r) / logProb - 1));
			e += (k + 1);
			
			var i = e % shore1Count;
			var j = Math.floor(e / shore1Count);
			
			if (i  < shore1.length && j < shore2.length) {
				var v1 = shore1[i];
				var v2 = shore2[j];
				v1.friends.push(v2);
				v2.friends.push(v1);					
			}
		}

		console.log(": Done edges. Shuffling...");
		self.shuffle(graph.verteces);
		
		for (var i = 0; i < graph.verteces.length; i++) {
			graph.verteces[i].index = i;
		}
		console.log(": Done shuffling.");

		return graph;

	}
	
	this.shuffle = function (array) {
		var tmp, current, top = array.length;

	    if(top) while(--top) {
	    	current = Math.floor(Math.random() * (top + 1));
	    	tmp = array[current];
	    	array[current] = array[top];
	    	array[top] = tmp;
	    }
	}
	
}
