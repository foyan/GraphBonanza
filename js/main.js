$(function () {
				
});

var graph = null;

var si = null;

function newGraph() {
	var builder = new GraphBuilder();
	var space = $("#space").get(0);
	si = si || sigma.init(space);
	
	si.emptyGraph();
	
	si.drawingProperties({
        defaultLabelColor: '#ccc',
        edgeColor: "white"//,
        //defaultEdgeType: 'curve'
      }).graphProperties({
        minNodeSize: 5,
        maxNodeSize: 5
      });
	
	graph = builder.build();
	
	var shoreIndices = [0, 0];
	for (var i = 0; i < graph.verteces.length; i++) {
		var vertex = graph.verteces[i];
		si.addNode("#" + i, {
			label: "#" + i,
			color: "white",
			x: i, // shoreIndices[vertex.shore]++,
			y: vertex.shore * 20
		});
	}
	
	for (var i = 0; i < graph.edges.length; i++) {
		var edge = graph.edges[i];
		si.addEdge(edge.vertex1.index + "#" + edge.vertex2.index, "#" + edge.vertex1.index, "#" + edge.vertex2.index);
	}
	
	si.draw();
	
}

var colors = [
	"#2219B2",
	"#C10087",
	"#B1F100",
	"#FFC300"
];

function solve() {
	
	var problem = new OnlineProblem(graph, new FirstFitAlgo());
	
	problem.start();
	
	step(problem);
	
	//while (!problem.done()) {
	//}
		
}

function step(problem) {
	var index = problem.step();
	
	si.iterNodes(function (node) {
		node.color = colors[graph.verteces[index].color % colors.length];
		node.label = "#" + index + ". color: " + graph.verteces[index].color + ", revealed friends: ";
		node.assignedColor = graph.verteces[index].color;
	}, ["#" + index]);

	si.draw();

	if (!problem.done()) {
		setTimeout(function () {
			step(problem);
		}, 1000);
	}
}

function rearrange() {
	si.iterNodes(function (node) {
		node.y = node.attr.assignedColor * 20;
	});	
	si.draw();
}
