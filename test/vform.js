(function($) {
	'use strict';

	window.ga = function() { return false; };

	QUnit.module('Validations');

	// Example #1
	QUnit.test('Required Fields', function(assert) {

		// Test invalid state
		$('#example-1 .btn').click();
		assert.ok($('#example-1 input').is('[error=true]'), 'Invalid state');
		assert.ok($('#example-1 input').parents('.form-group').hasClass('has-error'), 'Input invalid style');
		assert.equal($('#example-1 .text-danger.form-feedback').size(), 1, 'Form error shown');

		// Test valid state
		$('#example-1 input').val('foo');
		$('#example-1 .btn').click();
		assert.ok($('#example-1 input').is(':not([error])'), 'Valid state');
		assert.ok($('#example-1 input').parents('.form-group').hasClass('has-success'), 'Input valid style');
		assert.equal($('#example-1 .text-danger.form-feedback').size(), 0, 'Form error hidden');

	});

	// Example #2
	QUnit.test('Required Group', function(assert) {

		// Test invalid state
		$('#example-2 .btn').click();
		assert.ok($('#example-2 input:first').is('[error=true]'), 'Invalid state');
		assert.ok($('#example-2 input:first').parents('.form-group').hasClass('has-error'), 'Input invalid style');
		assert.equal($('#example-2 .text-danger.form-feedback').size(), 1, 'Form error shown');

		// Test valid state
		$('#example-2 input:first').val('foo');
		$('#example-2 .btn').click();
		assert.ok($('#example-2 input:first').is(':not([error])'), 'Valid state');
		assert.ok($('#example-2 input:first').parents('.form-group').hasClass('has-success'), 'Input valid style');
		assert.equal($('#example-2 .text-danger.form-feedback').size(), 0, 'Form error hidden');

	});

}(jQuery));
