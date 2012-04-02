
var parsms = {
				onStart: function(){

					$('.label-important, .label-success').remove();

					return true;
				},
				onError: function () {

					$('input, textarea, select').not('[disabled=disabled]').each(function(){
						if( $(this).is('[error=true]') ){
							$(this).after('<span class="label label-important">Invalid</span>');
						}else{
							$(this).after('<span class="label label-success">Valid</span>');
						}
					});

					return false;
				},
				onSuccess: function(){
					return true;
				}
			};


$(document).ready(function(){
	
	$('.btn-primary').click(function(){
		
		// This is commented out because the form is validated on submit,
		// In case you want to validate based on event you can uncomment this.
		//
		// form.validate(parsms);

	});

	$('form').submit(function(){

		// In cse you with to validate the form on click event (not on submit)
		// uncomment the following line
		//
		// return false;

		return form.validate( parsms );

	});
	
	$('.btn-mini').click(function(){
		$('.btn-primary').click();
	});

});
