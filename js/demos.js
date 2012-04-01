
var parsms = {
			onStart: function(){
				$('.label-important, .label-success').remove();
				return true;
			},
			onError: errorCallback,
			onSuccess: sucsessCallback
		};

$(document).ready(function(){
	
	$('.btn-primary').click(function(){
		/*
		form.validate(parsms);
*/

	});
	
	$('.btn-mini').click(function(){
		$('.btn-primary').click();
	});

});

function errorCallback (){
	$('input, textarea, select').not('[disabled=disabled]').each(function(){
		if( $(this).is('[error=true]') ){
			$(this).after('<span class="label label-important">Invalid</span>');
		}else{
			$(this).after('<span class="label label-success">Valid</span>');
		}
	});
	return false;
}
function sucsessCallback (){
	$('input, textarea, select').not('[disabled=disabled]').each(function(){
		if( $(this).is('[error=true]') ){
			$(this).after('<span class="label label-important">Invalid</span>');
		}else{
			$(this).after('<span class="label label-success">Valid</span>');
		}
	});
	return true;
}
