/*!
* Form - v2.0.0
* Copyright (c) 2015 
* Licensed MIT
*/
(function ($) {
	
	// Collection method.
	$.fn.form = function () {
		return this.each(function (i) {
			// Do something to each selected element.
			$(this).html('' + i);
		});
	};

	// Static method.
	// $.form = function (options) {
	// 	// Override default options with passed-in options.
	// 	options = $.extend({}, $..options, options);
	// 	// Return the name of your plugin plus a punctuation character.
	// 	return '' + options.punctuation;
	// };

}(jQuery));