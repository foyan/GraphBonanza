function OnlineProblem(graph, algo) {
	
	var self = this;
	
	this.graph = graph;
	
	this.algo = algo;
	
	this.index = 0;
	
	this.start = function() {
		self.index = 0;
		self.algo.init();
	}
	
	this.done = function () {
		return self.index == self.graph.verteces.length;
	}
	
	this.step = function() {
		
		var vertex = self.graph.verteces[self.index];
		var ov = new OnlineVertex(self.index);
		
		var friendString = "";
		
		for (var i = 0; i < vertex.friends.length; i++) {
			var friend = vertex.friends[i];
			if (friend.index < self.index) {
				ov.friendIndices.push(friend.index);
				friendString += "#" + friend.index + " (" + friend.color + ")<br/>";
			}
		}
		
		var result = self.algo.assign(ov);
		vertex.color = result.color;
		vertex.asked = result.asked;
		vertex.revealedFriends = friendString;

		self.colorCount = Math.max(self.colorCount, vertex.color + 1);

		return self.index++;
	
	}
	
	this.colorCount = 0;
	
}
