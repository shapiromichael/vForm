
var Demo = {
	init: function(){

		$('body').scrollspy({ target: '.sidebar' });

		$(window).on('load',function(){
			$('body').scrollspy("refresh");
		})
	}
}

$( Demo.init );