
/*! Form JS version: 1.0 */
var form = new function(){

	var defaults = {
		// Params
		elements: $('input, textarea, select'),
		trim: true,
		autoFocus: false,
		costomeValidation: function( $this ){ return true; },

		// Events
		onStart: function(){ return true; },
		onSuccess: function(){ return true; },
		onError: function(){ return false; }
	};

	this.validate = function(){
		var params = $.extend(false, defaults, arguments[0] ),
			form = this;

		// Removing the ignored and disabled elements
		params.elements = params.elements.not('[disabled=disabled]').not('[ignore=true]');		

		if( params.elements.size() ){
			
			if( params.onStart() ){
				
				// Trim content
				if( params.trim ){
					params.elements.filter('input:not([trim=false]), textarea:not([trim=false])').each( validation.trim );
				}

				// Process the validations
				params.elements.each(function(){
					validation.process( form, params, $(this) );
				});

				// Compleate validation
				if( params.elements.filter('[error=true]').size() ){
					
					// Auto focus on the first error occured
					if( params.autoFocus ){
						params.elements.filter('[error=true]:first').focus();
					}
					
					return params.onError();
				}else{
					return params.onSuccess();
				}
			}

		}else{
			return true; // in case there's no elements to validate
		}

		return false;

	};

	this.check = {
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
    		return /^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test( value );
    	}
	};
	
	this.convert = {
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
	};

	// Privates
	var validation = {
		trim: function(){
			var $this = $(this);
			$this.val( $.trim( $this.val() ) );
		},
		process: function( form, params, $this ){

			var isValid = true;

			// Validate for required state
			if( $this.is('[required]') ){
				if( !$this.is('[group]') ){
					// Check if has a value
					isValid = ( $this.is('input[type=checkbox], input[type=radio]') ) ? $this.is(":checked") : ( isValid && $this.val() ) ? true : false ;
				}else{
					// Validate for required group
					if( $this.is( params.elements.filter('[required][group=' +  $this.attr('group') + ']:first') ) ){
						isValid = false;
						params.elements.filter('[required][group=' +  $this.attr('group') + ']').each(function(){
							var $this = $(this);
							isValid = ( $this.is('input[type=checkbox], input[type=radio]') ) ? ( isValid || $this.is(':checked') ) ? true : false : ( isValid || $this.val() ) ? true : false ;
						});
					}
				}
				
			}
			
			if( $this.val() ){

				// Validate email content type
				if( $this.is('input[type=email]') ){
					form.convert.toLower( $this );
					isValid = ( isValid && form.check.email( $this.val() ) ) ? true : false ;
				}

				// Validate url content type
				if( $this.is('input[type=url]') ){
					isValid = ( isValid && form.check.url( $this.val() ) ) ? true : false ;
				}

				// Validate pattern defined content
				if( $this.is('input[pattern]') ){
					if( $.browser.msie ){
						var re = new RegExp( $this.attr('pattern') ,'g' );
						isValid = ( isValid && re.test($this.val()) ) ? true : false ;
					}else{
						isValid = ( isValid && $this.prop('validity').valid ) ? true : false ;
					}
				}

				// Validate min & max states
				if( $this.is('input[type=checkbox][group]') ){

					var $group = $('[groupsettings=' + $this.attr('group') + ']');

					// Validate for minimum state
					if( $group.is('[min]') && form.check.number( $group.attr('min') ) ){
						isValid = ( isValid && params.elements.filter('input[type=' + $this.attr('type') + '][group=' +  $this.attr('group') + ']:checked').size() >= form.convert.toInt( $group.attr('min') ) ) ? true : false ;
					}

					// Validate for maximum state
					if( $group.is('[max]') && form.check.number( $group.attr('max') ) ){
						isValid = ( isValid && params.elements.filter('input[type=' + $this.attr('type') + '][group=' +  $this.attr('group') + ']:checked').size() <= form.convert.toInt( $group.attr('max') ) ) ? true : false ;
					}

				}else{

					// Validate for minimum state
					if( $this.is('[min]') ){

						// Check textual content for min length
						if( $this.is('input[type=text], input[type=email], input[type=url], input[type=password], input[type=tel], textarea') && form.check.number( $this.attr('min') ) ){
							isValid = ( isValid && ($this.val()).length >= form.convert.toInt( $this.attr('min') ) ) ? true : false ;
						}
						
						// Check numeric content for min number
						if( $this.is('input[type=number], input[type=range]') && $this.val() ){
							isValid = ( isValid && $this.val() >= form.convert.toFloat( $this.attr('min') ) ) ? true : false ;
						}
						
					}

					// Validate for maximum state
					if( $this.is('[max]') ){

						// Check textual content for min length
						if( $this.is('input[type=text], input[type=email], input[type=url], input[type=password], input[type=tel], textarea') && form.check.number( $this.attr('max') ) ){
							isValid = ( isValid && ($this.val()).length <= form.convert.toInt( $this.attr('max') ) ) ? true : false ;
						}
						
						// Check numeric content for min number
						if( $this.is('input[type=number], input[type=range]') && $this.val() ){
							isValid = ( isValid && $this.val() <= form.convert.toFloat( $this.attr('max') ) ) ? true : false ;
						}
						
					}
					
				}

			}

			// Validate confirm fields
			if( $this.is('input[confirm]') && params.elements.filter('input#' + $this.attr('confirm') ) ){
				isValid = ( isValid && $this.val() == params.elements.filter('input#' + $this.attr('confirm') ).val() ) ? true : false ;
			}

			if( isValid && params.costomeValidation( $this ) ){
				$this.removeAttr('error');
			}else{
				$this.attr('error','true');
			}

		}
	};

 }