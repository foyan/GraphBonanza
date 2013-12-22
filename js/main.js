$(function () {
		
		
	ko.bindingHandlers.btn = {
		init: function (element) {
			$(element).button();
		}
	};

	var app = new App();
	
	var body = $("body").get(0);
	ko.applyBindings(app, body);
	
	window.app = app;

});
