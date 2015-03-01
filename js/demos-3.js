
var status = false;

var params = {
		live: 'blur',

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
		onStart: function( $elements ){
			$('.label-important, .label-success').remove();
			return true;
		},
		onSuccess: function(){
			status = true;
			return true;
		},
		onError: function(){
			status = false;
			return false;
		}
	};


$(function(){
	
	form.validate( params );

	$('form').on('submit',function(){
		console.log('-----> ', status);
		return status;
	});
	
	$('.btn-mini').on('click', function( e ){
		e.preventDefault();
		$('form').submit();
	});

});
