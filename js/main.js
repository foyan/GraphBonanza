$(function () {
		

	var app = new App();
	
	var body = $("body").get(0);
	ko.applyBindings(app, body);

	$("a").button();
	
	window.app = app;

});
