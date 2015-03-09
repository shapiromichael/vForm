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
		var example1 = $('#example-1').form( options, function(){
			example1.validate();
			ga('send', 'event', 'Examples', 'Required Fields', example1.status());
			return false;
		});

		// Example 2 - Required Group
		var example2 = $('#example-2').form( options, function(){
			example2.validate();
			ga('send', 'event', 'Examples', 'Required Group', example2.status());
			return false;
		});

		// Example 3 - String
		var example3 = $('#example-3').form( options, function(){
			example3.validate();
			ga('send', 'event', 'Examples', 'String', example3.status());
			return false;
		});

		// Example 4 - Numeric
		var example4 = $('#example-4').form( options, function(){
			example4.validate();
			ga('send', 'event', 'Examples', 'Numeric', example4.status());
			return false;
		});

		// Example 5 - Email
		var example5 = $('#example-5').form( options, function(){
			example5.validate();
			ga('send', 'event', 'Examples', 'Email', example5.status());
			return false;
		});

		// Example 6 - URL
		var example6 = $('#example-6').form( options, function(){
			example6.validate();
			ga('send', 'event', 'Examples', 'URL', example6.status());
			return false;
		});

		// Example 7 - Patterns
		var example7 = $('#example-7').form( options,function(){
			example7.validate();
			ga('send', 'event', 'Examples', 'Patterns', example7.status());
			return false;
		});

		// Example 8 - Password
		var example8 = $('#example-8').form( options, function(){
			example8.validate();
			ga('send', 'event', 'Examples', 'Password', example8.status());
			return false;
		});

		// Example 9 - Checkboxes
		var example9 = $('#example-9').form( options, function(){
			example9.validate();
			ga('send', 'event', 'Examples', 'Checkboxes', example9.status());
			return false;
		});

		// Example 10 - Radio Buttons
		var example10 = $('#example-10').form( options, function(){
			example10.validate();
			ga('send', 'event', 'Examples', 'Radio Buttons', example10.status());
			return false;
		});

		// Example 11 - Ignored
		var example11 = $('#example-11').form( options, function(){
			example11.validate();
			ga('send', 'event', 'Examples', 'Ignored', example11.status());
			return false;
		});

		// Example 12 - Error Messages
		var example12 = $('#example-12').form( $.extend({}, options, {
			onErrorMessage: function( $field, message ){
				if( $field.is('[type=checkbox]') ){
					$field.parents('.checkbox').append('<span class="text-danger form-control-feedback-inline"> - ' + message + '</span>');
				}else{
					$field.parents('.form-group').addClass('has-error has-feedback').append('<span class="form-control-feedback text" aria-hidden="true">' + message + '</span>');
				}

				return "";
			}
		}), function(){
			example12.validate();
			ga('send', 'event', 'Examples', 'Error Messages', example12.status());
			return false;
		});

		// Example 13 - Summarized Errors
		var example13 = $('#example-13').form( $.extend({}, options, {
			feedback: {
				enabled: false
			},
			onBegin: function( fields ){

				var $form = $( fields[0] ).parents('form');

				$('#example-13-errors').html('');
				$form.find('.form-feedback, .form-control-feedback, .form-control-feedback-inline').remove();
				$form.find('.has-error, .has-success').removeClass('has-error has-success');
				
				return true;
			},
			onFail: function( fields, messages ){

				var $form = $( fields[0] ).parents('form'),
					$btn = $form.find('button[type=submit]'),
					$container = $('#example-13-errors'),
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
			example13.validate();
			ga('send', 'event', 'Examples', 'Summarized Errors', example13.status());
			return false;
		});

		// Example 14 - Live Validation
		var example14 = $('#example-14').form( $.extend({}, options, {
			live: 'keyup'
		}), function(){
			example14.validate();
			ga('send', 'event', 'Examples', 'Live Validation', example14.status());
			return false;
		});

		// Example 15 - Clear Method
		var example15 = $('#example-15').form( options, function(){
			example15.validate();
			ga('send', 'event', 'Examples', 'Clear Method', example15.status());
			return false;
		});
		$('#example-15-clear').on('click', function(){
			example15.clear();
			ga('send', 'event', 'Examples', 'Clear Method', 'Clear');
		});

	}
}

$( Demo.init );