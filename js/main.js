$(function () {
	var app = new App();
	
	var body = $("body").get(0);
	ko.applyBindings(app, body);
});


var colors = [
	"#2219B2",
	"#C10087",
	"#B1F100",
	"#FFC300"
];

var problem = null;

function solve() {
	
	problem = new OnlineProblem(graph, new FirstFitAlgo());
	
	problem.start();
	
	//step(problem);
	
	while (!problem.done()) {
		step();
	}
		
	si.draw();

}

function step() {
	var index = problem.step();
	
	si.iterNodes(function (node) {
		node.color = colors[graph.verteces[index].color % colors.length];
		node.label = "#" + index + ". color: " + graph.verteces[index].color + ", revealed friends: ";
		node.assignedColor = graph.verteces[index].color;
	}, ["#" + index]);

}

function stepThrough() {
	step();

	si.draw();

	if (!problem.done()) {
		setTimeout(function () {
			stepThrough();
		}, 1000);
	}
}

function rearrange() {
	si.iterNodes(function (node) {
		node.y = node.attr.assignedColor * 20 / problem.numberOfColors;
	});	
	si.draw();
}
