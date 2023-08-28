/* http://indigojs.github.io/bootstrap-spinner/ */

+function ($) {
  'use strict';

  // SPINNER CLASS DEFINITION
  // =========================

  var Spinner = function (element, options) {
    var $this = this;
    this.$element = $(element)
    this.options  = $.extend({}, Spinner.DEFAULTS, this.$element.data(), options)

    // Check for insane values
    var value = new Number(this.$element.val())
    if (isNaN(value)) this.$element.val(this.options.min)
	
	//console.log( "--- " + this.$element.val() );
	var idValueStart =  "#" + this.$element.attr("id");
	if ( this.$element.val() == 0 ) {
		$('button.btn-decrease[ data-target="'+idValueStart+'" ]').attr("disabled","disabled").addClass("disabled");
	} else if (  this.$element.val() ==  this.options.min ) {
		$('button.btn-decrease[ data-target="'+idValueStart+'" ]').attr("disabled","disabled").addClass("disabled");
	} else if (  this.$element.val() ==  this.options.max ) {
		$('button.btn-increase[ data-target="'+idValueStart+'" ]').attr("disabled","disabled").addClass("disabled");
	}

    // Strict check entered value
    if (this.options.strict == true) {
      this.$element.on('keypress', function (e) {
        var prevent = false

        if (e.which == 45 || e.keyCode == 40) {
          $this.decrease()
          return false
        } else if (e.which == 43 || e.keyCode == 38) {
          $this.increase()
          return false
        }

        // Allow: backspace, delete, tab, escape, enter, home, end, left, right
        // Allow: Ctrl+A
        // Allow: home, end, left, right
        // Allow . if precision is gt 0
        if ($.inArray(e.keyCode, [8, 46, 9, 27, 13, 36, 35, 37, 39]) !== -1 ||
            (e.which == 65 && e.ctrlKey === true) ||
            ($this.options.precision > 0 && $this.$element.val().indexOf('.') == -1 && e.which == 46)) {
                 return
        }

        // Ensure that it is a number and stop the keypress
        if (e.which < 48 || e.which > 57) return false
      });

      // Validate after focus lost
      this.$element.on('blur', function (e) {
        $this.change($this.$element.val())
      })
    }
  }

  Spinner.DEFAULTS = {
    step: 1,
    min: 0,
    max: Infinity,
    precision: 0,
    strict: true
  }

  Spinner.prototype.increase = function() {
    this.step(this.options.step)	
  }

  Spinner.prototype.decrease = function() {
    this.step(-this.options.step)
  }

  Spinner.prototype.step = function (value) {
    if (typeof value !== 'number') value = new Number(value)
    if (isNaN(value)) return

    var current = new Number(this.$element.val())
    if (isNaN(current)) current = this.options.min

    this.change(current + value)
	
	var valueNow = current + value;
	var idValue =  "#" + this.$element.attr("id");
	//console.log(valueNow + "" + this.$element.attr("id"));
	if (valueNow == this.options.min) {
		$('button.btn-decrease[ data-target="'+idValue+'" ]').attr("disabled","disabled").addClass("disabled");
	} else {
		$('button.btn-decrease[ data-target="'+idValue+'" ]').removeAttr("disabled").removeClass("disabled");
	}	
	if (valueNow == this.options.max) {
		$('button.btn-increase[ data-target="'+idValue+'" ]').attr("disabled","disabled").addClass("disabled");
	} else {
		$('button.btn-increase[ data-target="'+idValue+'" ]').removeAttr("disabled").removeClass("disabled");
	}	
  }

  Spinner.prototype.change = function(value) {
    if (typeof value !== 'number') value = new Number(value)
    if (isNaN(value)) value = this.options.min

    if (value < this.options.min) value = this.options.min
    if (value > this.options.max) value = this.options.max

    var e = $.Event('change.bs.spinner', { value: value })
    this.$element.trigger(e)
	
	var idTitle =  this.$element.attr("id");
	$("#text-" + idTitle + ".gentext .output-value").text(value);
	//console.log( idTitle + " = value = " + value);

    e = $.Event('changed.bs.spinner')

    this.$element.val(value.toFixed(this.options.precision)).change().trigger(e)
  }

  Spinner.prototype.setOptions = function(options) {
    if (typeof options == 'object') this.options = $.extend({}, this.options, options)
	
/*	if ( $('[data-ride="spinner"]').val() == this.options.min) {
		$("button.btn-decrease").addClass("disabled");
	} else {
		$("button.btn-decrease").removeClass("disabled");
	}	
	if ( $('[data-ride="spinner"]').val() == this.options.max) {
		$("button.btn-increase").addClass("disabled");
	} else {
		$("button.btn-increase").removeClass("disabled");
	}*/
  } 

  // SPINNER PLUGIN DEFINITION
  // =========================

  var old = $.fn.spinner

  $.fn.spinner = function (option, arg) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.spinner')
      var isNew   = (typeof data == 'object')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.spinner', (data = new Spinner(this, options)))

      if (typeof option == 'object' && isNew == false) data.setOptions(option)
      else if (typeof option == 'number') data.step(option)
      else if (typeof option == 'string') data[option](arg)
    })
  }

  $.fn.spinner.Constructor = Spinner

  // SPINNER NO CONFLICT
  // ===================

  var trigger = function (event) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var value   = $this.data('value')

    if ($this.is('a')) event.preventDefault()

    $target.spinner(value)
  }

  $.fn.spinner.noConflict = function () {
    $.fn.spinner = old
    return this
  }

  // SPINNER DATA-API
  // ================

  $(document)
    .on('click.bs.spinner.data-api', '[data-toggle="spinner"][data-on!="mousehold"]', trigger)
    .on('mousehold.bs.spinner.data-api', '[data-toggle="spinner"]', trigger)

  $(window).on('load', function () {
    $('[data-ride="spinner"]').each(function () {
      $(this).spinner()
    })
  })

}(jQuery);

$(document).ready(function() {
	var inputQuantity = $('[data-ride="spinner"]');	
	for ( var i=0; i<inputQuantity.length; i++ ) {
		var id = "#"+inputQuantity.eq(i).attr("id");
		var btnDecrease = '<button type="button" class="btn-decrease" data-target="'+id+'" data-value="decrease" data-toggle="spinner">-</div>';
		var btnIncrease = '<button type="button" class="btn-increase" data-target="'+id+'" data-value="increase" data-toggle="spinner">+</div>';
		//$(id+'[data-ride="spinner"]').wrap('<div class="input-quantity"></div>').before(btnDecrease).after(btnIncrease);
		$(id+'[data-ride="spinner"]').before(btnDecrease).after(btnIncrease);
	}
	
	// gen title 
	var spinnerGenText = $('[data-ride="spinner"][ data-gentext ]');
	spinnerGenText.each(function() {
		var sizeGenText = $(this).size();
		var text = $(this).attr("data-gentext");
		var id = $(this).attr("id");
		var value = $(this).attr("value");
		var minValue = $(this).attr("data-min");
		
		
		if ( minValue == "" || minValue == null ) {
			minValue = 0;
		}
		if ( value == "" || value == null ) {
			value = 0;
		} else if ( value < minValue ) {
			value = minValue;
		}
		
		$(this).val(value);
		if ( text != null && text != "" ) {
			$(this).before('<p class="gentext" id="text-' + id + '"><span class="output-value">' + value + '</span><span class="text">' + text + '</span></p>');
		}	
			
    });

});
