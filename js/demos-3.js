
var parsms = {

		// Error options
		errors: {
			summarized: false,
			dom: function( msg, $element ){
				return '<span class="label label-important">' + msg + '</span>';
			}
		},

		// Valid Feedback
		validFeedback: {
			enabled: true,
			dom: function( $element ){
				return '<span class="label label-success">Valid</span>';
			}
		},

		// Events
		onStart: function(){
			$('.label-important, .label-success').remove();
			return true;
		},
		onSuccess: function(){
			return true;
		}
	};


$(function(){
	
	$('.btn-primary').on('click',function( e ){
		e.preventDefault();

		// This is commented out because the form is validated on submit,
		// In case you want to validate based on event you can uncomment this.
		//
		// form.validate(parsms);

	});

	$('form').on('submit',function(){

		// In cse you with to validate the form on click event (not on submit)
		// uncomment the following line
		//
		// return false;
		return form.validate( parsms );

	});
	
	$('.btn-mini').on('click', function( e ){
		e.preventDefault();
		$('form').submit();
	});

});
