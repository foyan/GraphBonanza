function GraphBuilder() {

	var self = this;

	this.vertexCount = ko.observable(1000);

	this.shoreDistributions = [new UniformDistribution(0.5)];

	this.shore1EdgeDistributions = [new UniformDistribution(0.35)];
	this.shore2EdgeDistributions = [new UniformDistribution(0.11)];

	this.shoreDistribution = ko.observable(this.shoreDistributions[0]);
	this.shore1EdgeDistribution = ko.observable(this.shore1EdgeDistributions[0]);
	this.shore2EdgeDistribution = ko.observable(this.shore2EdgeDistributions[0]);

	this.build = function() {

		var graph = new Graph();

		var shores = [[], []];
		
		var shore1 = shores[0];
		var shore2 = shores[1];

		console.log(": Starting verteces...");

		for (var i = 0; i < self.vertexCount(); i++) {
			var vertex = new Vertex();
			vertex.index = i;
			vertex.shore = Math.random() < self.shoreDistribution().get(i, 0, self.vertexCount()) ? 0 : 1;
			vertex.edgeProbability = (vertex.shore == 0 ? self.shore1EdgeDistribution() : self.shore2EdgeDistribution())
				.get(i, 0, self.vertexCount());

			shores[vertex.shore].push(vertex);
			graph.verteces.push(vertex);
		}

		console.log(": Done verteces. Starting edges...");

		for (var i = 0; i < shore1.length; i++) {
			for (var j = 0; j < shore2.length; j++) {
				var r = Math.random();
				var v1 = shore1[i];
				var v2 = shore2[j];		
				if (r < v1.edgeProbability && r < v2.edgeProbability) {
					v1.friends.push(v2);
					v2.friends.push(v1);
				}
			}
		}

		console.log(": Done edges.");

		return graph;

	}
}
