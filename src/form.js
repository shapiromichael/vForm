'use stict';

var form = function( options ){

	var $ = jQuery,
		self = this,
		__ = {
			fields: jQuery(),
			valid: false,
			defaults: {},
			params: {},
			errors: []
		},
		defaults = {
		
			// General
			fields: 'input, textarea, select',
			trim: true,
			focus: false,
			live: '',
			error: {
				enabled: true,
				messages: {
					default: 'Invalid'
				}
			},
			feedback: false,

			// Events
			onBegin: function(){ return true; },
			onBefore: function(){ return true; },
			onAfter: function( $field, status ){ return status; },
			onFail: function(){ return false; },
			onSuccess: function(){ return true; },
			onErrorMessage: function( $field, message ){ return "<span class='error-message'>" + message + "</span>"; },
			onValidFeedback: function(){  return "<span class='valid-feedback'>Valid</span>"; }
		};

	this.validate = function( options ){

		// Update params
		__.params = $.extend({}, __.defaults, options );

		// Parse the form fields
		__.params.fields = _form.set.fields( __.params.fields );

		// Reset
		__.valid = false;
		__.errors = [];

		if( __.params.fields.size() ){
			
			if( __.params.onBegin( __.params.fields.toArray() ) ){
				
				// Trim content
				if( __.params.trim ){
					__.params.fields.filter('input:not([trim=false]), textarea:not([trim=false])').each( _form.trim );
				}

				// Process the validations
				__.params.fields.each(function(){
					_form.process( $(this) );
				});

				// Compleate validation
				if( __.params.fields.filter('[error=true]').size() ){
					
					// Auto focus on the first error occured
					if( __.params.focus ){
						__.params.fields.filter('[error=true]:first').focus();
					}

					_form.set.invalid();

				}else{
					_form.set.valid();
				}
			}		

		}else{
			// In case there's no elements to validate
			_form.set.valid();
		}

		return __.valid;

	};

	this.status = function(){
		return __.valid;
	};

	this.add = function(){

	};

	this.get = function(){

	};

	this.set = function(){

	};

	this.clear = function(){

	};

	// Privates
	var _form = {
		init: function( options ){
			
			// Update params
			__.defaults = $.extend({}, defaults, options );

			// Parse the form fields
			__.defaults.fields = _form.set.fields( __.defaults.fields );

			// Live validation
			__.defaults.live = __.defaults.live.toLowerCase();
			__.defaults.live = (__.defaults.live === 'change' || __.defaults.live === 'keyup' || __.defaults.live === 'blur') ? __.defaults.live : '' ;
			if( __.defaults.live ){
				__.defaults.fields.on( __.defaults.live, function(){
					self.validate( { fields: $(this) } );
				});
			}

		},
		check: {
			int: function( value ){
				return /^[+-]?\d+$/i.test( value );
			},
			float: function( value ){
				return /^[+-]?\d+\.\d+$/i.test( value );
			},
			number: function( value ){
				return (this.int( value ) || this.float( value ));
			},
			email: function( value ){
				return /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test( value );
			},
			url: function( value ){
				return /^(?:http|ftp)s?:\/\/(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/gi.test( value );
			}
		},
		convert: {
			toLower: function( object ){
				if(object && object.is('input[type=text], input[type=url], input[type=email], textarea')){
					var newVal = object.val().toLowerCase();
					object.val( newVal );
					return newVal;
				}
				return null;
			},
			toInt: function( string ){
				return ( string && $.isNumeric(string) ) ? parseInt( string ) : (string && -1 < string.indexOf("px") ) ? this.toInt( string.slice(0,-2) ) : 0 ;
			},
			toFloat: function( string ){
				return ( string && $.isNumeric(string) ) ? parseFloat( string ) : 0.0 ;
			}
		},
		set: {
			fields: function( fields ){

				if( typeof fields === 'string' || fields instanceof String ){
					fields = $( fields );
				}
				return fields.not('[disabled=disabled]').not('[data-ignore=true]');

			},
			valid: function(){

				if( $.isFunction( __.params.onSuccess ) ){
					__.valid = __.params.onSuccess( __.params.fields.toArray() );
				}else{
					__.valid = true;
				}

				return __.valid;

			},
			invalid: function(){

				if( $.isFunction( __.params.onFail ) ){
					__.valid = __.params.onFail( __.params.fields.filter('[error=true]').toArray(), __.errors );
				}else{
					__.valid = false;
				}

				return __.valid;

			}
		},
		trim: function(){
			var $this = $(this);
			$this.val( $.trim( $this.val() ) );
		},
		process: function( $this ){

			var isValid = true;

			// Validate for required state
			if( $this.is('[required]') ){
				if( !$this.is('[data-group]') ){

					// Check if has a value
					isValid = ( $this.is('input[type=checkbox], input[type=radio]') ) ? $this.is(":checked") : ( isValid && $this.val() ) ? true : false ;

					// Handle errors
					if( !isValid ){ _form.error( $this, 'required', 'required' ); }

				}else{

					// Validate for required group
					if( $this.is( __.params.fields.filter('[required][data-group=' +  $this.attr('data-group') + ']:first') ) ){
						isValid = false;
						__.params.fields.filter('[required][data-group=' +  $this.attr('data-group') + ']').each(function(){
							var $this = $(this);
							isValid = ( $this.is('input[type=checkbox], input[type=radio]') ) ? ( isValid || $this.is(':checked') ) ? true : false : ( isValid || $this.val() ) ? true : false ;
						});
					}

					// Handle errors
					if( !isValid ){ _form.error( $this, 'required_group', 'required-group' ); }
				}				
			}
			
			if( $this.val() ){

				// Validate email content type
				if( isValid && $this.is('input[type=email]') ){
					_form.convert.toLower( $this );
					isValid = ( isValid && _form.check.email( $this.val() ) ) ? true : false ;

					// Handle errors
					if( !isValid ){ _form.error( $this, 'email', 'email' ); }
				}

				// Validate url content type
				if( isValid && $this.is('input[type=url]') ){
					isValid = ( isValid && _form.check.url( $this.val() ) ) ? true : false ;

					// Handle errors
					if( !isValid ){ _form.error( $this, 'url', 'url' ); }
				}

				// Validate pattern defined content
				if( isValid && $this.is('input[pattern]') ){
					if( window.navigator.userAgent.indexOf("MSIE ") > 0 ){
						var re = new RegExp( $this.attr('pattern') ,'g' );
						isValid = ( isValid && re.test($this.val()) ) ? true : false ;
					}else{
						isValid = ( isValid && $this.prop('validity').valid ) ? true : false ;
					}

					// Handle errors
					if( !isValid ){ _form.error( $this, 'pattern', 'pattern' ); }
				}

			}

			// Validate min & max states
			if( isValid && $this.is('fieldset input[type=checkbox]') ){
				var $group = $this.parents('fieldset');

				// Validate for minimum state
				if( $group.is('[min]') && _form.check.number( $group.attr('min') ) ){
					isValid = ( isValid && $group.find('input[type=checkbox]:checked').size() >= _form.convert.toInt( $group.attr('min') ) ) ? true : false ;

					// Handle errors
					if( !isValid ){ _form.error( $group, 'min_selection', 'min' ); }
				}

				// Validate for maximum state
				if( $group.is('[max]') && _form.check.number( $group.attr('max') ) ){
					isValid = ( isValid && $group.find('input[type=checkbox]:checked').size() <= _form.convert.toInt( $group.attr('max') ) ) ? true : false ;

					// Handle errors
					if( !isValid ){ _form.error( $group, 'max_selection', 'max' ); }
				}

			}else{

				// Validate for minimum state
				if( isValid && $this.is('[min]') ){

					// Check textual content for min length
					if( $this.is('input[type=text], input[type=email], input[type=url], input[type=password], input[type=tel], input[type=search], textarea') && _form.check.number( $this.attr('min') ) ){
						isValid = ( isValid && ($this.val()).length >= _form.convert.toInt( $this.attr('min') ) ) ? true : false ;

						// Handle errors
						if( !isValid ){ _form.error( $this, 'min_length', 'min' ); }
					}
					
					// Check numeric content for min number
					if( $this.is('input[type=number]') ){
						isValid = ( isValid && _form.convert.toFloat( $this.val() ) >= _form.convert.toFloat( $this.attr('min') ) ) ? true : false ;

						// Handle errors
						if( !isValid ){ _form.error( $this, 'min', 'min' ); }
					}

					// Check range field content
					if( $this.is('input[type=range]') ){
						isValid = ( isValid && _form.convert.toFloat( $this.val() ) >= _form.convert.toFloat( $this.attr('data-min') ) ) ? true : false ;

						// Handle errors
						if( !isValid ){ _form.error( $this, 'min', 'min' ); }
					}

				}

				// Validate for maximum state
				if( isValid && $this.is('[max]') ){

					// Check textual content for max length
					if( $this.is('input[type=text], input[type=email], input[type=url], input[type=password], input[type=tel], textarea') && _form.check.number( $this.attr('max') ) ){
						isValid = ( isValid && ($this.val()).length <= _form.convert.toInt( $this.attr('max') ) ) ? true : false ;

						// Handle errors
						if( !isValid ){ _form.error( $this, 'max_length', 'max' ); }
					}
					
					// Check numeric content for max number
					if( $this.is('input[type=number]') ){
						isValid = ( isValid && _form.convert.toFloat( $this.val() ) <= _form.convert.toFloat( $this.attr('max') ) ) ? true : false ;

						// Handle errors
						if( !isValid ){ _form.error( $this, 'max', 'max' ); }
					}

					// Check range field content
					if( $this.is('input[type=range]') ){
						isValid = ( isValid && _form.convert.toFloat( $this.val() ) <= _form.convert.toFloat( $this.attr('data-max') ) ) ? true : false ;

						// Handle errors
						if( !isValid ){ _form.error( $this, 'max', 'max' ); }
					}					
				}
				
			}

			// Validate required radio button
			if( isValid && $this.is('input[type=radio][required]') ){
				isValid = ( isValid && $this.is(':checked') ) ? true : false ;

				// Handle errors
				if( !isValid ){ _form.error( $this, 'radio', 'radio' ); }

			}else if( isValid && $this.is('fieldset[required] input[type=radio]') ){
				var $fieldset = $this.parents('fieldset');

				isValid = ( isValid && $fieldset.find('input[type=radio]:checked').size() ) ? true : false ;

				// Handle errors
				if( !isValid ){ _form.error( $fieldset, 'required', 'required' ); }
			}

			// Validate confirm fields
			if( isValid && $this.is('input[data-match]') && $('#' + $this.attr('data-match') ) ){
				isValid = ( isValid && $this.val() === $('#' + $this.attr('data-match') ).val() ) ? true : false ;

				// Handle errors
				if( !isValid ){ _form.error( $this, 'match', 'match' ); }
			}

			if( isValid ){
				$this.removeAttr('error');
				_form.feedback( $this );
			}else{
				$this.attr('error','true');
			}

		},
		error: function( $this, key, attribute ){
			if( __.params.error.enabled ){

				var msg = '';

				// Grab the correct error message
				if( $this.data( attribute + '-error-msg') ){
					msg = $this.data( attribute + '-error-msg');
				}else if( $this.data('error-msg') ){
					msg = $this.data('error-msg');
				}else if( __.params.error.messages[ key ] ){
					msg = __.params.error.messages[ key ];
				}else{
					msg = __.params.error.messages.default;
				}

				// Fire the error message event
				if( $.isFunction( __.params.onErrorMessage ) ){
					msg = __.params.onErrorMessage( $this, msg );
				}

				// Handle the error message
				if( msg && __.errors.indexOf( msg ) === -1 ){
					__.errors.push( msg );
				}
				
			}
		},
		feedback: function( $this ){
			if( __.params.feedback.enabled && $.isFunction( __.params.onValidFeedback ) ){
				$this.after( __.params.onValidFeedback( $this ) );
			}
		}
	};

	_form.init( options );

	return self;
};

(function($) {
	
	// Collection method.
	$.fn.form = function( options ){

		var result = [];

		this.each(function(){

			var $this = $(this),
				params = $.extend({}, {
					fields: 'input, textarea, select'
				}, options );

			// novalidate
			if( $this.is('form') ){
				$this.attr('novalidate','novalidate');
			}

			if( typeof params.fields === 'string' || params.fields instanceof String ){
				params.fields = $( params.fields, $this );
			}else if( params.fields instanceof jQuery ){
				params.fields = $( params.fields, $this );
			}

			result.push( new form( params ) );

		});

		if( result.length === 1 ){
			result = result[0];
		}

		return result;
	};

}(jQuery));