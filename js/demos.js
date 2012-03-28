
$(document).ready(function(){
	
	$('.btn-primary').click(function(){
		
		form.validate({
			onStart: function(){
				$('.label-important, .label-success').remove();
				return true;
			},
			onError: formCallback,
			onSuccess: formCallback
		});

	});
	
	$('.btn-mini').click(function(){
		$('.btn-primary').click();
	});

});

function formCallback (){
	$('input, textarea, select').not('[disabled=disabled]').each(function(){
		if( $(this).is('[error=true]') ){
			$(this).after('<span class="label label-important">Invalid</span>');
		}else{
			$(this).after('<span class="label label-success">Valid</span>');
		}
	});
	return false;
}