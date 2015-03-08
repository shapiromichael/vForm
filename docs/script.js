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

				$form.find('.form-feedback, .form-control-feedback').remove();
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
				$field.parents('.form-group').addClass('has-error has-feedback').append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
			},
			onValidFeedback: function( $field ){
				$field.parents('.form-group').addClass('has-success has-feedback').append('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
			}
		}

		// Example 1 - Required Fields
		var example1 = $('#example-1').on('submit', function(){
			example1.validate();
			return false;
		}).form( options );

		// Example 2 - Required Group
		var example2 = $('#example-2').on('submit', function(){
			example2.validate();
			return false;
		}).form( options );

		// Example 3 - String
		var example3 = $('#example-3').on('submit', function(){
			example3.validate();
			return false;
		}).form( options );

		// Example 4 - Numeric
		var example4 = $('#example-4').on('submit', function(){
			example4.validate();
			return false;
		}).form( options );

		// Example 5 - Email
		var example5 = $('#example-5').on('submit', function(){
			example5.validate();
			return false;
		}).form( options );

		// Example 6 - URL
		var example6 = $('#example-6').on('submit', function(){
			example6.validate();
			return false;
		}).form( options );

		// Example 7 - Patterns
		var example7 = $('#example-7').on('submit', function(){
			example7.validate();
			return false;
		}).form( options );

		// Example 8 - Password
		var example8 = $('#example-8').on('submit', function(){
			example8.validate();
			return false;
		}).form( options );

		// Example 9 - Checkboxes
		var example9 = $('#example-9').on('submit', function(){
			example9.validate();
			return false;
		}).form( options );

		// Example 10 - Radio Buttons
		var example10 = $('#example-10').on('submit', function(){
			example10.validate();
			return false;
		}).form( options );

		// Example 11 - Ignored
		var example11 = $('#example-11').on('submit', function(){
			example11.validate();
			return false;
		}).form( options );

	}
}

$( Demo.init );