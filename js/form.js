
 var form = {
 	defaults: {
 		a: 1
 	},
 	validate: function(){
 		var params = $.extend(false, this.defaults, arguments[0] );
 		console.log( params );
 	},
 	check: {

 	},
 	convert: {

 	}
 }

form.validate({b:2});
form.validate({a:3,c:4});
form.validate();