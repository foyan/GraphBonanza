$(function () {
	
	$("a").button();
	
	var app = new App();
	
	var body = $("body").get(0);
	ko.applyBindings(app, body);
});

function rearrange() {
}
