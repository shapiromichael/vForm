var form_old = new function(){
		
		this.validate = function( props ){
		
			var elementsToValidate = (props && props.elementsToValidate) ? props.elementsToValidate : $('input:not([disabled=disabled]), textarea:not([disabled=disabled]), select:not([disabled=disabled])'),
				onStart = (props && $.isFunction( props.onStart) ) ? props.onStart : function( elementsToValidate ){ return true; },
				onSuccess = (props && $.isFunction( props.onSuccess) ) ? props.onSuccess : function( elementsToValidate ){ return true; },
				onError = (props && $.isFunction( props.onError) ) ? props.onError : function( elementsToValidate ){ return false; },
				costomeValidation = (props && $.isFunction( props.costomeValidation) ) ? props.costomeValidation : function( element ){ return true; },
				trim = (props && props.trim != undefined) ? props.trim : true,
				silent = (props && props.silent != undefined) ? props.silent : false,
				autoFocus = (!silent && props && props.autoFocus != undefined) ? props.autoFocus : false;
			
	
			if( elementsToValidate.size() ){
				
				if( onStart( elementsToValidate ) ){
					
					// Trim content
					if( trim ){
						elementsToValidate.filter('input:not([trim=false]), textarea:not([trim=false])').each(function(){
							$(this).val( $.trim( $(this).val() ) );
						});
					}
					
					elementsToValidate.each(function(){
						var isValid = true;
						
						// Validate for required state
						if( $(this).is('[required]') ){
							
							if( !$(this).is('[group]') ){
								// Check if has a value
								if( $(this).is('input[type=checkbox], input[type=radio]') ){
									isValid = $(this).is(':checked');
								}else{
									isValid = ( isValid && $(this).val() ) ? true : false ;
								}
							}else{
								// Validate for required group
								if( $(this).is( elementsToValidate.filter('[required][group=' +  $(this).attr('group') + ']:last') ) ){
									isValid = false;
									elementsToValidate.filter('[required][group=' +  $(this).attr('group') + ']').each(function(){
										if( $(this).is('input[type=checkbox], input[type=radio]') ){
											isValid = ( isValid || $(this).is(':checked')) ? true : false ;
										}else{
											isValid = ( isValid || $(this).val() ) ? true : false ;
										}
									});
								}
							}
							
						}
						
						// Validate email content type
						if( $(this).is('input[type=email]') && $(this).val() ){
							form.convert.toLower( $(this) );
							isValid = ( isValid && form.check.email( $(this).val() ) ) ? true : false ;
						}
											
						// Validate pattern defined content
						if( $(this).is('input[pattern]') && $(this).val() ){
							isValid = ( isValid && $(this).prop( 'validity' ).valid ) ? true : false ;
						}
						
						// Validate for minimum state
						if( $(this).is('[min]') ){
	
							// Check textual content for min length
							if( $(this).is('input[type=text], input[type=url], input[type=password], input[type=tel], textarea') && form.check.number( $(this).attr('min') ) ){
								isValid = ( isValid && ($(this).val()).length >= form.convert.toInt( $(this).attr('min') ) ) ? true : false ;
							}
							
							// Check numeric content for min number
							if( $(this).is('input[type=number]') && $(this).val() ){
								isValid = ( isValid && $(this).val() >= form.convert.toFloat( $(this).attr('min') ) ) ? true : false ;
							}
							
						}
						
						// Validate for maximum state
						if( $(this).is('[max]') ){
	
							// Check textual content for min length
							if( $(this).is('input[type=text], input[type=url], input[type=password], input[type=tel], textarea') && form.check.number( $(this).attr('max') ) ){
								isValid = ( isValid && ($(this).val()).length <= form.convert.toInt( $(this).attr('max') ) ) ? true : false ;
							}
							
							// Check numeric content for min number
							if( $(this).is('input[type=number]') && $(this).val() ){
								isValid = ( isValid && $(this).val() <= form.convert.toFloat( $(this).attr('max') ) ) ? true : false ;
							}
							
						}
						
						// Validate confirm fields
						if( $(this).is('input[confirm]') && $('#' + $(this).attr('confirm') ).is('input') ){
							isValid = ( isValid && $(this).val() == $('#' + $(this).attr('confirm') ).val() ) ? true : false ;
						}
						
						if( !silent ){
							if(isValid && costomeValidation( $(this) )){
								 $(this).attr('error','');
							}else{
								 $(this).attr('error','true');
							}
						}
					
					});
					
				}
				
				// Compleate validation
				if( elementsToValidate.filter('[error=true]').size() ){
					
					// Auto focus on the first error occured
					if( autoFocus ){
						elementsToValidate.filter('input[error=true], textarea[error=true]').first().focus();
					}
					
					return onError( elementsToValidate );
				}else{
					return onSuccess( elementsToValidate );
				}
				
			}else{
				return true; // in case there's no elements to validate
			}
			
			return false;
		}
		
		this.check = new function(){
			
			// Email validation function
			this.email =  function( value ){
				return /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test( value );
			}
			
			// Integer validation function
			this.int = function( value ){
				return /^[+-]?\d+$/i.test( value );
			}
			
			// Float validation function
			this.float = function( value ){
				return /^[+-]?\d+\.\d+$/i.test( value );
			}
			
			// Number validation function (int or a float dosen't matter)
			this.number = function( value ){
				return (this.int( value ) || this.float( value ));
			}
	
		}
		
		this.convert = new function(){
			
			// Convert input object content to lowercase
			this.toLower = function( object ){
				if(object && object.is('input[type=text], input[type=url], input[type=email], textarea')){
					var newVal = object.val().toLowerCase();
					object.val( newVal );
					return newVal;
				}else{
				}
				return null;
			}
			
			// Convert a string to int
			this.toInt = function( string ){
				if( string && form.check.number( string ) ){
					return parseInt( string );
				}else if(string && string.indexOf('px') > -1){
					return this.toInt( (string).slice(0,-2) );
				}else{
					return 0;
				}
			}
			
			// Convert a string or int to float number
			this.toFloat = function( string ){
				if( string && form.check.number( string ) ){
					return parseFloat( string );
				}else{
					return 0.0;
				}
			}
		}
	}