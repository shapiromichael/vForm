'use stict';

var Demo = {
	init: function(){

		$('body').scrollspy({ target: '.sidebar' });

		$(window).on('load',function(){
			$('body').scrollspy('refresh');
		});

		// 
		// Init form examples
		// 
		var options = {
			feedback: { 
				enabled: true 
			},
			onBegin: function( fields ){

				var $form = $( fields[0] ).parents('form');

				$form.find('.form-feedback, .form-control-feedback, .form-control-feedback-inline').remove();
				$form.find('.has-error, .has-success').removeClass('has-error has-success');
				
				return true;
			},
			onFail: function( fields, messages ){

				var $form = $( fields[0] ).parents('form'),
					$btn = $form.find('button[type=submit]');

				$btn.after('<span class="text-danger form-feedback"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>The form is invalid!</span>');
				$btn.blur();

				return false;
			},
			onSuccess: function( fields ){

				var $form = $( fields[0] ).parents('form'),
					$btn = $form.find('button[type=submit]');

				$btn.after('<span class="text-success form-feedback"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>The form is valid!</span>');
				$btn.blur();

				return true;
			},
			onErrorMessage: function( $field, message ){
				if( $field.is('[type=checkbox]') ){
					$field.parents('.checkbox').append('<span class="text-danger form-control-feedback-inline"> - ' + message + '</span>');
				}else{
					$field.parents('.form-group').addClass('has-error has-feedback').append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
				}

				return "";
			},
			onValidFeedback: function( $field ){
				$field.parents('.form-group').addClass('has-success has-feedback').append('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
			}
		}

		// Example 1 - Required Fields
		var example1 = $('#example-1').vForm( options, function(){
			example1.validate();
			ga('send', 'event', 'Examples', 'Required Fields', example1.status());
			return false;
		});

		// Example 2 - Required Group
		var example2 = $('#example-2').vForm( options, function(){
			example2.validate();
			ga('send', 'event', 'Examples', 'Required Group', example2.status());
			return false;
		});

		// Example 3 - String
		var example3 = $('#example-3').vForm( options, function(){
			example3.validate();
			ga('send', 'event', 'Examples', 'String', example3.status());
			return false;
		});

		// Example 4 - Numeric
		var example4 = $('#example-4').vForm( options, function(){
			example4.validate();
			ga('send', 'event', 'Examples', 'Numeric', example4.status());
			return false;
		});

		// Example 5 - Email
		var example5 = $('#example-5').vForm( options, function(){
			example5.validate();
			ga('send', 'event', 'Examples', 'Email', example5.status());
			return false;
		});

		// Example 6 - URL
		var example6 = $('#example-6').vForm( options, function(){
			example6.validate();
			ga('send', 'event', 'Examples', 'URL', example6.status());
			return false;
		});

		// Example 7 - IP Address
		var example7 = $('#example-7').vForm( options, function(){
			example7.validate();
			ga('send', 'event', 'Examples', 'IP Address', example7.status());
			return false;
		});

		// Example 8 - Credit Card
		var example8 = $('#example-8').vForm( options, function(){
			example8.validate();
			ga('send', 'event', 'Examples', 'Credit Card', example8.status());
			return false;
		});

		// Example 9 - Color
		var example9 = $('#example-9').vForm( options, function(){
			example9.validate();
			ga('send', 'event', 'Examples', 'Color', example9.status());
			return false;
		});

		// Example 10 - Patterns
		var example10 = $('#example-10').vForm( options,function(){
			example10.validate();
			ga('send', 'event', 'Examples', 'Patterns', example10.status());
			return false;
		});

		// Example 11 - Password
		var example11 = $('#example-11').vForm( options, function(){
			example11.validate();
			ga('send', 'event', 'Examples', 'Password', example11.status());
			return false;
		});

		// Example 12 - Checkboxes
		var example12 = $('#example-12').vForm( options, function(){
			example12.validate();
			ga('send', 'event', 'Examples', 'Checkboxes', example12.status());
			return false;
		});

		// Example 13 - Radio Buttons
		var example13 = $('#example-13').vForm( options, function(){
			example13.validate();
			ga('send', 'event', 'Examples', 'Radio Buttons', example13.status());
			return false;
		});

		// Example 14 - Ignored
		var example14 = $('#example-14').vForm( options, function(){
			example14.validate();
			ga('send', 'event', 'Examples', 'Ignored', example14.status());
			return false;
		});

		// Example 15 - Error Messages
		var example15 = $('#example-15').vForm( $.extend({}, options, {
			onErrorMessage: function( $field, message ){
				if( $field.is('[type=checkbox]') ){
					$field.parents('.checkbox').append('<span class="text-danger form-control-feedback-inline"> - ' + message + '</span>');
				}else{
					$field.parents('.form-group').addClass('has-error has-feedback').append('<span class="form-control-feedback text" aria-hidden="true">' + message + '</span>');
				}

				return "";
			}
		}), function(){
			example15.validate();
			ga('send', 'event', 'Examples', 'Error Messages', example15.status());
			return false;
		});

		// Example 16 - Summarized Errors
		var example16 = $('#example-16').vForm( $.extend({}, options, {
			feedback: {
				enabled: false
			},
			onBegin: function( fields ){

				var $form = $( fields[0] ).parents('form');

				$('#example-16-errors').html('');
				$form.find('.form-feedback, .form-control-feedback, .form-control-feedback-inline').remove();
				$form.find('.has-error, .has-success').removeClass('has-error has-success');
				
				return true;
			},
			onFail: function( fields, messages ){

				var $form = $( fields[0] ).parents('form'),
					$btn = $form.find('button[type=submit]'),
					$container = $('#example-16-errors'),
					html = '';

				if( messages.length ){
					html = '<div class="alert alert-danger" role="alert"><h5>This form is not valid!</h5><ul>';

					$.each( messages, function( index, message ){
						html += '<li>' + message + '</li>';
					});

					html += '</ul></div>';

					$container.html( html );
				}

				$btn.blur();

				return false;
			},
			onErrorMessage: function( $field, message ){
				return message;
			}
		}), function(){
			example16.validate();
			ga('send', 'event', 'Examples', 'Summarized Errors', example16.status());
			return false;
		});

		// Example 17 - Live Validation
		var example17 = $('#example-17').vForm( $.extend({}, options, {
			live: 'keyup'
		}), function(){
			example17.validate();
			ga('send', 'event', 'Examples', 'Live Validation', example17.status());
			return false;
		});

		// Example 18 - Add Method
		var example18 = $('#example-18').vForm( $.extend({}, options, {
			onErrorMessage: function( $field, message ){
				$field.parents('.form-group').addClass('has-error has-feedback').append('<span class="form-control-feedback text" aria-hidden="true">' + message + '</span>');
			}
		}), function(){
			example18.validate();
			ga('send', 'event', 'Examples', 'Add Method', example18.status());
			return false;
		});
		example18.add(function( value ){
			return ( value === 'Ben' ) ? true : false ;
		}, 'Value is not Ben');

		// Example 19 - Clear Method
		var example19 = $('#example-19').vForm( options, function(){
			example19.validate();
			ga('send', 'event', 'Examples', 'Clear Method', example19.status());
			return false;
		});
		$('#example-19-clear').on('click', function(){
			example19.clear();
			ga('send', 'event', 'Examples', 'Clear Method', 'Clear');
		});

	}
}

$( Demo.init );