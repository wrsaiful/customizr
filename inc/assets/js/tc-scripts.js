//Falls back to default params
var TCParams = TCParams || {
	DisabledFeatures : {},
  centerAllImg: 1,
	FancyBoxAutoscale: 1,
	FancyBoxState: 1,
	HasComments: "",
	LeftSidebarClass: ".span3.left.tc-sidebar",
	LoadBootstrap: 1,
	LoadModernizr: 1,
	ReorderBlocks: 1,
	RightSidebarClass: ".span3.right.tc-sidebar",
	SliderDelay: +5000,
	SliderHover: 1,
	SliderName: "demo",
  centerSliderImg : 1,
	SmoothScroll: { Enabled : 1 , Options : {} },
	anchorSmoothScroll: "linear",
  anchorSmoothScrollExclude : {
      simple : ['[class*=edd]', '.tc-carousel-control', '.carousel-control', '[data-toggle="modal"]', '[data-toggle="dropdown"]', '[data-toggle="tooltip"]', '[data-toggle="popover"]', '[data-toggle="collapse"]', '[data-toggle="tab"]', '[class*=upme]', '[class*=um-]'],
      deep : { classes : [], ids : [] }
    },
	stickyCustomOffset: { _initial : 0, _scrolling : 0, options : { _static : true, _element : "" } },
	stickyHeader: 1,
	dropdowntoViewport: 1,
	timerOnScrollAllBrowsers:1,
  extLinksStyle :1,
  extLinksTargetExt:1,
  extLinksSkipSelectors: {
    classes : ['btn', 'button'],
    ids:[]
  },
  dropcapEnabled:1,
  dropcapWhere:{ post : 0, page : 1 },
  dropcapMinWords:50,
  dropcapSkipSelectors: {
    tags : ['IMG' , 'IFRAME', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BLOCKQUOTE', 'UL', 'OL'],
    classes : ['btn'],
    ids : []
  },
  imgSmartLoadEnabled:0,
  imgSmartLoadOpts: {
    parentSelectors: ['.article-container', '.__before_main_wrapper', '.widget-front'],
    opts : { excludeImg: ['.tc-holder-img'] }
  },
  goldenRatio : 1.618,
  gridGoldenRatioLimit : 350,
  isSecondMenuEnabled : 0,
  secondMenuRespSet : 'in-sn-before'
};
// addEventListener Polyfill ie9- http://stackoverflow.com/a/27790212
window.addEventListener = window.addEventListener || function (e, f) { window.attachEvent('on' + e, f); };


// Datenow Polyfill ie9- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}


// Object.create monkey patch ie8 http://stackoverflow.com/a/18020326
if ( ! Object.create ) {
  Object.create = function(proto, props) {
    if (typeof props !== "undefined") {
      throw "The multiple-argument version of Object.create is not provided by this browser and cannot be shimmed.";
    }
    function ctor() { }

    ctor.prototype = proto;
    return new ctor();
  };
}


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// filter() was added to the ECMA-262 standard in the 5th edition; as such it may not be present in all implementations of the standard.
// You can work around this by inserting the following code at the beginning of your scripts, allowing use of filter() in ECMA-262 implementations which do not natively support it.
// This algorithm is exactly the one specified in ECMA-262, 5th edition, assuming that fn.call evaluates to the original value of Function.prototype.call(), and that Array.prototype.push() has its original value.
if ( ! Array.prototype.filter ) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}



//map was added to the ECMA-262 standard in the 5th edition; as such it may not be present in all implementations of the standard. You can work around this by inserting the following code at the beginning of your scripts, allowing use of map in implementations which do not natively support it. This algorithm is exactly the one specified in ECMA-262, 5th edition, assuming Object, TypeError, and Array have their original values and that callback.call evaluates to the original value of Function.prototype.call.
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this|
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len)
    //    where Array is the standard built-in constructor with that name and
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal
        //     method of callback with T as the this value and argument
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}
/* ===================================================
 * bootstrap-transition.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#transitions
 * ===================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
//@tc addon
var TCParams = TCParams || {};

!function ($) {

  "use strict"; // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);
/* =========================================================
 * bootstrap-modal.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#modals
 * =========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element.show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
          that.removeBackdrop()
          that.$element.trigger('hidden')
        })
      }

    , removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          if (!callback) return

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.focus()
      })
  })

}(window.jQuery);

/* ============================================================
 * bootstrap-dropdown.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#dropdowns
 * ============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)
      //@tc adddon
      //add && ! $parent.children('ul').is(':visible');
      //to avoid conflicts with bootstrap>2.3.2 dropdown on click for the menu
      isActive = $parent.hasClass('open') && ! $parent.children('ul').is(':visible');

      clearMenus()

      if (!isActive) {
        if ('ontouchstart' in document.documentElement) {
          // if mobile we we use a backdrop because click events don't delegate
          $('<div class="dropdown-backdrop"/>').insertBefore($(this)).on('click', clearMenus)
        }
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {

      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) $parent.find(toggle).focus()
        return $this.click()
      }

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $('.dropdown-backdrop').remove()
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = selector && $(selector)

    if (!$parent || !$parent.length) $parent = $this.parent()

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown

 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api', clearMenus)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.0
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#\w/.test(href) && $(href)

        return ($href
          && $href.length
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parents('.active')
      .removeClass('active')

    var selector = this.selector
      + '[data-target="' + target + '"],'
      + this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length)  {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);

/* ========================================================
 * bootstrap-tab.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#tabs
 * ========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active:last a')[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);
/* ===========================================================
 * bootstrap-tooltip.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut
        , triggers
        , trigger
        , i

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      triggers = this.options.trigger.split(' ')

      for (i = triggers.length; i--;) {
        trigger = triggers[i]
        if (trigger == 'click') {
          this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
        } else if (trigger != 'manual') {
          eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
          this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
          this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
        }
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options)

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var defaults = $.fn[this.type].defaults
        , options = {}
        , self

      this._options && $.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value
      }, this)

      self = $(e.currentTarget)[this.type](options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp
        , e = $.Event('show')

      if (this.hasContent() && this.enabled) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })

        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

        pos = this.getPosition()

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        this.applyPlacement(tp, placement)
        this.$element.trigger('shown')
      }
    }

  , applyPlacement: function(offset, placement){
      var $tip = this.tip()
        , width = $tip[0].offsetWidth
        , height = $tip[0].offsetHeight
        , actualWidth
        , actualHeight
        , delta
        , replace

      $tip
        .offset(offset)
        .addClass(placement)
        .addClass('in')

      actualWidth = $tip[0].offsetWidth
      actualHeight = $tip[0].offsetHeight

      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight
        replace = true
      }

      if (placement == 'bottom' || placement == 'top') {
        delta = 0

        if (offset.left < 0){
          delta = offset.left * -2
          offset.left = 0
          $tip.offset(offset)
          actualWidth = $tip[0].offsetWidth
          actualHeight = $tip[0].offsetHeight
        }

        this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
      } else {
        this.replaceArrow(actualHeight - height, actualHeight, 'top')
      }

      if (replace) $tip.offset(offset)
    }

  , replaceArrow: function(delta, dimension, position){
      this
        .arrow()
        .css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()
        , e = $.Event('hide')

      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      this.$element.trigger('hidden')

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function () {
      var el = this.$element[0]
      return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
        width: el.offsetWidth
      , height: el.offsetHeight
      }, this.$element.offset())
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , arrow: function(){
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this
      self.tip().hasClass('in') ? self.hide() : self.show()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);

/* ===========================================================
 * bootstrap-popover.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#popovers
 * ===========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)
        || $e.attr('data-content')

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);

/* ==========================================================
 * bootstrap-affix.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#affix
 * ==========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window)
      .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


}(window.jQuery);
/* ==========================================================
 * bootstrap-alert.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#alerts
 * ==========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  $(document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);
/* ============================================================
 * bootstrap-button.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#buttons
 * ============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
  })

}(window.jQuery);
/* =============================================================
 * bootstrap-collapse.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#collapse
 * =============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)
    //@tc adddon
    //to avoid conflicts with bootstrap>2.3.2 mobile menu
    this._collapsed = true;

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {

      var dimension
        , scroll
        , actives
        , hasData
//( this._collapsed && !this.$element.hasClass('in') )
      if (this.transitioning || this.$element.hasClass('in') ) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])

    //@tc adddon
    //to avoid conflicts with bootstrap>2.3.2 mobile menu
      this._collapsed = false;

      //@tc adddon
      //give the revealed sub menu the height of the visible viewport
      if ( ! this.$element.hasClass('nav-collapse') )
          return;

      if ( TCParams && 1 == TCParams.dropdowntoViewport )
      {
        //fallback on jQuery height() if window.innerHeight isn't defined (e.g. ie<9)
        var winHeight = 'undefined' === typeof window.innerHeight ? window.innerHeight : czrapp.$_window.height(),
            tcVisible = winHeight - this.$element.offset().top + czrapp.$_window.scrollTop();
        this.$element.css('max-height' , tcVisible + 'px');
      }
      else if ( TCParams && 1 != TCParams.dropdowntoViewport && 1 == TCParams.stickyHeader )
      {
        //trigger click on back to top if sticky enabled
        if ( 0 != $('.back-to-top').length ) {
          $('.back-to-top').trigger('click');
        }
        else {
          $('html, body').animate({
                  scrollTop: 0
              }, 700);
        }
        $('body').removeClass('sticky-enabled').removeClass('tc-sticky-header');
      }

    }//end of show:

  , hide: function () {
      var dimension
      //@tc adddon
      //( this._collapsed
      if (this.transitioning || ( this._collapsed && !this.$element.hasClass('in') ) ) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)

    //@tc adddon
    //to avoid conflicts with bootstrap>2.3.2 mobile menu
      this._collapsed = true;

      //@tc adddon
      if ( ! this.$element.hasClass('nav-collapse') )
          return;

      if ( TCParams && 1 != TCParams.dropdowntoViewport && 1 == TCParams.stickyHeader ) {
        $('body').addClass('tc-sticky-header');
      }
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
    //@tc adddon || ! this._collapsed
    //to avoid conflicts with bootstrap>2.3.2 mobile menu
      this[this.$element.hasClass('in') || ! this._collapsed ? 'hide' : 'show']();
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */
  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-carousel.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#carousel
 * ==========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options = options
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {
    //@tc_addon
    //use customizr events namespace
    //use .czr-item in place of .item
    //to avoid conflicts with other bootstrap versions
    cycle: function (e) {
      if (!e) this.paused = false
      if (this.interval) clearInterval(this.interval);
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , getActiveIndex: function () {
      this.$active = this.$element.find('.czr-item.active')
      this.$items = this.$active.parent().children()
      return this.$items.index(this.$active)
    }

  , to: function (pos) {
      var activeIndex = this.getActiveIndex()
        , that = this

      if (pos > (this.$items.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('customizr.slid', function () {
          that.to(pos)
        })
      }

      if (activeIndex == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle(true)
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      if(!$.support.transition && this.$element.hasClass('customizr-slide')) {
         this.$element.find('.czr-item').stop(true, true); //Finish animation and jump to end.
      }
      var $active = this.$element.find('.czr-item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.czr-item')[fallback]()

      e = $.Event('customizr.slide', {
        relatedTarget: $next[0]
      , direction: direction
      })

      if ($next.hasClass('active')) return

      if (this.$indicators.length) {
        this.$indicators.find('.active').removeClass('active')
        this.$element.one('customizr.slid', function () {
          var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
          $nextIndicator && $nextIndicator.addClass('active')
        })
      }

      if ($.support.transition && this.$element.hasClass('customizr-slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        //tc addon => trigger slide event to img
        if ( 0 !== $next.find('img').length )
          $next.find('img').trigger('customizr.slide');
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger('customizr.slid');
            //tc addon => trigger slid event to img
            if ( 0 !== $next.find('img').length )
              $next.find('img').trigger('customizr.slid');
          }, 0)
        })
      } else if(!$.support.transition && this.$element.hasClass('customizr-slide')) {
          this.$element.trigger(e)
          if (e.isDefaultPrevented()) return
          $active.animate({left: (direction == 'right' ? '100%' : '-100%')}, 600, function(){
             $active.removeClass('active')
              that.sliding = false
              setTimeout(function () { that.$element.trigger('customizr.slid') }, 0)
            })
           $next.addClass(type).css({left: (direction == 'right' ? '-100%' : '100%')}).animate({left: '0'}, 600,  function(){
               $next.removeClass(type).addClass('active')
           })
        } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('customizr.slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.czrCarousel

  $.fn.czrCarousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('czr-carousel')
        , options = $.extend({}, $.fn.czrCarousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('czr-carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.czrCarousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.czrCarousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  $.fn.czrCarousel.noConflict = function () {
    $.fn.czrCarousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  $(document).on('click.czr-carousel.data-api', '.customizr-slide [data-slide], .customizr-slide [data-slide-to]', function (e) {
    var $this = $(this), href
      , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      , options = $.extend({}, $target.data(), $this.data())
      , slideIndex

    $target.czrCarousel(options);

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('czr-carousel').pause().to(slideIndex).cycle()
    }

    e.preventDefault()
  })

}(window.jQuery);
/* =============================================================
 * bootstrap-typeahead.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#typeahead
 * =============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.$menu = $(this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', $.proxy(this.mouseleave, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , focus: function (e) {
      this.focused = true
    }

  , blur: function (e) {
      this.focused = false
      if (!this.mousedover && this.shown) this.hide()
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
      this.$element.focus()
    }

  , mouseenter: function (e) {
      this.mousedover = true
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  , mouseleave: function (e) {
      this.mousedover = false
      if (!this.focused && this.shown) this.hide()
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeahead

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var $this = $(this)
    if ($this.data('typeahead')) return
    $this.typeahead($this.data())
  })

}(window.jQuery);
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            lastTime = currTime + timeToCall;
            return window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        if (!script) {
          document.head.appendChild(style);
        } else {
          script.parentNode.insertBefore(style, script);
        }

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());// Customizr version of Galambosi's SmoothScroll

// SmoothScroll for websites v1.3.8 (Balazs Galambosi)
// Licensed under the terms of the MIT license.
//
// You may use it in your theme if you credit me. 
// It is also free to use on any individual website.
//
// Exception:
// The only restriction would be not to publish any  
// extension for browsers or native application
// without getting a written permission first.
//

(function () {

// Scroll Variables (tweakable)
var defaultOptions = {

    // Scrolling Core
    frameRate        : 150, // [Hz]
    animationTime    : 400, // [px]
    stepSize         : 120, // [px]

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm   : true,
    pulseScale       : 4,
    pulseNormalize   : 1,

    // Acceleration
    accelerationDelta : 20,  // 20
    accelerationMax   : 1,   // 1

    // Keyboard Settings
    keyboardSupport   : true,  // option
    arrowScroll       : 50,     // [px]

    // Other
    touchpadSupport   : true,
    fixedBackground   : true, 
    excluded          : ''    
};

var options = defaultOptions;


// Other Variables
var isExcluded = false;
var isFrame = false;
var direction = { x: 0, y: 0 };
var initDone  = false;
var root = document.documentElement;
var activeElement;
var observer;
var deltaBuffer = [];
var isMac = /^Mac/.test(navigator.platform);

var key = { left: 37, up: 38, right: 39, down: 40, spacebar: 32, 
            pageup: 33, pagedown: 34, end: 35, home: 36 };


/***********************************************
 * SETTINGS
 ***********************************************/

var options = defaultOptions;


/***********************************************
 * INITIALIZE
 ***********************************************/

/**
 * Tests if smooth scrolling is allowed. Shuts down everything if not.
 */
function initTest() {
    if (options.keyboardSupport) {
        addEvent('keydown', keydown);
    }
}

/**
 * Sets up scrolls array, determines if frames are involved.
 */
function init() {
  
    if (initDone || !document.body) return;

    initDone = true;

    var body = document.body;
    var html = document.documentElement;
    var windowHeight = window.innerHeight; 
    var scrollHeight = body.scrollHeight;
    
    // check compat mode for root element
    root = (document.compatMode.indexOf('CSS') >= 0) ? html : body;
    activeElement = body;
    
    initTest();

    // Checks if this script is running in a frame
    if (top != self) {
        isFrame = true;
    }

    /**
     * This fixes a bug where the areas left and right to 
     * the content does not trigger the onmousewheel event
     * on some pages. e.g.: html, body { height: 100% }
     */
    else if (scrollHeight > windowHeight &&
            (body.offsetHeight <= windowHeight || 
             html.offsetHeight <= windowHeight)) {

        var fullPageElem = document.createElement('div');
        fullPageElem.style.cssText = 'position:absolute; z-index:-10000; ' +
                                     'top:0; left:0; right:0; height:' + 
                                      root.scrollHeight + 'px';
        document.body.appendChild(fullPageElem);
        
        // DOM changed (throttled) to fix height
        var pendingRefresh;
        var refresh = function () {
            if (pendingRefresh) return; // could also be: clearTimeout(pendingRefresh);
            pendingRefresh = setTimeout(function () {
                if (isExcluded) return; // could be running after cleanup
                fullPageElem.style.height = '0';
                fullPageElem.style.height = root.scrollHeight + 'px';
                pendingRefresh = null;
            }, 500); // act rarely to stay fast
        };
  
        setTimeout(refresh, 10);

        // TODO: attributeFilter?
        var config = {
            attributes: true, 
            childList: true, 
            characterData: false 
            // subtree: true
        };

        observer = new MutationObserver(refresh);
        observer.observe(body, config);

        if (root.offsetHeight <= windowHeight) {
            var clearfix = document.createElement('div');   
            clearfix.style.clear = 'both';
            body.appendChild(clearfix);
        }
    }

    // disable fixed background
    if (!options.fixedBackground && !isExcluded) {
        body.style.backgroundAttachment = 'scroll';
        html.style.backgroundAttachment = 'scroll';
    }
}

/**
 * Removes event listeners and other traces left on the page.
 */
function cleanup() {
    observer && observer.disconnect();
    removeEvent(wheelEvent, wheel);
    removeEvent('mousedown', mousedown);
    removeEvent('keydown', keydown);
}


/************************************************
 * SCROLLING 
 ************************************************/
var que = [];
var pending = false;
var lastScroll = Date.now();

/**
 * Pushes scroll actions to the scrolling queue.
 */
function scrollArray(elem, left, top) {
    
    directionCheck(left, top);

    if (options.accelerationMax != 1) {
        var now = Date.now();
        var elapsed = now - lastScroll;
        if (elapsed < options.accelerationDelta) {
            var factor = (1 + (50 / elapsed)) / 2;
            if (factor > 1) {
                factor = Math.min(factor, options.accelerationMax);
                left *= factor;
                top  *= factor;
            }
        }
        lastScroll = Date.now();
    }          
    
    // push a scroll command
    que.push({
        x: left, 
        y: top, 
        lastX: (left < 0) ? 0.99 : -0.99,
        lastY: (top  < 0) ? 0.99 : -0.99, 
        start: Date.now()
    });
        
    // don't act if there's a pending queue
    if (pending) {
        return;
    }  

    var scrollWindow = (elem === document.body);
    
    var step = function (time) {
        
        var now = Date.now();
        var scrollX = 0;
        var scrollY = 0; 
    
        for (var i = 0; i < que.length; i++) {
            
            var item = que[i];
            var elapsed  = now - item.start;
            var finished = (elapsed >= options.animationTime);
            
            // scroll position: [0, 1]
            var position = (finished) ? 1 : elapsed / options.animationTime;
            
            // easing [optional]
            if (options.pulseAlgorithm) {
                position = pulse(position);
            }
            
            // only need the difference
            var x = (item.x * position - item.lastX) >> 0;
            var y = (item.y * position - item.lastY) >> 0;
            
            // add this to the total scrolling
            scrollX += x;
            scrollY += y;            
            
            // update last values
            item.lastX += x;
            item.lastY += y;
        
            // delete and step back if it's over
            if (finished) {
                que.splice(i, 1); i--;
            }           
        }

        // scroll left and top
        if (scrollWindow) {
            window.scrollBy(scrollX, scrollY);
        } 
        else {
            if (scrollX) elem.scrollLeft += scrollX;
            if (scrollY) elem.scrollTop  += scrollY;                    
        }
        
        // clean up if there's nothing left to do
        if (!left && !top) {
            que = [];
        }
        
        if (que.length) { 
            requestFrame(step, elem, (1000 / options.frameRate + 1)); 
        } else { 
            pending = false;
        }
    };
    
    // start a new queue of actions
    requestFrame(step, elem, 0);
    pending = true;
}


/***********************************************
 * EVENTS
 ***********************************************/

/**
 * Mouse wheel handler.
 * @param {Object} event
 */
function wheel(event) {

    if (!initDone) {
        init();
    }
    
    var target = event.target;
    var overflowing = overflowingAncestor(target);

    // use default if there's no overflowing
    // element or default action is prevented   
    // or it's a zooming event with CTRL 
    if (!overflowing || event.defaultPrevented || event.ctrlKey) {
        return true;
    }
    
    // leave embedded content alone (flash & pdf)
    if (isNodeName(activeElement, 'embed') || 
       (isNodeName(target, 'embed') && /\.pdf/i.test(target.src)) ||
       isNodeName(activeElement, 'object')) {
        return true;
    }

    var deltaX = -event.wheelDeltaX || event.deltaX || 0;
    var deltaY = -event.wheelDeltaY || event.deltaY || 0;
    
    if (isMac) {
        if (event.wheelDeltaX && isDivisible(event.wheelDeltaX, 120)) {
            deltaX = -120 * (event.wheelDeltaX / Math.abs(event.wheelDeltaX));
        }
        if (event.wheelDeltaY && isDivisible(event.wheelDeltaY, 120)) {
            deltaY = -120 * (event.wheelDeltaY / Math.abs(event.wheelDeltaY));
        }
    }
    
    // use wheelDelta if deltaX/Y is not available
    if (!deltaX && !deltaY) {
        deltaY = -event.wheelDelta || 0;
    }

    // line based scrolling (Firefox mostly)
    if (event.deltaMode === 1) {
        deltaX *= 40;
        deltaY *= 40;
    }
    
    // check if it's a touchpad scroll that should be ignored
    if (!options.touchpadSupport && isTouchpad(deltaY)) {
        return true;
    }

    // scale by step size
    // delta is 120 most of the time
    // synaptics seems to send 1 sometimes
    if (Math.abs(deltaX) > 1.2) {
        deltaX *= options.stepSize / 120;
    }
    if (Math.abs(deltaY) > 1.2) {
        deltaY *= options.stepSize / 120;
    }
    
    scrollArray(overflowing, deltaX, deltaY);
    event.preventDefault();
    scheduleClearCache();
}

/**
 * Keydown event handler.
 * @param {Object} event
 */
function keydown(event) {

    var target   = event.target;
    var modifier = event.ctrlKey || event.altKey || event.metaKey || 
                  (event.shiftKey && event.keyCode !== key.spacebar);
    
    // our own tracked active element could've been removed from the DOM
    if (!document.contains(activeElement)) {
        activeElement = document.activeElement;
    }

    // do nothing if user is editing text
    // or using a modifier key (except shift)
    // or in a dropdown
    // or inside interactive elements
    var inputNodeNames = /^(textarea|select|embed|object)$/i;
    var buttonTypes = /^(button|submit|radio|checkbox|file|color|image)$/i;
    if ( inputNodeNames.test(target.nodeName) ||
         isNodeName(target, 'input') && !buttonTypes.test(target.type) ||
         isNodeName(activeElement, 'video') ||
         isInsideYoutubeVideo(event) ||
         target.isContentEditable || 
         event.defaultPrevented   ||
         modifier ) {
      return true;
    }
    
    // spacebar should trigger button press
    if ((isNodeName(target, 'button') ||
         isNodeName(target, 'input') && buttonTypes.test(target.type)) &&
        event.keyCode === key.spacebar) {
      return true;
    }
    
    var shift, x = 0, y = 0;
    var elem = overflowingAncestor(activeElement);
    var clientHeight = elem.clientHeight;

    if (elem == document.body) {
        clientHeight = window.innerHeight;
    }

    switch (event.keyCode) {
        case key.up:
            y = -options.arrowScroll;
            break;
        case key.down:
            y = options.arrowScroll;
            break;         
        case key.spacebar: // (+ shift)
            shift = event.shiftKey ? 1 : -1;
            y = -shift * clientHeight * 0.9;
            break;
        case key.pageup:
            y = -clientHeight * 0.9;
            break;
        case key.pagedown:
            y = clientHeight * 0.9;
            break;
        case key.home:
            y = -elem.scrollTop;
            break;
        case key.end:
            var damt = elem.scrollHeight - elem.scrollTop - clientHeight;
            y = (damt > 0) ? damt+10 : 0;
            break;
        case key.left:
            x = -options.arrowScroll;
            break;
        case key.right:
            x = options.arrowScroll;
            break;            
        default:
            return true; // a key we don't care about
    }

    scrollArray(elem, x, y);
    event.preventDefault();
    scheduleClearCache();
}

/**
 * Mousedown event only for updating activeElement
 */
function mousedown(event) {
    activeElement = event.target;
}


/***********************************************
 * OVERFLOW
 ***********************************************/

var uniqueID = (function () {
    var i = 0;
    return function (el) {
        return el.uniqueID || (el.uniqueID = i++);
    };
})();

var cache = {}; // cleared out after a scrolling session
var clearCacheTimer;

//setInterval(function () { cache = {}; }, 10 * 1000);

function scheduleClearCache() {
    clearTimeout(clearCacheTimer);
    clearCacheTimer = setInterval(function () { cache = {}; }, 1*1000);
}

function setCache(elems, overflowing) {
    for (var i = elems.length; i--;)
        cache[uniqueID(elems[i])] = overflowing;
    return overflowing;
}

//  (body)                (root)
//         | hidden | visible | scroll |  auto  |
// hidden  |   no   |    no   |   YES  |   YES  |
// visible |   no   |   YES   |   YES  |   YES  |
// scroll  |   no   |   YES   |   YES  |   YES  |
// auto    |   no   |   YES   |   YES  |   YES  |

function overflowingAncestor(el) {
    var elems = [];
    var body = document.body;
    var rootScrollHeight = root.scrollHeight;
    do {
        var cached = cache[uniqueID(el)];
        if (cached) {
            return setCache(elems, cached);
        }
        elems.push(el);
        if (rootScrollHeight === el.scrollHeight) {
            var topOverflowsNotHidden = overflowNotHidden(root) && overflowNotHidden(body);
            var isOverflowCSS = topOverflowsNotHidden || overflowAutoOrScroll(root);
            if (isFrame && isContentOverflowing(root) || 
               !isFrame && isOverflowCSS) {
                return setCache(elems, getScrollRoot()); 
            }
        } else if (isContentOverflowing(el) && overflowAutoOrScroll(el)) {
            return setCache(elems, el);
        }
    } while (el = el.parentElement);
}

function isContentOverflowing(el) {
    return (el.clientHeight + 10 < el.scrollHeight);
}

// typically for <body> and <html>
function overflowNotHidden(el) {
    var overflow = getComputedStyle(el, '').getPropertyValue('overflow-y');
    return (overflow !== 'hidden');
}

// for all other elements
function overflowAutoOrScroll(el) {
    var overflow = getComputedStyle(el, '').getPropertyValue('overflow-y');
    return (overflow === 'scroll' || overflow === 'auto');
}


/***********************************************
 * HELPERS
 ***********************************************/

function addEvent(type, fn) {
    window.addEventListener(type, fn, false);
}

function removeEvent(type, fn) {
    window.removeEventListener(type, fn, false);  
}

function isNodeName(el, tag) {
    return (el.nodeName||'').toLowerCase() === tag.toLowerCase();
}

function directionCheck(x, y) {
    x = (x > 0) ? 1 : -1;
    y = (y > 0) ? 1 : -1;
    if (direction.x !== x || direction.y !== y) {
        direction.x = x;
        direction.y = y;
        que = [];
        lastScroll = 0;
    }
}

var deltaBufferTimer;

if (window.localStorage && localStorage.SS_deltaBuffer) {
    deltaBuffer = localStorage.SS_deltaBuffer.split(',');
}

function isTouchpad(deltaY) {
    if (!deltaY) return;
    if (!deltaBuffer.length) {
        deltaBuffer = [deltaY, deltaY, deltaY];
    }
    deltaY = Math.abs(deltaY)
    deltaBuffer.push(deltaY);
    deltaBuffer.shift();
    clearTimeout(deltaBufferTimer);
    deltaBufferTimer = setTimeout(function () {
        if (window.localStorage) {
            localStorage.SS_deltaBuffer = deltaBuffer.join(',');
        }
    }, 1000);
    return !allDeltasDivisableBy(120) && !allDeltasDivisableBy(100);
} 

function isDivisible(n, divisor) {
    return (Math.floor(n / divisor) == n / divisor);
}

function allDeltasDivisableBy(divisor) {
    return (isDivisible(deltaBuffer[0], divisor) &&
            isDivisible(deltaBuffer[1], divisor) &&
            isDivisible(deltaBuffer[2], divisor));
}

function isInsideYoutubeVideo(event) {
    var elem = event.target;
    var isControl = false;
    if (document.URL.indexOf ('www.youtube.com/watch') != -1) {
        do {
            isControl = (elem.classList && 
                         elem.classList.contains('html5-video-controls'));
            if (isControl) break;
        } while (elem = elem.parentNode);
    }
    return isControl;
}

var requestFrame = (function () {
      return (window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    ||
              function (callback, element, delay) {
                 window.setTimeout(callback, delay || (1000/60));
             });
})();

var MutationObserver = (window.MutationObserver || 
                        window.WebKitMutationObserver ||
                        window.MozMutationObserver);  

var getScrollRoot = (function() {
  var SCROLL_ROOT;
  return function() {
    if (!SCROLL_ROOT) {
      var dummy = document.createElement('div');
      dummy.style.cssText = 'height:10000px;width:1px;';
      document.body.appendChild(dummy);
      var bodyScrollTop  = document.body.scrollTop;
      var docElScrollTop = document.documentElement.scrollTop;
      window.scrollBy(0, 1);
      if (document.body.scrollTop != bodyScrollTop)
        (SCROLL_ROOT = document.body);
      else 
        (SCROLL_ROOT = document.documentElement);
      window.scrollBy(0, -1);
      document.body.removeChild(dummy);
    }
    return SCROLL_ROOT;
  };
})();


/***********************************************
 * PULSE (by Michael Herf)
 ***********************************************/
 
/**
 * Viscous fluid with a pulse for part and decay for the rest.
 * - Applies a fixed force over an interval (a damped acceleration), and
 * - Lets the exponential bleed away the velocity over a longer interval
 * - Michael Herf, http://stereopsis.com/stopping/
 */
function pulse_(x) {
    var val, start, expx;
    // test
    x = x * options.pulseScale;
    if (x < 1) { // acceleartion
        val = x - (1 - Math.exp(-x));
    } else {     // tail
        // the previous animation ended here:
        start = Math.exp(-1);
        // simple viscous drag
        x -= 1;
        expx = 1 - Math.exp(-x);
        val = start + (expx * (1 - start));
    }
    return val * options.pulseNormalize;
}

function pulse(x) {
    if (x >= 1) return 1;
    if (x <= 0) return 0;

    if (options.pulseNormalize == 1) {
        options.pulseNormalize /= pulse_(1);
    }
    return pulse_(x);
}

var wheelEvent;
if ('onwheel' in document.createElement('div'))
    wheelEvent = 'wheel';
else if ('onmousewheel' in document.createElement('div'))
    wheelEvent = 'mousewheel';


// Customizr mod
//Customizr mod wrap following: instructions in a function statement
//returns whether or not the smootScroll has been initialized
function _maybeInit( fire ){
  if (wheelEvent) {
    addEvent(wheelEvent, wheel);
    addEvent('mousedown', mousedown);
    if ( ! fire ) addEvent('load', init);
    else init();
  }
  return wheelEvent ? true : false;
}
// smoothScroll "constructor"
smoothScroll = function ( _options ) {
  smoothScroll._setCustomOptions( _options );
  _maybeInit() && czrapp.$_body.addClass('tc-smoothscroll');
}
// expose useful methods ( for the preview )
smoothScroll._cleanUp = function(){
  cleanup();    
  czrapp.$_body.removeClass('tc-smoothscroll');
}
smoothScroll._maybeFire = function(){
  //will be called from the preview so when document already loaded
  // pass to the function _fire = true, fire it immediately
  _maybeInit(true) && czrapp.$_body.addClass('tc-smoothscroll');
}
smoothScroll._setCustomOptions = function( _options ){
  options  =  _options ? _.extend( options, _options) : options;
}
// end Customizr mod
})();

var smoothScroll;
// modified version of
// outline.js (https://github.com/lindsayevans/outline.js)
// based on http://www.paciellogroup.com/blog/2012/04/how-to-remove-css-outlines-in-an-accessible-manner/
var tcOutline;
(function(d){
  tcOutline = function() {
	var style_element = d.createElement('STYLE'),
	    dom_events = 'addEventListener' in d,
	    add_event_listener = function(type, callback){
			// Basic cross-browser event handling
			if(dom_events){
				d.addEventListener(type, callback);
			}else{
				d.attachEvent('on' + type, callback);
			}
		},
	    set_css = function(css_text){
			// Handle setting of <style> element contents in IE8
			if ( !!style_element.styleSheet )
                style_element.styleSheet.cssText = css_text; 
            else 
                style_element.innerHTML = css_text;
		}
	;

	d.getElementsByTagName('HEAD')[0].appendChild(style_element);

	// Using mousedown instead of mouseover, so that previously focused elements don't lose focus ring on mouse move
	add_event_listener('mousedown', function(){
		set_css('input[type=file]:focus,input[type=radio]:focus,input[type=checkbox]:focus,select:focus,a:focus{outline:0}input[type=file]::-moz-focus-inner,input[type=radio]::-moz-focus-inner,input[type=checkbox]::-moz-focus-inner,select::-moz-focus-inner,a::-moz-focus-inner{border:0;}');
	});

	add_event_listener('keydown', function(){
		set_css('');
	});
  }
})(document);
/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function() {
  'use strict'

  var keyCounter = 0
  var allWaypoints = {}

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor')
    }
    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor')
    }
    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor')
    }

    this.key = 'waypoint-' + keyCounter
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
    this.element = this.options.element
    this.adapter = new Waypoint.Adapter(this.element)
    this.callback = options.handler
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
    this.enabled = this.options.enabled
    this.triggerPoint = null
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    })
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset]
    }
    this.group.add(this)
    this.context.add(this)
    allWaypoints[this.key] = this
    keyCounter += 1
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function(direction) {
    this.group.queueTrigger(this, direction)
  }

  /* Private */
  Waypoint.prototype.trigger = function(args) {
    if (!this.enabled) {
      return
    }
    if (this.callback) {
      this.callback.apply(this, args)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function() {
    this.context.remove(this)
    this.group.remove(this)
    delete allWaypoints[this.key]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function() {
    this.enabled = false
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function() {
    this.context.refresh()
    this.enabled = true
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function() {
    return this.group.next(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function() {
    return this.group.previous(this)
  }

  /* Private */
  Waypoint.invokeAll = function(method) {
    var allWaypointsArray = []
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey])
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i][method]()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function() {
    Waypoint.invokeAll('destroy')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable-all */
  Waypoint.disableAll = function() {
    Waypoint.invokeAll('disable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable-all */
  Waypoint.enableAll = function() {
    Waypoint.invokeAll('enable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function() {
    Waypoint.Context.refreshAll()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function() {
    return document.documentElement.clientWidth
  }

  Waypoint.adapters = []

  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  }

  Waypoint.offsetAliases = {
    'bottom-in-view': function() {
      return this.context.innerHeight() - this.adapter.outerHeight()
    },
    'right-in-view': function() {
      return this.context.innerWidth() - this.adapter.outerWidth()
    }
  }

  window.Waypoint = Waypoint
}())
;(function() {
  'use strict'

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60)
  }

  var keyCounter = 0
  var contexts = {}
  var Waypoint = window.Waypoint
  var oldWindowLoad = window.onload

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
    this.element = element
    this.Adapter = Waypoint.Adapter
    this.adapter = new this.Adapter(element)
    this.key = 'waypoint-context-' + keyCounter
    this.didScroll = false
    this.didResize = false
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }
    this.waypoints = {
      vertical: {},
      horizontal: {}
    }

    element.waypointContextKey = this.key
    contexts[element.waypointContextKey] = this
    keyCounter += 1

    this.createThrottledScrollHandler()
    this.createThrottledResizeHandler()
  }

  /* Private */
  Context.prototype.add = function(waypoint) {
    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
    this.waypoints[axis][waypoint.key] = waypoint
    this.refresh()
  }

  /* Private */
  Context.prototype.checkEmpty = function() {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
    if (horizontalEmpty && verticalEmpty) {
      this.adapter.off('.waypoints')
      delete contexts[this.key]
    }
  }

  /* Private */
  Context.prototype.createThrottledResizeHandler = function() {
    var self = this

    function resizeHandler() {
      self.handleResize()
      self.didResize = false
    }

    this.adapter.on('resize.waypoints', function() {
      if (!self.didResize) {
        self.didResize = true
        Waypoint.requestAnimationFrame(resizeHandler)
      }
    })
  }

  /* Private */
  Context.prototype.createThrottledScrollHandler = function() {
    var self = this
    function scrollHandler() {
      self.handleScroll()
      self.didScroll = false
    }

    this.adapter.on('scroll.waypoints', function() {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true
        Waypoint.requestAnimationFrame(scrollHandler)
      }
    })
  }

  /* Private */
  Context.prototype.handleResize = function() {
    Waypoint.Context.refreshAll()
  }

  /* Private */
  Context.prototype.handleScroll = function() {
    var triggeredGroups = {}
    var axes = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left'
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      var isForward = axis.newScroll > axis.oldScroll
      var direction = isForward ? axis.forward : axis.backward

      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
        if (crossedForward || crossedBackward) {
          waypoint.queueTrigger(direction)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    this.oldScroll = {
      x: axes.horizontal.newScroll,
      y: axes.vertical.newScroll
    }
  }

  /* Private */
  Context.prototype.innerHeight = function() {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportHeight()
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerHeight()
  }

  /* Private */
  Context.prototype.remove = function(waypoint) {
    delete this.waypoints[waypoint.axis][waypoint.key]
    this.checkEmpty()
  }

  /* Private */
  Context.prototype.innerWidth = function() {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportWidth()
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerWidth()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-destroy */
  Context.prototype.destroy = function() {
    var allWaypoints = []
    for (var axis in this.waypoints) {
      for (var waypointKey in this.waypoints[axis]) {
        allWaypoints.push(this.waypoints[axis][waypointKey])
      }
    }
    for (var i = 0, end = allWaypoints.length; i < end; i++) {
      allWaypoints[i].destroy()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-refresh */
  Context.prototype.refresh = function() {
    /*eslint-disable eqeqeq */
    var isWindow = this.element == this.element.window
    /*eslint-enable eqeqeq */
    var contextOffset = isWindow ? undefined : this.adapter.offset()
    var triggeredGroups = {}
    var axes

    this.handleScroll()
    axes = {
      horizontal: {
        contextOffset: isWindow ? 0 : contextOffset.left,
        contextScroll: isWindow ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left',
        offsetProp: 'left'
      },
      vertical: {
        contextOffset: isWindow ? 0 : contextOffset.top,
        contextScroll: isWindow ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up',
        offsetProp: 'top'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var adjustment = waypoint.options.offset
        var oldTriggerPoint = waypoint.triggerPoint
        var elementOffset = 0
        var freshWaypoint = oldTriggerPoint == null
        var contextModifier, wasBeforeScroll, nowAfterScroll
        var triggeredBackward, triggeredForward

        if (waypoint.element !== waypoint.element.window) {
          elementOffset = waypoint.adapter.offset()[axis.offsetProp]
        }

        if (typeof adjustment === 'function') {
          adjustment = adjustment.apply(waypoint)
        }
        else if (typeof adjustment === 'string') {
          adjustment = parseFloat(adjustment)
          if (waypoint.options.offset.indexOf('%') > - 1) {
            adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
          }
        }

        contextModifier = axis.contextScroll - axis.contextOffset
        waypoint.triggerPoint = elementOffset + contextModifier - adjustment
        wasBeforeScroll = oldTriggerPoint < axis.oldScroll
        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
        triggeredBackward = wasBeforeScroll && nowAfterScroll
        triggeredForward = !wasBeforeScroll && !nowAfterScroll

        if (!freshWaypoint && triggeredBackward) {
          waypoint.queueTrigger(axis.backward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (!freshWaypoint && triggeredForward) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    Waypoint.requestAnimationFrame(function() {
      for (var groupKey in triggeredGroups) {
        triggeredGroups[groupKey].flushTriggers()
      }
    })

    return this
  }

  /* Private */
  Context.findOrCreateByElement = function(element) {
    return Context.findByElement(element) || new Context(element)
  }

  /* Private */
  Context.refreshAll = function() {
    for (var contextId in contexts) {
      contexts[contextId].refresh()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
  Context.findByElement = function(element) {
    return contexts[element.waypointContextKey]
  }

  window.onload = function() {
    if (oldWindowLoad) {
      oldWindowLoad()
    }
    Context.refreshAll()
  }

  Waypoint.requestAnimationFrame = function(callback) {
    var requestFn = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      requestAnimationFrameShim
    requestFn.call(window, callback)
  }
  Waypoint.Context = Context
}())
;(function() {
  'use strict'

  function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint
  }

  function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint
  }

  var groups = {
    vertical: {},
    horizontal: {}
  }
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/api/group */
  function Group(options) {
    this.name = options.name
    this.axis = options.axis
    this.id = this.name + '-' + this.axis
    this.waypoints = []
    this.clearTriggerQueues()
    groups[this.axis][this.name] = this
  }

  /* Private */
  Group.prototype.add = function(waypoint) {
    this.waypoints.push(waypoint)
  }

  /* Private */
  Group.prototype.clearTriggerQueues = function() {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    }
  }

  /* Private */
  Group.prototype.flushTriggers = function() {
    for (var direction in this.triggerQueues) {
      var waypoints = this.triggerQueues[direction]
      var reverse = direction === 'up' || direction === 'left'
      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
      for (var i = 0, end = waypoints.length; i < end; i += 1) {
        var waypoint = waypoints[i]
        if (waypoint.options.continuous || i === waypoints.length - 1) {
          waypoint.trigger([direction])
        }
      }
    }
    this.clearTriggerQueues()
  }

  /* Private */
  Group.prototype.next = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    var isLast = index === this.waypoints.length - 1
    return isLast ? null : this.waypoints[index + 1]
  }

  /* Private */
  Group.prototype.previous = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    return index ? this.waypoints[index - 1] : null
  }

  /* Private */
  Group.prototype.queueTrigger = function(waypoint, direction) {
    this.triggerQueues[direction].push(waypoint)
  }

  /* Private */
  Group.prototype.remove = function(waypoint) {
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    if (index > -1) {
      this.waypoints.splice(index, 1)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/first */
  Group.prototype.first = function() {
    return this.waypoints[0]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/last */
  Group.prototype.last = function() {
    return this.waypoints[this.waypoints.length - 1]
  }

  /* Private */
  Group.findOrCreate = function(options) {
    return groups[options.axis][options.name] || new Group(options)
  }

  Waypoint.Group = Group
}())
;(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  function JQueryAdapter(element) {
    this.$element = $(element)
  }

  $.each([
    'innerHeight',
    'innerWidth',
    'off',
    'offset',
    'on',
    'outerHeight',
    'outerWidth',
    'scrollLeft',
    'scrollTop'
  ], function(i, method) {
    JQueryAdapter.prototype[method] = function() {
      var args = Array.prototype.slice.call(arguments)
      return this.$element[method].apply(this.$element, args)
    }
  })

  $.each([
    'extend',
    'inArray',
    'isEmptyObject'
  ], function(i, method) {
    JQueryAdapter[method] = $[method]
  })

  Waypoint.adapters.push({
    name: 'jquery',
    Adapter: JQueryAdapter
  })
  Waypoint.Adapter = JQueryAdapter
}())
;(function() {
  'use strict'

  var Waypoint = window.Waypoint

  function createExtension(framework) {
    return function() {
      var waypoints = []
      var overrides = arguments[0]

      if (framework.isFunction(arguments[0])) {
        overrides = framework.extend({}, arguments[1])
        overrides.handler = arguments[0]
      }

      this.each(function() {
        var options = framework.extend({}, overrides, {
          element: this
        })
        if (typeof options.context === 'string') {
          options.context = framework(this).closest(options.context)[0]
        }
        waypoints.push(new Waypoint(options))
      })

      return waypoints
    }
  }

  if (window.jQuery) {
    window.jQuery.fn.waypoint = createExtension(window.jQuery)
  }
  if (window.Zepto) {
    window.Zepto.fn.waypoint = createExtension(window.Zepto)
  }
}())
;//@global TCParams
var czrapp = czrapp || {};

/*************************
* JS LOG UTILITIES
*************************/
(function($, czrapp) {
      //Utility : print a js log on front
      czrapp._printLog = function( log ) {
            var _render = function() {
                  return $.Deferred( function() {
                        var dfd = this;
                        $.when( $('#footer').before( $('<div/>', { id : "bulklog" }) ) ).done( function() {
                              $('#bulklog').css({
                                    position: 'fixed',
                                    'z-index': '99999',
                                    'font-size': '0.8em',
                                    color: '#000',
                                    padding: '5%',
                                    width: '90%',
                                    height: '20%',
                                    overflow: 'hidden',
                                    bottom: '0',
                                    left: '0',
                                    background: 'yellow'
                              });

                              dfd.resolve();
                        });
                  }).promise();
                },
                _print = function() {
                      $('#bulklog').prepend('<p>' + czrapp._prettyfy( { consoleArguments : [ log ], prettyfy : false } ) + '</p>');
                };

            if ( 1 != $('#bulk-log').length ) {
                _render().done( _print );
            } else {
                _print();
            }
      };


      czrapp._truncate = function( string , length ){
            length = length || 150;
            if ( ! _.isString( string ) )
              return '';
            return string.length > length ? string.substr( 0, length - 1 ) : string;
      };

      //CONSOLE / ERROR LOG
      //@return [] for console method
      //@bgCol @textCol are hex colors
      //@arguments : the original console arguments
      czrapp._prettyfy = function( args ) {
            var _defaults = {
                  bgCol : '#5ed1f5',
                  textCol : '#000',
                  consoleArguments : [],
                  prettyfy : true
            };
            args = _.extend( _defaults, args );

            var _toArr = Array.from( args.consoleArguments );

            //if the array to print is not composed exclusively of strings, then let's stringify it
            //else join()
            if ( ! _.isEmpty( _.filter( _toArr, function( it ) { return ! _.isString( it ); } ) ) ) {
                  _toArr =  JSON.stringify( _toArr );
            } else {
                  _toArr = _toArr.join(' ');
            }
            if ( args.prettyfy )
              return [
                    '%c ' + czrapp._truncate( _toArr ),
                    [ 'background:' + args.bgCol, 'color:' + args.textCol, 'display: block;' ].join(';')
              ];
            else
              return czrapp._truncate( _toArr );
      };

      //Dev mode aware and IE compatible api.consoleLog()
      czrapp.consoleLog = function() {
            if ( ! czrapp.localized.isDevMode )
              return;
            //fix for IE, because console is only defined when in F12 debugging mode in IE
            if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) )
              return;

            console.log.apply( console, czrapp._prettyfy( { consoleArguments : arguments } ) );
      };

      czrapp.errorLog = function() {
            //fix for IE, because console is only defined when in F12 debugging mode in IE
            if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) )
              return;

            console.log.apply( console, czrapp._prettyfy( { bgCol : '#ffd5a0', textCol : '#000', consoleArguments : arguments } ) );
      };

      //encapsulates a WordPress ajax request in a normalize method
      //@param query = { ... }
      czrapp.doAjax = function( query ) {
            //do we have a query ?
            query = query || ( _.isObject( query ) ? query : {} );

            var ajaxUrl = czrapp.localized.ajaxUrl,
                nonce = czrapp.localized.czrFrontNonce,//{ 'id' : '', 'handle' : '' }
                dfd = $.Deferred(),
                _query_ = _.extend( {
                            action : ''
                      },
                      query
                );

            // HTTP ajaxurl when site is HTTPS causes Access-Control-Allow-Origin failure in Desktop and iOS Safari
            if ( "https:" == document.location.protocol ) {
                  ajaxUrl = ajaxUrl.replace( "http://", "https://" );
            }

            //check if we're good
            if ( _.isEmpty( _query_.action ) || ! _.isString( _query_.action ) ) {
                  czrapp.errorLog( 'czrapp.doAjax : unproper action provided' );
                  return dfd.resolve().promise();
            }
            //setup nonce
            _query_[ nonce.id ] = nonce.handle;
            if ( ! _.isObject( nonce ) || _.isUndefined( nonce.id ) || _.isUndefined( nonce.handle ) ) {
                  czrapp.errorLog( 'czrapp.doAjax : unproper nonce' );
                  return dfd.resolve().promise();
            }

            $.post( ajaxUrl, _query_ )
                  .done( function( _r ) {
                        // Check if the user is logged out.
                        if ( '0' === _r ||  '-1' === _r ) {
                              czrapp.errorLog( 'czrapp.doAjax : done ajax error for : ', _query_.action, _r );
                        }
                  })
                  .fail( function( _r ) { czrapp.errorLog( 'czrapp.doAjax : failed ajax error for : ', _query_.action, _r ); })
                  .always( function( _r ) { dfd.resolve( _r ); });
            return dfd.promise();
      };
})(jQuery, czrapp);








/*************************
* ADD DOM LISTENER UTILITY
*************************/
(function($, czrapp) {

      /**
       * Return whether the supplied Event object is for a keydown event but not the Enter key.
       *
       * @since 4.1.0
       *
       * @param {jQuery.Event} event
       * @returns {boolean}
       */
      czrapp.isKeydownButNotEnterEvent = function ( event ) {
        return ( 'keydown' === event.type && 13 !== event.which );
      };

      //@args = {model : model, dom_el : $_view_el, refreshed : _refreshed }
      czrapp.setupDOMListeners = function( event_map , args, instance ) {
              var _defaultArgs = {
                        model : {},
                        dom_el : {}
                  };

              if ( _.isUndefined( instance ) || ! _.isObject( instance ) ) {
                    czrapp.errorLog( 'setupDomListeners : instance should be an object', args );
                    return;
              }
              //event_map : are we good ?
              if ( ! _.isArray( event_map ) ) {
                    czrapp.errorLog( 'setupDomListeners : event_map should be an array', args );
                    return;
              }

              //args : are we good ?
              if ( ! _.isObject( args ) ) {
                    czrapp.errorLog( 'setupDomListeners : args should be an object', event_map );
                    return;
              }

              args = _.extend( _defaultArgs, args );
              // => we need an existing dom element
              if ( ! ( args.dom_el instanceof jQuery ) || 1 != args.dom_el.length ) {
                    czrapp.errorLog( 'setupDomListeners : dom element should be an existing dom element', args );
                    return;
              }

              //loop on the event map and map the relevant callbacks by event name
              // @param _event :
              //{
              //       trigger : '',
              //       selector : '',
              //       name : '',
              //       actions : ''
              // },
              _.map( event_map , function( _event ) {
                    if ( ! _.isString( _event.selector ) || _.isEmpty( _event.selector ) ) {
                          czrapp.errorLog( 'setupDOMListeners : selector must be a string not empty. Aborting setup of action(s) : ' + _event.actions.join(',') );
                          return;
                    }

                    //Are we good ?
                    if ( ! _.isString( _event.selector ) || _.isEmpty( _event.selector ) ) {
                          czrapp.errorLog( 'setupDOMListeners : selector must be a string not empty. Aborting setup of action(s) : ' + _event.actions.join(',') );
                          return;
                    }

                    //LISTEN TO THE DOM => USES EVENT DELEGATION
                    args.dom_el.on( _event.trigger , _event.selector, function( e, event_params ) {
                          //stop propagation to ancestors modules, typically a sektion
                          e.stopPropagation();
                          //particular treatment
                          if ( czrapp.isKeydownButNotEnterEvent( e ) ) {
                            return;
                          }
                          e.preventDefault(); // Keep this AFTER the key filter above

                          //It is important to deconnect the original object from its source
                          //=> because we will extend it when used as params for the action chain execution
                          var actionsParams = $.extend( true, {}, args );

                          //always get the latest model from the collection
                          if ( _.has( actionsParams, 'model') && _.has( actionsParams.model, 'id') ) {
                                if ( _.has( instance, 'get' ) )
                                  actionsParams.model = instance();
                                else
                                  actionsParams.model = instance.getModel( actionsParams.model.id );
                          }

                          //always add the event obj to the passed args
                          //+ the dom event
                          $.extend( actionsParams, { event : _event, dom_event : e } );

                          //add the event param => useful for triggered event
                          $.extend( actionsParams, event_params );

                          //SETUP THE EMITTERS
                          //inform the container that something has happened
                          //pass the model and the current dom_el
                          //the model is always passed as parameter
                          if ( ! _.has( actionsParams, 'event' ) || ! _.has( actionsParams.event, 'actions' ) ) {
                                czrapp.errorLog( 'executeEventActionChain : missing obj.event or obj.event.actions' );
                                return;
                          }
                          try { czrapp.executeEventActionChain( actionsParams, instance ); } catch( er ) {
                                czrapp.errorLog( 'In setupDOMListeners : problem when trying to fire actions : ' + actionsParams.event.actions );
                                czrapp.errorLog( 'Error : ' + er );
                          }
                    });//.on()
              });//_.map()
      };//setupDomListeners



      //GENERIC METHOD TO SETUP EVENT LISTENER
      //NOTE : the args.event must alway be defined
      czrapp.executeEventActionChain = function( args, instance ) {
              //if the actions param is a anonymous function, fire it and stop there
              if ( 'function' === typeof( args.event.actions ) )
                return args.event.actions.call( instance, args );

              //execute the various actions required
              //first normalizes the provided actions into an array of callback methods
              //then loop on the array and fire each cb if exists
              if ( ! _.isArray( args.event.actions ) )
                args.event.actions = [ args.event.actions ];

              //if one of the callbacks returns false, then we break the loop
              //=> allows us to stop a chain of callbacks if a condition is not met
              var _break = false;
              _.map( args.event.actions, function( _cb ) {
                    if ( _break )
                      return;

                    if ( 'function' != typeof( instance[ _cb ] ) ) {
                          throw new Error( 'executeEventActionChain : the action : ' + _cb + ' has not been found when firing event : ' + args.event.selector );
                    }

                    //Allow other actions to be bound before action and after
                    //
                    //=> we don't want the event in the object here => we use the one in the event map if set
                    //=> otherwise will loop infinitely because triggering always the same cb from args.event.actions[_cb]
                    //=> the dom element shall be get from the passed args and fall back to the controler container.
                    var $_dom_el = ( _.has(args, 'dom_el') && -1 != args.dom_el.length ) ? args.dom_el : false;
                    if ( ! $_dom_el ) {
                          czrapp.errorLog( 'missing dom element');
                          return;
                    }
                    $_dom_el.trigger( 'before_' + _cb, _.omit( args, 'event' ) );

                    //executes the _cb and stores the result in a local var
                    var _cb_return = instance[ _cb ].call( instance, args );
                    //shall we stop the action chain here ?
                    if ( false === _cb_return )
                      _break = true;

                    //allow other actions to be bound after
                    $_dom_el.trigger( 'after_' + _cb, _.omit( args, 'event' ) );
              });//_.map
      };
})(jQuery, czrapp);//@global TCParams
var czrapp = czrapp || {};
czrapp.methods = {};

(function( TCParams, $ ){
      var ctor, inherits, slice = Array.prototype.slice;

      // Shared empty constructor function to aid in prototype-chain creation.
      ctor = function() {};

      /**
       * Helper function to correctly set up the prototype chain, for subclasses.
       * Similar to `goog.inherits`, but uses a hash of prototype properties and
       * class properties to be extended.
       *
       * @param  object parent      Parent class constructor to inherit from.
       * @param  object protoProps  Properties to apply to the prototype for use as class instance properties.
       * @param  object staticProps Properties to apply directly to the class constructor.
       * @return child              The subclassed constructor.
       */
      inherits = function( parent, protoProps, staticProps ) {
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call `super()`.
        if ( protoProps && protoProps.hasOwnProperty( 'constructor' ) ) {
          child = protoProps.constructor;
        } else {
          child = function() {
            // Storing the result `super()` before returning the value
            // prevents a bug in Opera where, if the constructor returns
            // a function, Opera will reject the return value in favor of
            // the original object. This causes all sorts of trouble.
            var result = parent.apply( this, arguments );
            return result;
          };
        }

        // Inherit class (static) properties from parent.
        $.extend( child, parent );

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        ctor.prototype  = parent.prototype;
        child.prototype = new ctor();

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if ( protoProps )
          $.extend( child.prototype, protoProps );

        // Add static properties to the constructor function, if supplied.
        if ( staticProps )
          $.extend( child, staticProps );

        // Correctly set child's `prototype.constructor`.
        child.prototype.constructor = child;

        // Set a convenience property in case the parent's prototype is needed later.
        child.__super__ = parent.prototype;

        return child;
      };

      /**
       * Base class for object inheritance.
       */
      czrapp.Class = function( applicator, argsArray, options ) {
        var magic, args = arguments;

        if ( applicator && argsArray && czrapp.Class.applicator === applicator ) {
          args = argsArray;
          $.extend( this, options || {} );
        }

        magic = this;

        /*
         * If the class has a method called "instance",
         * the return value from the class' constructor will be a function that
         * calls the "instance" method.
         *
         * It is also an object that has properties and methods inside it.
         */
        if ( this.instance ) {
          magic = function() {
            return magic.instance.apply( magic, arguments );
          };

          $.extend( magic, this );
        }

        magic.initialize.apply( magic, args );
        return magic;
      };

      /**
       * Creates a subclass of the class.
       *
       * @param  object protoProps  Properties to apply to the prototype.
       * @param  object staticProps Properties to apply directly to the class.
       * @return child              The subclass.
       */
      czrapp.Class.extend = function( protoProps, classProps ) {
        var child = inherits( this, protoProps, classProps );
        child.extend = this.extend;
        return child;
      };

      czrapp.Class.applicator = {};

      /**
       * Initialize a class instance.
       *
       * Override this function in a subclass as needed.
       */
      czrapp.Class.prototype.initialize = function() {};

      /*
       * Checks whether a given instance extended a constructor.
       *
       * The magic surrounding the instance parameter causes the instanceof
       * keyword to return inaccurate results; it defaults to the function's
       * prototype instead of the constructor chain. Hence this function.
       */
      czrapp.Class.prototype.extended = function( constructor ) {
        var proto = this;

        while ( typeof proto.constructor !== 'undefined' ) {
          if ( proto.constructor === constructor )
            return true;
          if ( typeof proto.constructor.__super__ === 'undefined' )
            return false;
          proto = proto.constructor.__super__;
        }
        return false;
      };

      /**
       * An events manager object, offering the ability to bind to and trigger events.
       *
       * Used as a mixin.
       */
      czrapp.Events = {
        trigger: function( id ) {
          if ( this.topics && this.topics[ id ] )
            this.topics[ id ].fireWith( this, slice.call( arguments, 1 ) );
          return this;
        },

        bind: function( id ) {
          this.topics = this.topics || {};
          this.topics[ id ] = this.topics[ id ] || $.Callbacks();
          this.topics[ id ].add.apply( this.topics[ id ], slice.call( arguments, 1 ) );
          return this;
        },

        unbind: function( id ) {
          if ( this.topics && this.topics[ id ] )
            this.topics[ id ].remove.apply( this.topics[ id ], slice.call( arguments, 1 ) );
          return this;
        }
      };

      /**
       * Observable values that support two-way binding.
       *
       * @constructor
       */
      czrapp.Value = czrapp.Class.extend({
        /**
         * @param {mixed}  initial The initial value.
         * @param {object} options
         */
        initialize: function( initial, options ) {
          this._value = initial; // @todo: potentially change this to a this.set() call.
          this.callbacks = $.Callbacks();
          this._dirty = false;

          $.extend( this, options || {} );

          this.set = $.proxy( this.set, this );
        },

        /*
         * Magic. Returns a function that will become the instance.
         * Set to null to prevent the instance from extending a function.
         */
        instance: function() {
          return arguments.length ? this.set.apply( this, arguments ) : this.get();
        },

        /**
         * Get the value.
         *
         * @return {mixed}
         */
        get: function() {
          return this._value;
        },

        /**
         * Set the value and trigger all bound callbacks.
         *
         * @param {object} to New value.
         */
        set: function( to, o ) {
              var from = this._value, dfd = $.Deferred(), self = this, _promises = [];

              to = this._setter.apply( this, arguments );
              to = this.validate( to );
              args = _.extend( { silent : false }, _.isObject( o ) ? o : {} );

              // Bail if the sanitized value is null or unchanged.
              if ( null === to || _.isEqual( from, to ) ) {
                    return dfd.resolveWith( self, [ to, from, o ] ).promise();
              }

              this._value = to;
              this._dirty = true;
              if ( true === args.silent ) {
                    return dfd.resolveWith( self, [ to, from, o ] ).promise();
              }

              if ( this._deferreds ) {
                    _.each( self._deferreds, function( _prom ) {
                          _promises.push( _prom.apply( null, [ to, from, o ] ) );
                    });

                    $.when.apply( null, _promises )
                          .fail( function() { api.errorLog( 'A deferred callback failed in api.Value::set()'); })
                          .then( function() {
                                self.callbacks.fireWith( self, [ to, from, o ] );
                                dfd.resolveWith( self, [ to, from, o ] );
                          });
              } else {
                    this.callbacks.fireWith( this, [ to, from, o ] );
                    return dfd.resolveWith( self, [ to, from, o ] ).promise( self );
              }
              return dfd.promise( self );
        },

        /*****************************************************************************
        * A SILENT SET METHOD :
        * => keep the dirtyness param unchanged
        * => stores the api state before callback calls, and reset it after
        * => add an object param to the callback to inform that this is a silent process
        * , this is typically used in the overridden api.Setting.preview method
        *****************************************************************************/
        //@param to : the new value to set
        //@param dirtyness : the current dirtyness status of this setting in the skope
        silent_set : function( to, dirtyness ) {
              var from = this._value,
                  _save_state = api.state('saved')();

              to = this._setter.apply( this, arguments );
              to = this.validate( to );

              // Bail if the sanitized value is null or unchanged.
              if ( null === to || _.isEqual( from, to ) ) {
                return this;
              }

              this._value = to;
              this._dirty = ( _.isUndefined( dirtyness ) || ! _.isBoolean( dirtyness ) ) ? this._dirty : dirtyness;

              this.callbacks.fireWith( this, [ to, from, { silent : true } ] );
              //reset the api state to its value before the callback call
              api.state('saved')( _save_state );
              return this;
        },

        _setter: function( to ) {
          return to;
        },

        setter: function( callback ) {
          var from = this.get();
          this._setter = callback;
          // Temporarily clear value so setter can decide if it's valid.
          this._value = null;
          this.set( from );
          return this;
        },

        resetSetter: function() {
          this._setter = this.constructor.prototype._setter;
          this.set( this.get() );
          return this;
        },

        validate: function( value ) {
          return value;
        },

        /**
         * Bind a function to be invoked whenever the value changes.
         *
         * @param {...Function} A function, or multiple functions, to add to the callback stack.
         */
        //allows us to specify a list of callbacks + a { deferred : true } param
        //if deferred is found and true, then the callback(s) are added in a list of deferred
        //@see how this deferred list is used in api.Value.prototype.set()
        bind: function() {
            //find an object in the argument
            var self = this,
                _isDeferred = false,
                _cbs = [];

            $.each( arguments, function( _key, _arg ) {
                  if ( ! _isDeferred )
                    _isDeferred = _.isObject( _arg  ) && _arg.deferred;
                  if ( _.isFunction( _arg ) )
                    _cbs.push( _arg );
            });

            if ( _isDeferred ) {
                  self._deferreds = self._deferreds || [];
                  _.each( _cbs, function( _cb ) {
                        if ( ! _.contains( _cb, self._deferreds ) )
                          self._deferreds.push( _cb );
                  });
            } else {
                  //original method
                  self.callbacks.add.apply( self.callbacks, arguments );
            }
            return this;
        },

        /**
         * Unbind a previously bound function.
         *
         * @param {...Function} A function, or multiple functions, to remove from the callback stack.
         */
        unbind: function() {
          this.callbacks.remove.apply( this.callbacks, arguments );
          return this;
        },

        // link: function() { // values*
        //   var set = this.set;
        //   $.each( arguments, function() {
        //     this.bind( set );
        //   });
        //   return this;
        // },

        // unlink: function() { // values*
        //   var set = this.set;
        //   $.each( arguments, function() {
        //     this.unbind( set );
        //   });
        //   return this;
        // },

        // sync: function() { // values*
        //   var that = this;
        //   $.each( arguments, function() {
        //     that.link( this );
        //     this.link( that );
        //   });
        //   return this;
        // },

        // unsync: function() { // values*
        //   var that = this;
        //   $.each( arguments, function() {
        //     that.unlink( this );
        //     this.unlink( that );
        //   });
        //   return this;
        // }
      });

      /**
       * A collection of observable values.
       *
       * @constructor
       */
      czrapp.Values = czrapp.Class.extend({

        /**
         * The default constructor for items of the collection.
         *
         * @type {object}
         */
        defaultConstructor: czrapp.Value,

        initialize: function( options ) {
          $.extend( this, options || {} );

          this._value = {};
          this._deferreds = {};
        },

        /**
         * Get the instance of an item from the collection if only ID is specified.
         *
         * If more than one argument is supplied, all are expected to be IDs and
         * the last to be a function callback that will be invoked when the requested
         * items are available.
         *
         * @see {czrapp.Values.when}
         *
         * @param  {string}   id ID of the item.
         * @param  {...}         Zero or more IDs of items to wait for and a callback
         *                       function to invoke when they're available. Optional.
         * @return {mixed}    The item instance if only one ID was supplied.
         *                    A Deferred Promise object if a callback function is supplied.
         */
        instance: function( id ) {
          if ( arguments.length === 1 )
            return this.value( id );

          return this.when.apply( this, arguments );
        },

        /**
         * Get the instance of an item.
         *
         * @param  {string} id The ID of the item.
         * @return {[type]}    [description]
         */
        value: function( id ) {
          return this._value[ id ];
        },

        /**
         * Whether the collection has an item with the given ID.
         *
         * @param  {string}  id The ID of the item to look for.
         * @return {Boolean}
         */
        has: function( id ) {
          return typeof this._value[ id ] !== 'undefined';
        },

        /**
         * Add an item to the collection.
         *
         * @param {string} id    The ID of the item.
         * @param {mixed}  value The item instance.
         * @return {mixed} The new item's instance.
         */
        add: function( id, value ) {
          if ( this.has( id ) )
            return this.value( id );

          this._value[ id ] = value;
          value.parent = this;

          // Propagate a 'change' event on an item up to the collection.
          if ( value.extended( czrapp.Value ) )
            value.bind( this._change );

          this.trigger( 'add', value );

          // If a deferred object exists for this item,
          // resolve it.
          if ( this._deferreds[ id ] )
            this._deferreds[ id ].resolve();

          return this._value[ id ];
        },

        /**
         * Create a new item of the collection using the collection's default constructor
         * and store it in the collection.
         *
         * @param  {string} id    The ID of the item.
         * @param  {mixed}  value Any extra arguments are passed into the item's initialize method.
         * @return {mixed}  The new item's instance.
         */
        create: function( id ) {
          return this.add( id, new this.defaultConstructor( czrapp.Class.applicator, slice.call( arguments, 1 ) ) );
        },

        /**
         * Iterate over all items in the collection invoking the provided callback.
         *
         * @param  {Function} callback Function to invoke.
         * @param  {object}   context  Object context to invoke the function with. Optional.
         */
        each: function( callback, context ) {
          context = typeof context === 'undefined' ? this : context;

          $.each( this._value, function( key, obj ) {
            callback.call( context, obj, key );
          });
        },

        /**
         * Remove an item from the collection.
         *
         * @param  {string} id The ID of the item to remove.
         */
        remove: function( id ) {
          var value;

          if ( this.has( id ) ) {
            value = this.value( id );
            this.trigger( 'remove', value );
            if ( value.extended( czrapp.Value ) )
              value.unbind( this._change );
            delete value.parent;
          }

          delete this._value[ id ];
          delete this._deferreds[ id ];
        },

        /**
         * Runs a callback once all requested values exist.
         *
         * when( ids*, [callback] );
         *
         * For example:
         *     when( id1, id2, id3, function( value1, value2, value3 ) {} );
         *
         * @returns $.Deferred.promise();
         */
        when: function() {
          var self = this,
            ids  = slice.call( arguments ),
            dfd  = $.Deferred();

          // If the last argument is a callback, bind it to .done()
          if ( $.isFunction( ids[ ids.length - 1 ] ) )
            dfd.done( ids.pop() );

          /*
           * Create a stack of deferred objects for each item that is not
           * yet available, and invoke the supplied callback when they are.
           */
          $.when.apply( $, $.map( ids, function( id ) {
            if ( self.has( id ) )
              return;

            /*
             * The requested item is not available yet, create a deferred
             * object to resolve when it becomes available.
             */
            return self._deferreds[ id ] || $.Deferred();
          })).done( function() {
            var values = $.map( ids, function( id ) {
                return self( id );
              });

            // If a value is missing, we've used at least one expired deferred.
            // Call Values.when again to generate a new deferred.
            if ( values.length !== ids.length ) {
              // ids.push( callback );
              self.when.apply( self, ids ).done( function() {
                dfd.resolveWith( self, values );
              });
              return;
            }

            dfd.resolveWith( self, values );
          });

          return dfd.promise();
        },

        /**
         * A helper function to propagate a 'change' event from an item
         * to the collection itself.
         */
        _change: function() {
          this.parent.trigger( 'change', this );
        }
      });

      // Create a global events bus
      $.extend( czrapp.Values.prototype, czrapp.Events );

})( TCParams, jQuery );//@global TCParams
var czrapp = czrapp || {};
/*************************
* ADD BASE CLASS METHODS
*************************/
(function($, czrapp) {
      var _methods = {
            /**
            * Cache properties on Dom Ready
            * @return {[type]} [description]
            */
            cacheProp : function() {
                  var self = this;
                  $.extend( czrapp, {
                        //cache various jQuery el in czrapp obj
                        $_window         : $(window),
                        $_html           : $('html'),
                        $_body           : $('body'),
                        $_wpadminbar     : $('#wpadminbar'),

                        //cache various jQuery body inner el in czrapp obj
                        $_tcHeader       : $('.tc-header'),

                        //various properties definition
                        localized        : "undefined" != typeof(TCParams) && TCParams ? TCParams : { _disabled: [] },
                        is_responsive    : self.isResponsive(),//store the initial responsive state of the window
                        current_device   : self.getDevice()//store the initial device
                  });
            },

            //bool
            isResponsive : function() {
                  return this.matchMedia(979);
            },

            //@return string of current device
            getDevice : function() {
                  var _devices = {
                        desktop : 979,
                        tablet : 767,
                        smartphone : 480
                      },
                      _current_device = 'desktop',
                      that = this;


                  _.map( _devices, function( max_width, _dev ){
                        if ( that.matchMedia( max_width ) )
                          _current_device = _dev;
                  } );

                  return _current_device;
            },

            matchMedia : function( _maxWidth ) {
                  if ( window.matchMedia )
                    return ( window.matchMedia("(max-width: "+_maxWidth+"px)").matches );

                  //old browsers compatibility
                  $_window = czrapp.$_window || $(window);
                  return $_window.width() <= ( _maxWidth - 15 );
            },

            emit : function( cbs, args ) {
                  cbs = _.isArray(cbs) ? cbs : [cbs];
                  var self = this;
                  _.map( cbs, function(cb) {
                        if ( 'function' == typeof(self[cb]) ) {
                              args = 'undefined' == typeof( args ) ? Array() : args ;
                              self[cb].apply(self, args );
                              czrapp.trigger( cb, _.object( _.keys(args), args ) );
                        }
                  });//_.map
            },

            triggerSimpleLoad : function( $_imgs ) {
                  if ( 0 === $_imgs.length )
                    return;

                  $_imgs.map( function( _ind, _img ) {
                    $(_img).load( function () {
                      $(_img).trigger('simple_load');
                    });//end load
                    if ( $(_img)[0] && $(_img)[0].complete )
                      $(_img).load();
                  } );//end map
            },//end of fn

            isUserLogged     : function() {
                  return czrapp.$_body.hasClass('logged-in') || 0 !== czrapp.$_wpadminbar.length;
            },

            isSelectorAllowed : function( $_el, skip_selectors, requested_sel_type ) {
                  var sel_type = 'ids' == requested_sel_type ? 'id' : 'class',
                  _selsToSkip   = skip_selectors[requested_sel_type];

                  //check if option is well formed
                  if ( 'object' != typeof(skip_selectors) || ! skip_selectors[requested_sel_type] || ! $.isArray( skip_selectors[requested_sel_type] ) || 0 === skip_selectors[requested_sel_type].length )
                    return true;

                  //has a forbidden parent?
                  if ( $_el.parents( _selsToSkip.map( function( _sel ){ return 'id' == sel_type ? '#' + _sel : '.' + _sel; } ).join(',') ).length > 0 )
                    return false;

                  //has requested sel ?
                  if ( ! $_el.attr( sel_type ) )
                    return true;

                  var _elSels       = $_el.attr( sel_type ).split(' '),
                      _filtered     = _elSels.filter( function(classe) { return -1 != $.inArray( classe , _selsToSkip ) ;});

                  //check if the filtered selectors array with the non authorized selectors is empty or not
                  //if empty => all selectors are allowed
                  //if not, at least one is not allowed
                  return 0 === _filtered.length;
            },


            //@return bool
            _isMobile : function() {
                  return ( _.isFunction( window.matchMedia ) && matchMedia( 'only screen and (max-width: 720px)' ).matches ) || ( this._isCustomizing() && 'desktop' != this.previewDevice() );
            },

            //@return bool
            _isCustomizing : function() {
                  return czrapp.$_body.hasClass('is-customizing') || ( 'undefined' !== typeof wp && 'undefined' !== typeof wp.customize );
            },

            //Helpers
            //Check if the passed element(s) contains an iframe
            //@return list of containers
            //@param $_elements = mixed
            _has_iframe : function ( $_elements ) {
                  var that = this,
                      to_return = [];
                  _.each( $_elements, function( $_el, container ){
                        if ( $_el.length > 0 && $_el.find('IFRAME').length > 0 )
                          to_return.push(container);
                  });
                  return to_return;
            },
      };//_methods{}

      czrapp.methods.Base = czrapp.methods.Base || {};
      $.extend( czrapp.methods.Base , _methods );//$.extend

})(jQuery, czrapp);/***************************
* ADD BROWSER DETECT METHODS
****************************/
(function($, czrapp) {
  var _methods =  {
    addBrowserClassToBody : function() {
          // Chrome is Webkit, but Webkit is also Safari. If browser = ie + strips out the .0 suffix
          if ( $.browser.chrome )
              czrapp.$_body.addClass("chrome");
          else if ( $.browser.webkit )
              czrapp.$_body.addClass("safari");
          if ( $.browser.mozilla )
              czrapp.$_body.addClass("mozilla");
          else if ( $.browser.msie || '8.0' === $.browser.version || '9.0' === $.browser.version || '10.0' === $.browser.version || '11.0' === $.browser.version )
              czrapp.$_body.addClass("ie").addClass("ie" + $.browser.version.replace(/[.0]/g, ''));

          //Adds version if browser = ie
          if ( czrapp.$_body.hasClass("ie") )
              czrapp.$_body.addClass($.browser.version);
    }
  };//_methods{}
  czrapp.methods.BrowserDetect = czrapp.methods.BrowserDetect || {};
  $.extend( czrapp.methods.BrowserDetect , _methods );

})(jQuery, czrapp);
var czrapp = czrapp || {};
/***************************
* ADD JQUERY PLUGINS METHODS
****************************/
(function($, czrapp) {
      var _methods = {
            centerImagesWithDelay : function( delay ) {
              var self = this;
              //fire the center images plugin
              setTimeout( function(){ self.emit('centerImages'); }, delay || 300 );
            },


            //IMG SMART LOAD
            //.article-container covers all post / page content : single and list
            //__before_main_wrapper covers the single post thumbnail case
            //.widget-front handles the featured pages
            imgSmartLoad : function() {
              var smartLoadEnabled = 1 == TCParams.imgSmartLoadEnabled,
                  //Default selectors for where are : $( '.article-container, .__before_main_wrapper, .widget-front' ).find('img');
                  _where           = TCParams.imgSmartLoadOpts.parentSelectors.join();

              //Smart-Load images
              //imgSmartLoad plugin will trigger the smartload event when the img will be loaded
              //the centerImages plugin will react to this event centering them
              if (  smartLoadEnabled )
                $( _where ).imgSmartLoad(
                  _.size( TCParams.imgSmartLoadOpts.opts ) > 0 ? TCParams.imgSmartLoadOpts.opts : {}
                );

              //If the centerAllImg is on we have to ensure imgs will be centered when simple loaded,
              //for this purpose we have to trigger the simple-load on:
              //1) imgs which have been excluded from the smartloading if enabled
              //2) all the images in the default 'where' if the smartloading isn't enaled
              //simple-load event on holders needs to be triggered with a certain delay otherwise holders will be misplaced (centering)
              if ( 1 == TCParams.centerAllImg ) {
                var self                   = this,
                    $_to_center            = smartLoadEnabled ?
                       $( _.filter( $( _where ).find('img'), function( img ) {
                          return $(img).is(TCParams.imgSmartLoadOpts.opts.excludeImg.join());
                        }) ): //filter
                        $( _where ).find('img');
                    $_to_center_with_delay = $( _.filter( $_to_center, function( img ) {
                        return $(img).hasClass('tc-holder-img');
                    }) );

                //imgs to center with delay
                setTimeout( function(){
                  self.triggerSimpleLoad( $_to_center_with_delay );
                }, 300 );
                //all other imgs to center
                self.triggerSimpleLoad( $_to_center );
              }
            },


            //FIRE DROP CAP PLUGIN
            dropCaps : function() {
              if ( ! TCParams.dropcapEnabled || ! _.isObject( TCParams.dropcapWhere ) )
                return;

              $.each( TCParams.dropcapWhere , function( ind, val ) {
                if ( 1 == val ) {
                  $( '.entry-content' , 'body.' + ( 'page' == ind ? 'page' : 'single-post' ) ).children().first().addDropCap( {
                    minwords : TCParams.dropcapMinWords,//@todo check if number
                    skipSelectors : _.isObject(TCParams.dropcapSkipSelectors) ? TCParams.dropcapSkipSelectors : {}
                  });
                }
              });//each
            },


            //FIRE EXT LINKS PLUGIN
            //May be add (check if activated by user) external class + target="_blank" to relevant links
            //images are excluded by default
            //links inside post/page content
            extLinks : function() {
              if ( ! TCParams.extLinksStyle && ! TCParams.extLinksTargetExt )
                return;
              $('a' , '.entry-content').extLinks({
                addIcon : TCParams.extLinksStyle,
                newTab : TCParams.extLinksTargetExt,
                skipSelectors : _.isObject(TCParams.extLinksSkipSelectors) ? TCParams.extLinksSkipSelectors : {}
              });
            },

            //FIRE FANCYBOX PLUGIN
            //Fancybox with localized script variables
            fancyBox : function() {
              if ( 1 != TCParams.FancyBoxState || 'function' != typeof($.fn.fancybox) )
                return;

              $("a.grouped_elements").fancybox({
                transitionOut: "elastic",
                transitionIn: "elastic",
                speedIn: 200,
                speedOut: 200,
                overlayShow: !1,
                autoScale: 1 == TCParams.FancyBoxAutoscale ? "true" : "false",
                changeFade: "fast",
                enableEscapeButton: !0
              });

              //replace title by img alt field
              $('a[rel*=tc-fancybox-group]').each( function() {
                var title = $(this).find('img').prop('title');
                var alt = $(this).find('img').prop('alt');
                if (typeof title !== 'undefined' && 0 !== title.length)
                  $(this).attr('title',title);
                else if (typeof alt !== 'undefined' &&  0 !== alt.length)
                  $(this).attr('title',alt);
              });
            },


            /**
            * CENTER VARIOUS IMAGES
            * @return {void}
            */
            centerImages : function() {
              //SLIDER IMG + VARIOUS
              setTimeout( function() {
                //centering per slider
                $.each( $( '.carousel .carousel-inner') , function() {
                  $( this ).centerImages( {
                    enableCentering : 1 == TCParams.centerSliderImg,
                    imgSel : '.czr-item .carousel-image img',
                    oncustom : ['customizr.slid', 'simple_load'],
                    defaultCSSVal : { width : '100%' , height : 'auto' },
                    useImgAttr : true
                  });
                  //fade out the loading icon per slider with a little delay
                  //mostly for retina devices (the retina image will be downloaded afterwards
                  //and this may cause the re-centering of the image)
                  var self = this;
                  setTimeout( function() {
                      $( self ).prevAll('.tc-slider-loader-wrapper').fadeOut();
                  }, 500 );
                });
              } , 50);

              //Featured Pages
              $('.widget-front .thumb-wrapper').centerImages( {
                enableCentering : 1 == TCParams.centerAllImg,
                enableGoldenRatio : false,
                disableGRUnder : 0,//<= don't disable golden ratio when responsive
                zeroTopAdjust : 1,
                leftAdjust : 2.5,
                oncustom : ['smartload', 'simple_load']
              });
              //POST LIST THUMBNAILS + FEATURED PAGES
              //Squared, rounded
              $('.thumb-wrapper', '.hentry' ).centerImages( {
                enableCentering : 1 == TCParams.centerAllImg,
                enableGoldenRatio : false,
                disableGRUnder : 0,//<= don't disable golden ratio when responsive
                oncustom : ['smartload', 'simple_load']
              });

              //rectangulars in post lists
              $('.tc-rectangular-thumb', '.tc-post-list-context' ).centerImages( {
                enableCentering : 1 == TCParams.centerAllImg,
                enableGoldenRatio : true,
                goldenRatioVal : TCParams.goldenRatio || 1.618,
                disableGRUnder : 0,//<= don't disable golden ratio when responsive
                oncustom : ['smartload', 'refresh-height', 'simple_load'] //bind 'refresh-height' event (triggered to the the customizer preview frame)
              });

              //SINGLE POST/PAGE THUMBNAILS
              $('.tc-rectangular-thumb' , '.tc-singular-thumbnail-wrapper').centerImages( {
                enableCentering : 1 == TCParams.centerAllImg,
                enableGoldenRatio : false,
                disableGRUnder : 0,//<= don't disable golden ratio when responsive
                oncustom : ['smartload', 'refresh-height', 'simple_load'], //bind 'refresh-height' event (triggered to the the customizer preview frame)
                setOpacityWhenCentered : true,//will set the opacity to 1
                opacity : 1
              });

              //POST GRID IMAGES
              $('.tc-grid-figure').centerImages( {
                enableCentering : 1 == TCParams.centerAllImg,
                oncustom : ['smartload', 'simple_load'],
                enableGoldenRatio : true,
                goldenRatioVal : TCParams.goldenRatio || 1.618,
                goldenRatioLimitHeightTo : TCParams.gridGoldenRatioLimit || 350
              } );
            },//center_images

            /**
            * PARALLAX
            * @return {void}
            */
            parallax : function() {
              $( '.parallax-item' ).czrParallax(
              {
                parallaxRatio : 0.55
              }
              );
            }
      };//_methods{}

      czrapp.methods.JQPlugins = czrapp.methods.JQPlugins || {};
      $.extend( czrapp.methods.JQPlugins = {} , _methods );

})(jQuery, czrapp);var czrapp = czrapp || {};

/************************************************
* ADD SLIDER METHODS
*************************************************/
(function($, czrapp) {
      var _methods = {

            //INIT
            initOnDomReady : function() {
                  var self = this;

                  // cache jQuery el
                  this.$_sliders = $( 'div[id*="customizr-slider"]' );

                  //@todo EVENT
                  //Recenter the slider arrows on resize
                  czrapp.$_window.resize( function(){
                    self.centerSliderArrows();
                  });
            },



            fireSliders : function(name, delay, hover) {
              //Slider with localized script variables
              var _name   = name || TCParams.SliderName,
                  _delay  = delay || TCParams.SliderDelay;
                  _hover  = hover || TCParams.SliderHover;

              if ( 0 === _name.length )
                return;

              if ( 0 !== _delay.length && ! _hover ) {
                this.$_sliders.czrCarousel({
                    interval: _delay,
                    pause: "false"
                });
              } else if ( 0 !== _delay.length ) {
                this.$_sliders.czrCarousel({
                    interval: _delay
                });
              } else {
                this.$_sliders.czrCarousel();
              }
            },

            parallaxSliders : function() {
              if ( 'function' == typeof $.fn.czrParallax ) {
                $( '.czr-parallax-slider' ).czrParallax();
              }
            },

            manageHoverClass : function() {
              //add a class to the slider on hover => used to display the navigation arrow
              this.$_sliders.hover( function() {
                  $(this).addClass('tc-slid-hover');
                },
                function() {
                  $(this).removeClass('tc-slid-hover');
                }
              );
            },

            //SLIDER ARROWS
            centerSliderArrows : function() {
              if ( 0 === this.$_sliders.length )
                  return;
              this.$_sliders.each( function() {
                  var _slider_height = $( '.carousel-inner' , $(this) ).height();
                  $('.tc-slider-controls', $(this) ).css("line-height", _slider_height +'px').css("max-height", _slider_height +'px');
              });
            },


            //Slider swipe support with hammer.js
            addSwipeSupport : function() {
              if ( 'function' != typeof($.fn.hammer) || 0 === this.$_sliders.length )
                return;

              //prevent propagation event from sensible children
              this.$_sliders.on('touchstart touchmove', 'input, button, textarea, select, a:not(".tc-slide-link")', function(ev) {
                  ev.stopPropagation();
              });

              var _is_rtl = czrapp.$_body.hasClass('rtl');
              this.$_sliders.each( function() {
                  $(this).hammer().on('swipeleft', function() {
                      $(this).czrCarousel( ! _is_rtl ? 'next' : 'prev' );
                  });
                  $(this).hammer().on('swiperight', function(){
                      $(this).czrCarousel( ! _is_rtl ? 'prev' : 'next' );
                  });
              });
            },

            //Has to be fire on load after all other methods
            //@todo understand why...
            sliderTriggerSimpleLoad : function() {
              this.triggerSimpleLoad( this.$_sliders.find('.carousel-inner img') );
            }
      };//methods {}

      czrapp.methods.Slider = {};
      $.extend( czrapp.methods.Slider , _methods );

})(jQuery, czrapp);var czrapp = czrapp || {};

(function($, czrapp) {
      var _methods =  {
            initOnDomReady : function() {
                this.timer = 0;
                this.increment = 1;//used to wait a little bit after the first user scroll actions to trigger the timer
            },//init

            //Event Listener
            eventListener : function() {
                  var self = this;

                  czrapp.$_window.scroll( _.throttle( function() {
                        self.eventHandler( 'scroll' );
                  }, 50 ) );
            },//eventListener


            //Event Handler
            eventHandler : function ( evt ) {
              var self = this;

              switch ( evt ) {
                case 'scroll' :
                  //react to window scroll only when we have the btt-arrow element
                  //I do this here 'cause I plan to pass the btt-arrow option as postMessage in customize
                  if ( 0 === $('.tc-btt-wrapper').length )
                    return;

                  //use a timer
                  if ( this.timer) {
                    this.increment++;
                    clearTimeout(self.timer);
                  }
                  if ( 1 == TCParams.timerOnScrollAllBrowsers ) {
                    this.timer = setTimeout( function() {
                      self.bttArrowVisibility();
                    }, self.increment > 5 ? 50 : 0 );
                  } else if ( czrapp.$_body.hasClass('ie') ) {
                    this.timer = setTimeout( function() {
                      self.bttArrowVisibility();
                    }, self.increment > 5 ? 50 : 0 );
                  }
                break;
              }
            },//eventHandler

            //outline firefox fix, see https://github.com/presscustomizr/customizr/issues/538
            outline: function() {
              if ( czrapp.$_body.hasClass( 'mozilla' ) && 'function' == typeof( tcOutline ) )
                  tcOutline();
            },

            //SMOOTH SCROLL
            smoothScroll: function() {
              if ( TCParams.SmoothScroll && TCParams.SmoothScroll.Enabled )
                smoothScroll( TCParams.SmoothScroll.Options );
            },

            //SMOOTH SCROLL FOR AUTHORIZED LINK SELECTORS
            anchorSmoothScroll : function() {
              if ( ! TCParams.anchorSmoothScroll || 'easeOutExpo' != TCParams.anchorSmoothScroll )
                    return;

              var _excl_sels = ( TCParams.anchorSmoothScrollExclude && _.isArray( TCParams.anchorSmoothScrollExclude.simple ) ) ? TCParams.anchorSmoothScrollExclude.simple.join(',') : '',
                  self = this,
                  $_links = $('a[href^="#"]', '#content').not(_excl_sels);

              //Deep exclusion
              //are ids and classes selectors allowed ?
              //all type of selectors (in the array) must pass the filter test
              _deep_excl = _.isObject( TCParams.anchorSmoothScrollExclude.deep ) ? TCParams.anchorSmoothScrollExclude.deep : null ;
              if ( _deep_excl )
                _links = _.toArray($_links).filter( function ( _el ) {
                  return ( 2 == ( ['ids', 'classes'].filter(
                                function( sel_type) {
                                    return self.isSelectorAllowed( $(_el), _deep_excl, sel_type);
                                } ) ).length
                        );
                });
              $(_links).click( function () {
                var anchor_id = $(this).attr("href");

                //anchor el exists ?
                if ( ! $(anchor_id).length )
                  return;

                if ('#' != anchor_id) {
                    $('html, body').animate({
                        scrollTop: $(anchor_id).offset().top
                    }, 700, TCParams.anchorSmoothScroll);
                }
                return false;
              });//click
            },


            //Btt arrow visibility
            bttArrowVisibility : function () {
              if ( czrapp.$_window.scrollTop() > 100 )
                $('.tc-btt-wrapper').addClass('show');
              else
                $('.tc-btt-wrapper').removeClass('show');
            },//bttArrowVisibility



            //BACK TO TOP
            backToTop : function() {
              var $_html = $("html, body"),
                  _backToTop = function( evt ) {
                    return ( evt.which > 0 || "mousedown" === evt.type || "mousewheel" === evt.type) && $_html.stop().off( "scroll mousedown DOMMouseScroll mousewheel keyup", _backToTop );
                  };

              $(".back-to-top, .tc-btt-wrapper, .btt-arrow").on("click touchstart touchend", function ( evt ) {
                evt.preventDefault();
                evt.stopPropagation();
                $_html.on( "scroll mousedown DOMMouseScroll mousewheel keyup", _backToTop );
                $_html.animate({
                    scrollTop: 0
                }, 1e3, function () {
                    $_html.stop().off( "scroll mousedown DOMMouseScroll mousewheel keyup", _backToTop );
                    //czrapp.$_window.trigger('resize');
                });
              });
            },


            //VARIOUS HOVER ACTION
            widgetsHoverActions : function() {
              $(".widget-front, article").hover(function () {
                  $(this).addClass("hover");
              }, function () {
                  $(this).removeClass("hover");
              });

              $(".widget li").hover(function () {
                  $(this).addClass("on");
              }, function () {
                  $(this).removeClass("on");
              });
            },


            //ATTACHMENT FADE EFFECT
            attachmentsFadeEffect : function() {
              $("article.attachment img").delay(500).animate({
                    opacity: 1
                }, 700, function () {}
              );
            },


            //COMMENTS
            //Change classes of the comment reply and edit to make the whole button clickable (no filters offered in WP to do that)
            clickableCommentButton : function() {
              if ( ! TCParams.HasComments )
                return;

              //edit
              $('cite p.edit-link').each(function() {
                $(this).removeClass('btn btn-success btn-mini');
              });
              $('cite p.edit-link > a').each(function() {
                $(this).addClass('btn btn-success btn-mini');
              });

              //reply
              $('.comment .reply').each(function() {
                $(this).removeClass('btn btn-small');
              });
              $('.comment .reply .comment-reply-link').each(function() {
                $(this).addClass('btn btn-small');
              });
            },


            //DYNAMIC REORDERING
            //Detect layout and reorder content divs
            dynSidebarReorder : function() {
              //Enable reordering if option is checked in the customizer.
              if ( 1 != TCParams.ReorderBlocks )
                return;

              //fire on DOM READY and only for responsive devices
              if ( 'desktop' != this.getDevice() )
                this._reorderSidebars( 'responsive' );

              //fire on custom resize event
              var self = this;
              czrapp.$_body.on( 'tc-resize' , function(e, param) {
                param = _.isObject(param) ? param : {};
                var _to = 'desktop' != param.to ? 'responsive' : 'normal',
                    _current = 'desktop' != param.current ? 'responsive' : 'normal';

                if ( _current != _to )
                  self._reorderSidebars( _to );
              } );
            },


            //Reorder sidebar actions
            _reorderSidebars : function( _sidebarLayout ) {
              _sidebarLayout = _sidebarLayout || 'normal';
              var that = this,
                  LeftSidebarClass    = TCParams.LeftSidebarClass || '.span3.left.tc-sidebar',
                  RightSidebarClass   = TCParams.RightSidebarClass || '.span3.right.tc-sidebar',
                  $_WindowWidth       = czrapp.$_window.width();

              //cache some $
              that.$_content      = that.$_content || $("#main-wrapper .container .article-container");
              that.$_left         = that.$_left || $("#main-wrapper .container " + LeftSidebarClass);
              that.$_right        = that.$_right || $("#main-wrapper .container " + RightSidebarClass);

              // check if we have iframes
              iframeContainers = that._has_iframe( { 'content' : this.$_content, 'left' : this.$_left } ) ;

              var leftIframe    = $.inArray('left', iframeContainers) > -1,
                  contentIframe = $.inArray('content', iframeContainers) > -1;

              //both conain iframes => do nothing
              if ( leftIframe && contentIframe )
                return;

              if ( that.$_left.length ) {
                if ( leftIframe )
                  that.$_content[ _sidebarLayout === 'normal' ?  'insertAfter' : 'insertBefore']( that.$_left );
                else
                  that.$_left[ _sidebarLayout === 'normal' ?  'insertBefore' : 'insertAfter']( that.$_content );
              }
            },

            //Handle dropdown on click for multi-tier menus
            dropdownMenuEventsHandler : function() {
              var $dropdown_ahrefs    = $('.tc-open-on-click .menu-item.menu-item-has-children > a[href!="#"]'),
                  $dropdown_submenus  = $('.tc-open-on-click .dropdown .dropdown-submenu');

              //go to the link if submenu is already opened
              $dropdown_ahrefs.on('tap click', function(evt) {
                if ( ( $(this).next('.dropdown-menu').css('visibility') != 'hidden' &&
                        $(this).next('.dropdown-menu').is(':visible')  &&
                        ! $(this).parent().hasClass('dropdown-submenu') ) ||
                     ( $(this).next('.dropdown-menu').is(':visible') &&
                        $(this).parent().hasClass('dropdown-submenu') ) )
                    window.location = $(this).attr('href');
              });//.on()

              // make sub-submenus dropdown on click work
              $dropdown_submenus.each(function(){
                var $parent = $(this),
                    $children = $parent.children('[data-toggle="dropdown"]');
                $children.on('tap click', function(){
                    var submenu   = $(this).next('.dropdown-menu'),
                        openthis  = false;
                    if ( ! $parent.hasClass('open') ) {
                      openthis = true;
                    }
                    // close opened submenus
                    $($parent.parent()).children('.dropdown-submenu').each(function(){
                        $(this).removeClass('open');
                    });
                    if ( openthis )
                        $parent.addClass('open');

                    return false;
                });//.on()
              });//.each()
            },

            //@return void()
            //simply toggles a "hover" class to the relevant elements
            menuButtonHover : function() {
              var $_menu_btns = $('.btn-toggle-nav');
              //BUTTON HOVER (with handler)
              $_menu_btns.hover(
                function( evt ) {
                  $(this).addClass('hover');
                },
                function( evt ) {
                  $(this).removeClass('hover');
                }
              );
            },


            //Mobile behaviour for the secondary menu
            secondMenuRespActions : function() {
              if ( ! TCParams.isSecondMenuEnabled )
                return;
              //Enable reordering if option is checked in the customizer.
              var userOption = TCParams.secondMenuRespSet || false,
                  that = this;

              //if not a relevant option, abort
              if ( ! userOption || -1 == userOption.indexOf('in-sn') )
                return;

              /* Utils */
              var _cacheElements = function() {
                    //cache some $
                    that.$_sec_menu_els  = $('.nav > li', '.tc-header .nav-collapse');
                    that.$_sn_wrap       = $('.sn-nav', '.sn-nav-wrapper');
                    that.$_sec_menu_wrap = $('.nav', '.tc-header .nav-collapse');
                  },
                  _maybeClean = function() {
                    var $_sep = $( '.secondary-menu-separator' );

                    if ( $_sep.length ) {

                      switch(userOption) {
                          //maybe clean menu items before the separator in sn
                          case 'in-sn-before' :
                            $_sep.prevAll('.menu-item').remove();
                          break;
                          //maybe clean menu items after the separator in sn
                          case 'in-sn-after' :
                            $_sep.nextAll('.menu-item').remove();
                          break;
                      }
                      //remove separator
                      $_sep.remove();
                    }
                  };
              /* end utils */

              //cache some $
              _cacheElements();

              //fire on DOM READY
              var _locationOnDomReady = 'desktop' == this.getDevice() ? 'navbar' : 'side_nav';

              if ( 'desktop' != this.getDevice() )
                this._manageMenuSeparator( _locationOnDomReady , userOption)._moveSecondMenu( _locationOnDomReady , userOption );

              //fire on custom resize event
              czrapp.$_body.on( 'tc-resize partialRefresh.czr', function( ev, param ) {
                    var _force = false;

                    if ( 'partialRefresh' == ev.type && 'czr' === ev.namespace && param.container && param.container.hasClass('tc-header')  ) {
                          //clean old moved elements and separator
                          _maybeClean();
                          //re-cache elements
                          _cacheElements();
                          //setup params for the move to
                          param   = { to: czrapp.current_device, current: czrapp.current_device };
                          //force actions
                          _force  = true;
                    }

                    param = _.isObject(param) ? param : {};
                    var _to = 'desktop' != param.to ? 'side_nav' : 'navbar',
                        _current = 'desktop' != param.current ? 'side_nav' : 'navbar';

                    if ( _current == _to && !_force )
                      return;

                    that._manageMenuSeparator( _to, userOption)._moveSecondMenu( _to, userOption );
              } );//.on()

            },

            _manageMenuSeparator : function( _to, userOption ) {
              //add/remove a separator between the two menus
              var that = this;
              if ( 'navbar' == _to )
                $( '.secondary-menu-separator', that.$_sn_wrap).remove();
              else {
                $_sep = $( '<li class="menu-item secondary-menu-separator"><hr class="featurette-divider"></hr></li>' );

                switch(userOption) {
                  case 'in-sn-before' :
                    this.$_sn_wrap.prepend($_sep);
                  break;

                  case 'in-sn-after' :
                    this.$_sn_wrap.append($_sep);
                  break;
                }
              }
              return this;
            },


            //@return void()
            //@param _where = menu items location string 'navbar' or 'side_nav'
            _moveSecondMenu : function( _where, userOption ) {
              _where = _where || 'side_nav';
              var that = this;
              switch( _where ) {
                  case 'navbar' :
                    that.$_sec_menu_wrap.append(that.$_sec_menu_els);
                  break;

                  case 'side_nav' :
                    if ( 'in-sn-before' == userOption )
                      that.$_sn_wrap.prepend(that.$_sec_menu_els);
                    else
                      that.$_sn_wrap.append(that.$_sec_menu_els);
                  break;
                }
            },

            //Helpers

            //Check if the passed element(s) contains an iframe
            //@return list of containers
            //@param $_elements = mixed
            _has_iframe : function ( $_elements ) {
              var that = this,
                  to_return = [];
              _.map( $_elements, function( $_el, container ){
                if ( $_el.length > 0 && $_el.find('IFRAME').length > 0 )
                  to_return.push(container);
              });
              return to_return;
            }

      };//_methods{}


      czrapp.methods.UserXP = {};
      $.extend( czrapp.methods.UserXP , _methods );
})(jQuery, czrapp);
var czrapp = czrapp || {};
/************************************************
* STICKY HEADER SUB CLASS
*************************************************/
  /*
  * The script uses a placeholder for the sticky-element:
  * - when the "sticky candidate" overlaps the content (e.g. a slider) at the first first scroll
  * a placeholder will be injected. The placeholder has position absolute and its height is set equal to the
  * sticky candidate height when injected, reset to 0 when the fixed element backs to normal state, set again
  * when scrolling down.
  * - when the "sticky candidate" pushes the content, the placeholder is staticaly positioned,
  * it's injected each time the candidate sticks, its height is set equal to the sticky candidate height,
  * and reset when it unsticks.
  *
  * In both cases the placeholder will be our reference to switch from sticky to un-sticky mode
  * and the reference to switch from un-sticky to sticky ONLY in the "overlapping" case. 'Cause in that
  * case the trigger point dynamic computation cannto rely the sticky candidate as its position is
  * fixed or absolute
  * (see _toggleStickyAt() )
  */
(function($, czrapp) {
      var _methods =  {
          initOnDomReady : function() {
            //cache jQuery el
            this.stickyHeaderCacheElements();

            //subclass properties
            this.elToHide         = []; //[ '.social-block' , '.site-description' ],
            this.customOffset     = TCParams.stickyCustomOffset || {};// defaults : { _initial : 0, _scrolling : 0 }

            this.timer            = 0;
            this.increment        = 1;//used to wait a little bit after the first user scroll actions to trigger the timer
            this.triggerHeight    = 20; //0.5 * windowHeight;

            this.scrollingDelay   = 1 != TCParams.timerOnScrollAllBrowsers && czrapp.$_body.hasClass('ie') ? 50 : 5;
          },//init()


          triggerStickyHeaderLoad : function() {
            if ( ! this._is_sticky_enabled() )
              return;

            //LOADING ACTIONS
            czrapp.$_body.trigger( 'sticky-enabled-on-load' , { on : 'load' } );
          },

          stickyHeaderCacheElements : function() {
            //cache jQuery el
            this.$_resetMarginTop = $('#tc-reset-margin-top');
            this.$_sticky_logo    = $('img.sticky', '.site-logo');
            this.logo             = 0 === this.$_sticky_logo.length ? { _logo: $('img:not(".sticky")', '.site-logo') , _ratio: '' }: false;
          },

          stickyHeaderEventListener : function() {
            //LOADING ACTIONS
            var self = this;
            czrapp.$_body.on( 'sticky-enabled-on-load' , function() {
              self.stickyHeaderEventHandler('on-load');
            });//.on()

            //RESIZING ACTIONS
            czrapp.$_window.on( 'tc-resize', function() {
              self.stickyHeaderEventHandler('resize');
            });

            //PARTIAL REFRESH ACTIONS
            czrapp.$_body.on( 'partialRefresh.czr', function( e, placement ) {
                  if ( placement.container && placement.container.hasClass( 'tc-header' )  ) {
                        self.stickyHeaderCacheElements();
                        self.stickyHeaderEventHandler('resize');
                  }
            });

            //SCROLLING ACTIONS
            czrapp.$_window.scroll( function() {
              self.stickyHeaderEventHandler('scroll');
            });

            //SIDENAV ACTIONS => recalculate the top offset on sidenav toggle
            czrapp.$_body.on( czrapp.$_body.hasClass('tc-is-mobile') ? 'touchstart' : 'click' , '.sn-toggle', function() {
              self.stickyHeaderEventHandler('sidenav-toggle');
            });
          },



          stickyHeaderEventHandler : function( evt ) {
            if ( ! this._is_sticky_enabled() )
              return;

            var self = this;

            switch ( evt ) {
              case 'on-load' :
                self._prepare_logo_transition();
                setTimeout( function() {
                  self._sticky_refresh();
                  self._sticky_header_scrolling_actions();
                } , 20 );//setTimeout()
              break;

              case 'scroll' :
                var _delay = 0;

                 //use a timer
                if ( this.timer) {
                  this.increment++;
                  clearTimeout(self.timer);
                }

                if ( this.increment > 5 )
                  //decrease the scrolling trigger delay when smoothscroll on to avoid not catching the scroll when scrolling fast and sticky header not already triggered
                  _delay = ! ( czrapp.$_body.hasClass('tc-smoothscroll') && ! this._is_scrolling() ) ? this.scrollingDelay : 15;

                this.timer = setTimeout( function() {
                    self._sticky_header_scrolling_actions();
                }, _delay );
              break;

              case 'resize' :
              case 'sidenav-toggle' :
                self._set_sticky_offsets();
                self._set_header_top_offset();
                self._set_logo_height();
              break;
            }
          },




          //STICKY HEADER SUB CLASS HELPER (private like)
          _is_scrolling : function() {
            return czrapp.$_body.hasClass('sticky-enabled') ? true : false;
          },

          //STICKY HEADER SUB CLASS HELPER (private like)
          _is_sticky_enabled : function() {
            return czrapp.$_body.hasClass('tc-sticky-header') ? true : false;
          },

          //STICKY HEADER SUB CLASS HELPER (private like)
          _get_top_offset : function() {
            //initialOffset     = ( 1 == isUserLogged &&  580 < $(window).width() ) ? $('#wpadminbar').height() : 0;
            //custom offset : are we scrolling ? => 2 custom top offset values can be defined by users : initial and scrolling
            //make sure custom offset are set and numbers
            var initialOffset   = 0,
                that            = this,
                customOffset    = +this._get_custom_offset( that._is_scrolling() ? '_scrolling' : '_initial' );

            if ( 1 == this.isUserLogged() && ! this._isCustomizing() ) {
              if ( 580 < czrapp.$_window.width() )
                initialOffset = czrapp.$_wpadminbar.height();
              else
                initialOffset = ! this._is_scrolling() ? czrapp.$_wpadminbar.height() : 0;
            }
            return initialOffset + customOffset ;
          },


          //CUSTOM TOP OFFSET
          //return the user defined dynamic or static custom offset
          //custom offset is a localized param that can be passed with the wp filter : tc_sticky_custom_offset
          //its default value is an object : { _initial : 0, _scrolling : 0, options : { _static : true, _element : "" }
          //if _static is set to false and a dom element is provided, then the custom offset will be the calculated height of the element
          _get_custom_offset : function( _context ) {
            //Always check if this.customOffset is well formed
            if ( _.isEmpty( this.customOffset ) )
              return 0;
            if ( ! this.customOffset[_context] )
              return 0;
            if ( ! this.customOffset.options )
              return this.customOffset[_context];

            //always return a static value for the scrolling context;
            if ( '_scrolling' == _context )
              return +this.customOffset[_context] || 0;

            //INITIAL CONTEXT
            //CASE 1 : STATIC
            if ( this.customOffset.options._static )
              return +this.customOffset[_context] || 0;

            var that = this,
                $_el = $(that.customOffset.options._element);

            //CASE 2 : DYNAMIC : based on an element's height
            //does the element exists?
            if ( ! $_el.length )
              return 0;
            else {
              return $_el.outerHeight() || +this.customOffset[_context] || 0;
            }
            return;
          },




          //STICKY HEADER SUB CLASS HELPER (private like)
          _set_sticky_offsets : function() {
            var self = this;

            //Reset all values first
            czrapp.$_tcHeader.css('top' , '');
            czrapp.$_tcHeader.css('height' , 'auto' );
            this.$_resetMarginTop.css('margin-top' , '' ).show();

            //What is the initial offset of the header ?
            var headerHeight    = czrapp.$_tcHeader.outerHeight(true); /* include borders and eventual margins (true param)*/
            //set initial margin-top = initial offset + header's height
            this.$_resetMarginTop.css('margin-top' , + headerHeight  + 'px');
          },

          //STICKY HEADER SUB CLASS HELPER (private like)
          _set_header_top_offset : function() {
            var self = this;
            //set header initial offset
            czrapp.$_tcHeader.css('top' , self._get_top_offset() );
          },

          //STICKY HEADER SUB CLASS HELPER (private like)
          _prepare_logo_transition : function(){
            //do nothing if the browser doesn't support csstransitions (modernizr)
            //or if no logo (includes the case where we have two logos, normal and sticky one)
            if ( ! ( czrapp.$_html.hasClass('csstransitions') && ( this.logo && 0 !== this.logo._logo.length ) ) )
              return;

            var logoW = this.logo._logo.originalWidth(),
                logoH = this.logo._logo.originalHeight();

            //check that all numbers are valid before using division
            if ( 2 != _.size( _.filter( [ logoW, logoH ], function(num){ return _.isNumber( parseInt(num, 10) ) && 0 !== num; } ) ) )
              return;

            this.logo._ratio = logoW / logoH;
            this.logo._logo.css('width' , logoW );
          },

          //STICKY HEADER SUB CLASS HELPER (private like)
          _set_logo_height : function(){
            if ( this.logo && 0 === this.logo._logo.length || ! this.logo._ratio )
              return;
            var self = this;
            this.logo._logo.css('height' , self.logo._logo.width() / self.logo._ratio );

            setTimeout( function() {
                self._set_sticky_offsets();
                self._set_header_top_offset();
            } , 200 );
          },

          _sticky_refresh : function() {
            var self = this;
            setTimeout( function() {
                self._set_sticky_offsets();
                self._set_header_top_offset();
            } , 20 );
            czrapp.$_window.trigger('resize');
          },


          //SCROLLING ACTIONS
          _sticky_header_scrolling_actions : function() {
            this._set_header_top_offset();

            var self = this;
            //process scrolling actions
            if ( czrapp.$_window.scrollTop() > this.triggerHeight ) {
              if ( ! this._is_scrolling() ) {
                czrapp.$_body.addClass("sticky-enabled").removeClass("sticky-disabled")
                             .trigger('tc-sticky-enabled');
                // set the logo height, makes sense just when the logo isn't shrinked
                if ( ! czrapp.$_tcHeader.hasClass('tc-shrink-on') )
                  self._set_logo_height();
              }
            }
            else if ( this._is_scrolling() ){
              czrapp.$_body.removeClass("sticky-enabled").addClass("sticky-disabled")
                           .trigger('tc-sticky-disabled');
              setTimeout( function() { self._sticky_refresh(); } ,
                self._isCustomizing ? 100 : 20
              );
              //additional refresh for some edge cases like big logos
              setTimeout( function() { self._sticky_refresh(); } , 200 );
            }
          }
    };//_methods{}

    czrapp.methods.StickyHeader = {};
    $.extend( czrapp.methods.StickyHeader , _methods );

})(jQuery, czrapp);var czrapp = czrapp || {};
/************************************************
* STICKY FOOTER SUB CLASS
*************************************************/
(function($, czrapp) {
      var _methods =  {
            initOnDomReady : function() {
              this.$_push   = $('#tc-push-footer');
              this._class   = 'sticky-footer-enabled';
              this.$_page   = $('#tc-page-wrap');

              if ( 1 != TCParams.stickyHeader ) {//sticky header fires a resize
                var self = this;
                setTimeout( function() {
                        self._apply_sticky_footer(); }, 50
                );
              }
            },

            /***********************************************
            * DOM EVENT LISTENERS AND HANDLERS
            ***********************************************/
            stickyFooterEventListener : function() {
              var self = this;

              // maybe apply sticky footer on window resize
              czrapp.$_window.on( 'tc-resize', function() {
                self.stickyFooterEventHandler('resize');
              });

              // maybe apply sticky footer on golden ratio applied
              czrapp.$_window.on( 'golden-ratio-applied', function() {
                self.stickyFooterEventHandler('refresh');
              });

              /* can be useful without exposing methods make it react to this event which could be externally fired, used in the preview atm */
              czrapp.$_body.on( 'refresh-sticky-footer', function() {
                self.stickyFooterEventHandler('refresh');
              });

            },

            stickyFooterEventHandler : function( evt ) {
              var self = this;

              if ( ! this._is_sticky_footer_enabled() )
                return;

              switch ( evt ) {
                case 'resize':
                  //to avoid the creation of a function inside a loop
                  //but still allow the access to "this"
                  var func = function() { return self._apply_sticky_footer() ;};
                  for ( var i = 0; i<5; i++ ) /* I've seen something like that in twentyfifteen */
                    setTimeout( func, 50 * i);
                break;
                case 'refresh':
                  this._apply_sticky_footer();
                break;
              }
            },
            /* We apply the "sticky" footer by setting the height of the push div, and adding the proper class to show it */
            _apply_sticky_footer : function() {

              var  _f_height     = this._get_full_height(),
                   _w_height     = czrapp.$_window.height(),
                   _push_height  = _w_height - _f_height,
                   _event        = false;

              if ( _push_height > 0 ) {
                this.$_push.css('height', _push_height).addClass(this._class);
                _event = 'sticky-footer-on';
              }else if ( this.$_push.hasClass(this._class) ) {
                this.$_push.removeClass(this._class);
                _event = 'sticky-footer-off';
              }

              /* Fire an event which something might listen to */
              if ( _event )
                czrapp.$_body.trigger(_event);
            },

            //STICKY HEADER SUB CLASS HELPER (private like)
            /*
            * return @bool: whether apply or not the sticky-footer
            */
            _is_sticky_footer_enabled : function() {
              return czrapp.$_body.hasClass('tc-sticky-footer');
            },


            //STICKY HEADER SUB CLASS HELPER (private like)
            /*
            * return @int: the potential height value of the page
            */
            _get_full_height : function() {
              var _full_height = this.$_page.outerHeight(true) + this.$_page.offset().top,
                  _push_height = 'block' == this.$_push.css('display') ? this.$_push.outerHeight() : 0;

              return _full_height - _push_height;
            }
      };//_methods{}

      czrapp.methods.StickyFooter = {};
      $.extend( czrapp.methods.StickyFooter , _methods );

})(jQuery, czrapp);
var czrapp = czrapp || {};
/************************************************
* SIDE NAV SUB CLASS
*************************************************/
(function($, czrapp) {
      var _methods =  {
            initOnDomReady : function() {
              this.$_sidenav                = $( '#tc-sn' );

              if ( ! this._is_sn_on() )
                return;

              //cache jQuery el
              this.$_page_wrapper           = $('#tc-page-wrap');
              this.$_page_wrapper_node      = this.$_page_wrapper.get(0);
              this.$_page_wrapper_btn       = $('.btn-toggle-nav', '#tc-page-wrap');

              this.$_sidenav_inner          = $( '.tc-sn-inner', this.$_sidenav);

              this._toggle_event            = 'click';// before c4, was czrapp.$_body.hasClass('tc-is-mobile') ? 'touchstart' : 'click';

              this._browser_can_translate3d = ! czrapp.$_html.hasClass('no-csstransforms3d');

              /* Cross browser support for CSS "transition end" event */
              this.transitionEnd            = 'transitionend webkitTransitionEnd otransitionend oTransitionEnd MSTransitionEnd';

              //fire event listener
              this.sideNavEventListener();

              this._set_offset_height();

            },//init()

            /***********************************************
            * DOM EVENT LISTENERS AND HANDLERS
            ***********************************************/
            sideNavEventListener : function() {
              var self = this;

              //BUTTON CLICK/TAP
              czrapp.$_body.on( this._toggle_event, '.sn-toggle', function( evt ) {
                self.sideNavEventHandler( evt, 'toggle' );
              });

              //TRANSITION END
              this.$_page_wrapper.on( this.transitionEnd, function( evt ) {
                self.sideNavEventHandler( evt, 'transitionend' );
              });

              //RESIZING ACTIONS
              czrapp.$_window.on('tc-resize', function( evt ) {
                self.sideNavEventHandler( evt, 'resize');
              });

              czrapp.$_window.scroll( function( evt ) {
                self.sideNavEventHandler( evt, 'scroll');
              });
            },


            sideNavEventHandler : function( evt, evt_name ) {
              var self = this;

              switch ( evt_name ) {
                case 'toggle':
                  // prevent multiple firing of the click event
                  if ( ! this._is_translating() )
                    this._toggle_callback( evt );
                break;

                case 'transitionend' :
                   // react to the transitionend just if translating
                   if ( this._is_translating() && evt.target == this.$_page_wrapper_node )
                     this._transition_end_callback();
                break;

                case 'scroll' :
                case 'resize' :
                  setTimeout( function(){
                      self._set_offset_height();
                  }, 200);
                break;
              }
            },


            _toggle_callback : function ( evt ){
              evt.preventDefault();

              if ( czrapp.$_body.hasClass( 'tc-sn-visible' ) )
                this._anim_type = 'sn-close';
              else
                this._anim_type = 'sn-open';

              //2 cases translation enabled or disabled.
              //=> if translation3D enabled, the _transition_end_callback is fired at the end of anim by the transitionEnd event
              if ( this._browser_can_translate3d ){
                /* When the toggle menu link is clicked, animation starts */
                czrapp.$_body.addClass( 'animating ' + this._anim_type )
                             .trigger( this._anim_type + '_start' );
                if ( this._is_sticky_header() ){
                  /* while animating disable sticky header if not scrolling */
                  if ( czrapp.$_body.hasClass('sticky-disabled') )
                    czrapp.$_body.removeClass('tc-sticky-header');
                }
              } else {
                czrapp.$_body.toggleClass('tc-sn-visible')
                             .trigger( this._anim_type );
              }

              //handles the page wrapper button fade in / out on click
              var _event = evt || event,
                  $_clicked_btn = $( _event.target ),
                  _is_opening   = $('#tc-page-wrap').has( $_clicked_btn).length > 0;

              this.$_page_wrapper_btn.each( function(){
                $(this).fadeTo( 500 , _is_opening ? 0 : 1 , function() {
                  $(this).css( "visibility", _is_opening ? "hidden" : "visible");
                }); //.fadeTo() duration, opacity, callback
              } );
              return false;
           },

           _transition_end_callback : function() {
             czrapp.$_body.removeClass( 'animating ' +  this._anim_type)
                          .toggleClass( 'tc-sn-visible' )
                          .trigger( this._anim_type + '_end' )
                          .trigger( this._anim_type );

             /* on transition end re-set sticky header */
             if ( this._is_sticky_header() ){
               if ( czrapp.$_body.hasClass('sticky-disabled') )
                 czrapp.$_body.addClass('tc-sticky-header');
              }
            },



            /***********************************************
            * HELPERS
            ***********************************************/
            //SIDE NAV SUB CLASS HELPER (private like)
            _is_sn_on : function() {
              return this.$_sidenav.length > 0 ? true : false;
            },

            //SIDE NAV SUB CLASS HELPER (private like)
            _get_initial_offset : function() {
              var _initial_offset = czrapp.$_wpadminbar.length > 0 ? czrapp.$_wpadminbar.height() : 0;
              _initial_offset = _initial_offset && czrapp.$_window.scrollTop() && 'absolute' == czrapp.$_wpadminbar.css('position') ? 0 : _initial_offset;

              return _initial_offset; /* add a custom offset ?*/
            },

            //SIDE NAV SUB CLASS HELPER (private like)
            _set_offset_height : function() {
              var _offset = this._get_initial_offset();

              this.$_sidenav.css('top', _offset );
              this.$_sidenav_inner.css('max-height', this.$_sidenav.outerHeight() - _offset);
            },

            //SIDE NAV SUB CLASS HELPER (private like)
            _is_translating : function() {
              return czrapp.$_body.hasClass('animating');
            },

            //SIDE NAV SUB CLASS HELPER (private like)
            _is_sticky_header : function() {
              this.__is_sticky_header = this.__is_sticky_header || czrapp.$_body.hasClass('tc-sticky-header');
              return this.__is_sticky_header;
            }

      };//_methods{}

      czrapp.methods.SideNav = {};
      $.extend( czrapp.methods.SideNav , _methods );

})(jQuery, czrapp);
var czrapp = czrapp || {};
/************************************************
* DROPDOWNS SUB CLASS
*************************************************/
(function($, czrapp) {
      var _methods =  {
            fireDropDown : function() {
              this.$_sidenav                = $( '#tc-sn' );
              this._dd_first_selector       = '.menu-item-has-children.dropdown > .dropdown-menu' ;
              this.$_nav_collapse           = czrapp.$_tcHeader.length > 0 ? czrapp.$_tcHeader.find( '.navbar-wrapper .nav-collapse' ) : [];
              this.$_nav                    = this.$_nav_collapse.length ? this.$_nav_collapse.find( '.nav' ) : [];

              if ( ! this._has_dd_to_move() )
                return;

              //cache jQuery el
              this.$_navbar_wrapper         = this.$_nav_collapse.closest( '.navbar-wrapper' );
              this.$_nav                    = this.$_nav_collapse.find( '.nav' );
              this.$_head                   = $( 'head' );

              //other useful vars
              this._dyn_style_id            = 'tc-dropdown-dyn-style';
              this._prop                    = czrapp.$_body.hasClass('rtl') ? 'right' : 'left';

              //fire event listener
              this.dropdownPlaceEventListener();

              //place dropdowns on init
              this._place_dropdowns();
            },//init()


            dropdownPlaceCacheElements : function() {
              //cache jQuery el
              this.$_nav_collapse           = czrapp.$_tcHeader.length > 0 ? czrapp.$_tcHeader.find( '.navbar-wrapper .nav-collapse' ) : [];
              this.$_nav                    = this.$_nav_collapse.length ? this.$_nav_collapse.find( '.nav' ) : [];
              this.$_navbar_wrapper         = this.$_nav_collapse.length ? this.$_nav_collapse.closest( '.navbar-wrapper' ) : [];
            },

            /***********************************************
            * DOM EVENT LISTENERS AND HANDLERS
            ***********************************************/
            dropdownPlaceEventListener : function() {
                  var self    = this,
                      _events = 'tc-resize sn-open sn-close tc-sticky-enabled tc-place-dropdowns partialRefresh.czr';

                  //Any event which may have resized the header
                  czrapp.$_body.on( _events, function( evt, data ) {
                        if ( 'partialRefresh' === evt.type && 'czr' === evt.namespace && data.container && data.container.hasClass( 'tc-header' )  ) {
                              self.dropdownPlaceCacheElements();
                        }
                        self.dropdownPlaceEventHandler( evt, 'resize' );
                  });
            },


            dropdownPlaceEventHandler : function( evt, evt_name ) {
              var self = this;

              switch ( evt_name ) {
                case 'resize' :
                  setTimeout( function(){
                    self._place_dropdowns();
                  }, 250);
                break;
              }
            },


            _place_dropdowns : function () {
              var _dd = this._get_dd_to_move();
              if ( ! _dd.length )
                return;

              this._staging();
              this._move_dropdown( _dd );
              this._write_dyn_style();
              this._unstaging();
            },



            /***********************************************
            * HELPERS
            ***********************************************/
            //DROPDOWN PLACE SUB CLASS HELPER (private like)
            //When checking if there's something to move does not make sense at the start
            //1) there's no navbar collapse in the header
            //2) there are no dropdowns to move in the header
            _has_dd_to_move : function() {
              if ( this.$_nav_collapse.length < 1 )
                return false;
              if ( this.$_nav.length && this.$_nav.find( this._dd_first_selector ) < 1 )
                return false;

              return true;
            },

            //DROPDOWN PLACE SUB CLASS HELPER (private like)
            //returns the dropdowns to move on resize?
            //a) when the nav-collapse is not absolute => we're not in mobile menu case => no dd to move
            //b) .tc-header .nav is hidden (case: second menu hidden in mobiles ) => no dd to move
            //c) return the .tc-header .nav dropdown children
            _get_dd_to_move : function() {
              if ( 'absolute' == this.$_nav_collapse.css('position') )
                return {};
              if ( ! this.$_nav.is(':visible') )
                return {};
              return this.$_nav.find( this._dd_first_selector );
            },

            //DROPDOWN PLACE SUB CLASS HELPER (private like)
            //Prepare the environment
            //What we do here:
            //1) we 'suspend' the transitions on submenus
            //2) we add a dynamic style which:
            // a) sets the max width of the dropdown to the window's width
            // b) allows braking words for submenus label
            _staging : function() {
              this._window_width = czrapp.$_window.width();
              //remove submenu fade, transitions corrupt the offset computing
              if ( this.$_navbar_wrapper.hasClass('tc-submenu-fade') )
                // tc-submenu-fade-susp(ended) is a dummy class we add for the future check in _unstaging
                this.$_navbar_wrapper.removeClass('tc-submenu-fade').addClass('tc-submenu-fade-susp');
              var _max_width            = this._window_width - 40,
                  _dyn_style_css_prefix = '.tc-header .nav-collapse .dropdown-menu';

              //the max width of a drodpdown must be the window's width (- 40px aesthetical )
              this._dyn_style  = _dyn_style_css_prefix + ' {max-width: ' + _max_width + 'px;}';
              //following is to ensure that big labels are broken in more lines if they exceed the max width
              //probably due to a bug, white-space: pre; doesn't work fine in recent firefox.
              //Anyway this just means that the following rule (hence the prev) for them is useless => doesn't introduce a bug
              //p.s. this could be moved in our main CSS
              this._dyn_style += _dyn_style_css_prefix + ' > li > a { word-wrap: break-word; white-space: pre; }';
              this._write_dyn_style();
            },

            //DROPDOWN PLACE SUB CLASS HELPER (private like)
            //Reset temporary changes to the environment performed in the staging phase
            //What we do here:
            //1) Re-add the transitions on submenus if needed
            _unstaging : function() {
              //re-add submenu fade, transitions corrupt the offset computing
              if ( this.$_navbar_wrapper.hasClass('tc-submenu-fade-susp') )
                this.$_navbar_wrapper.removeClass('tc-submenu-fade-susp').addClass('tc-submenu-fade');
            },

            //DROPDOWN PLACE SUB CLASS HELPER (private like)
            //Write the dynamic style into the HEAD
            _write_dyn_style : function() {
              var $_dyn_style_el = this.$_head.find('#' + this._dyn_style_id);

              //there's already a _dyn_style_el, so remove it
              //I thought that remove/create a new element every time is worse than just have an empty style, but looks like that $_dyn_style_el.html( _dyn_style ) isnt' cross-browser, gives me errors in ie8
              if ( $_dyn_style_el.length > 0 )
                $_dyn_style_el.remove();
              if ( this._dyn_style )
                // I would have loved ot use getOverrideStyle, but couldn't get it to work -> Error: getOverrideStyle is not a function
                // I'm probabably missing something. Ref: http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration
                // probably not very supported by browsers?
                // getOverrideStyle($_dropdown[0], ':before');
                $("<style type='text/css' id='" + this._dyn_style_id +"'>" + this._dyn_style + "</style>")
                  .appendTo( this.$_head );
            },

            //DROPDOWN PLACE SUB CLASS HELPER (private like)
            // Moving dropdown core
            _move_dropdown : function( $dropdown_menu ) {
              // does dropdown_menu element exists?
              if ( $dropdown_menu && $dropdown_menu.length ) {
                if ( $dropdown_menu.length > 1 ) {
                  var self = this;
                  // is $dropdown_menu an array of elements ? if yes call this function over them
                  $.each( $dropdown_menu, function(){
                    self._move_dropdown( $(this) );
                  });
                  return;
                }//end array of dropdown case
              }else //no dropdown
                return;
              // Moving core
              var _is_dropdown_visible = $dropdown_menu.is(':visible');
              if ( ! _is_dropdown_visible )
                $dropdown_menu.css('display', 'block').css('visibility', 'hidden');

              //first thing to do; reset all changes why?
              //example, say the last menu item has a submenu which has been moved when window's width == 1200px,
              //then the window is shrinked to 1000px and the last menu item drops on a new line. In this case :
              //a) the "moving" might not be needed anymore 'cause it might not overflows the window
              //b) even worse, the "moving" might have made it overflow on the opposite side.
              this._set_dropdown_offset( $dropdown_menu, '' );
              //get the current overflow
              var _overflow     = this._get_dropdown_overflow( $dropdown_menu );

              if ( _overflow )
                this._set_dropdown_offset( $dropdown_menu, _overflow );

              //move all the childrens (1st level of children ) which are dropdowns
              var $_children_dropdowns = $dropdown_menu.children('li.dropdown-submenu');
                if ( $_children_dropdowns.length )
                  this._move_dropdown( $_children_dropdowns.children('ul.dropdown-menu') );

              //reset 'visibility-manipulation'
              if ( ! _is_dropdown_visible )
                $dropdown_menu.css('display', '').css('visibility', '');
            },

            //DROPDOWN PLACE SUB CLASS HELPER (private like)
            //Set dropdown offset + first dropdown level top arrow offset accordingly
            _set_dropdown_offset : function( $dropdown_menu, _dropdown_overflow ) {
              var _offset = '';

              if ( _dropdown_overflow ) {
                var $_parent_dropdown  = $dropdown_menu.parent('.menu-item-has-children'),
                    _is_dropdown_submenu = $_parent_dropdown.hasClass('dropdown-submenu');

                //is submenu 2nd level?
                if ( _is_dropdown_submenu ) {
                  _offset = parseFloat( $dropdown_menu.css( this._prop ) ) - _dropdown_overflow - 5;
                  //does the parent menu item have "brothers" after it? in this case be sure the new position will
                  //not make it completely overlap parent menu item sibling. We can left 30px of space so
                  //the user can access the sibling menu item.
                  //So the condition are:
                  //1) the parent menu item has siblings
                  //and
                  //2) there's a space < 30px between the starting edges of the parent and child dropdown
                  //or
                  //2.1) there's a space < 30px between the ending edges of the parent and child dropdown
                  if ( $_parent_dropdown.next('.menu-item').length ) {
                    var _submenu_overflows_parent = this._get_element_overflow( $dropdown_menu, _offset, $_parent_dropdown );
                    if ( _offset < 30  || _submenu_overflows_parent < 30 )
                      //the new offset is then the old one minus the amount of overflow (ex. in ltr align parent and child right edge ) minus 30px
                      _offset = _offset - _submenu_overflows_parent - 30;
                  }
                } else {
                  _offset = -20 - _dropdown_overflow; //add some space (20px) on the right(rtl-> left)
                  // when is dropdown first level we need to move the top arrow
                  // we need the menu-item-{id} class to build the css rule
                  var _menu_id = $_parent_dropdown.attr('class').match(/(menu|page)-item-\d+/);
                  _menu_id = _menu_id ? _menu_id[0] : null;
                  if ( _menu_id )
                    this._set_dropdown_arrow_style( _menu_id, _offset );
                }
              }
              //in any case write the dropdown offset css:
              //a dropdown which doesn't have to be moved will not be passed to this function, so no problem. The only case when this is needed is when we reset the dropdowns offset before checking whether or not we have to move it, Maybe we can fine tune this adding a css class to the moved dropdowns so we'll reset just them.
              $dropdown_menu.css( this._prop, _offset );
            },

            //DROPDOWN PLACE SUB CLASS HELPER (private like)
            //compute the dropdown overflow
            _get_dropdown_overflow : function ( $dropdown_menu ) {
              var overflow = null,
                  _t_overflow;
               // how we compute the overflow
               // ltr
               if ( 'left' == this._prop ) {
                 // the overlfow is: the absolute position left/right of the elemnt + its width - the window's width
                 // so it represents the amount of "width" which overflows the window
                 _t_overflow = this._get_element_overflow( $dropdown_menu, $dropdown_menu.offset().left, {}, this._window_width );
                 // a positive overflow means that the dropdown goes off the window
                 // anyways I decided to adjust its position even if the gap between the end of the dropdown
                // and the window's width is < 5 (6), just to avoid dropdown edges so close to the end of the window
                overflow = _t_overflow > -5 ? _t_overflow : overflow ;
              }else { // rtl
                //the overflow is: the left offset * -1 if less than 5px
                //note: jQuery.offset() gives just top and left properties.
                _t_overflow = $dropdown_menu.offset().left;
                overflow  = _t_overflow < 5 ? -1 * _t_overflow : overflow;
              }
                return overflow;
            },
            //DROPDOWN PLACE SUB CLASS HELPER (private like)
            //compute the overflow of an element given a parent an an initial left offset
            _get_element_overflow : function ( $_el, _offset, $_parent, _parent_width ) {
              _parent_width = $_parent.length ? $_parent.width() : _parent_width;
              return $_el.width() + _offset - _parent_width;
            },
            //DROPDOWN PLACE SUB CLASS HELPER (private like)
            //compute and set the dropdown first level top arrow offset
            //which is the original offset for the pseudo element before and after minus the
            //shift amount applied to the dropdown
            _set_dropdown_arrow_style : function( _menu_id, _offset ) {
              //9px is static to avoid using the following via javascript
              //window.getComputedStyle($_dropdown[0], ':before').left ;
              var _arrow_before_offset    = +9 - _offset,
                  _arrow_after_offset     = _arrow_before_offset + 1,
                  _arrow_css_rule_prefix  = '.tc-header .navbar .nav > .' + _menu_id + ' > .dropdown-menu',

                 _arrow_before_css_rule  = _arrow_css_rule_prefix + ":before { " + this._prop + ": " + _arrow_before_offset + "px;}",
                 _arrow_after_css_rule   = _arrow_css_rule_prefix + ":after { " + this._prop + ": " + _arrow_after_offset + "px;}";

              this._dyn_style += "\n" + _arrow_before_css_rule + "\n" + _arrow_after_css_rule;
            }
      };//_methods{}

      czrapp.methods.Dropdowns = {};
      $.extend( czrapp.methods.Dropdowns , _methods );

})(jQuery, czrapp);var czrapp = czrapp || {};
//@global TCParams
/************************************************
* LET'S DANCE
*************************************************/
( function ( czrapp, $, _ ) {
      //adds the server params to the app now
      czrapp.localized = TCParams || {};

      //add the events manager object to the root
      $.extend( czrapp, czrapp.Events );

      //defines a Root class
      //=> adds the constructor options : { id : ctor name, dom_ready : params.ready || [] }
      //=> declares a ready() methods, fired on dom ready
      czrapp.Root           = czrapp.Class.extend( {
            initialize : function( options ) {
                  $.extend( this, options || {} );
                  this.isReady = $.Deferred();
            },

            //On DOM ready, fires the methods passed to the constructor
            //Populates a czrapp.status array allowing us to remotely check the current app state
            ready : function() {
                  var self = this;
                  if ( self.dom_ready && _.isArray( self.dom_ready ) ) {
                        czrapp.status = czrapp.status || [];
                        _.each( self.dom_ready , function( _m_ ) {
                              if ( ! _.isFunction( _m_ ) && ! _.isFunction( self[_m_]) ) {
                                    czrapp.status.push( 'Method ' + _m_ + ' was not found and could not be fired on DOM ready.');
                                    return;
                              }
                              try { ( _.isFunction( _m_ ) ? _m_ : self[_m_] ).call( self ); } catch( er ){
                                    czrapp.status.push( [ 'NOK', self.id + '::' + _m_, _.isString( er ) ? czrapp._truncate( er ) : er ].join( ' => ') );
                                    return;
                              }
                        });
                  }
                  this.isReady.resolve();
            }
      });

      czrapp.Base           = czrapp.Root.extend( czrapp.methods.Base );

      //is resolved on 'czrapp-ready', which is triggered when
      //1) the initial map method has been instantiated
      //2) all methods have been fired on DOM ready;
      czrapp.ready          = $.Deferred();
      czrapp.bind( 'czrapp-ready', function() {
            czrapp.ready.resolve();
      });

      //SERVER MOBILE USER AGENT
      czrapp.isMobileUserAgent = new czrapp.Value( false );
      //This ajax requests solves the problem of knowing if wp_is_mobile() in a front js script, when the website is using a cache plugin
      //without a cache plugin, we could localize the wp_is_mobile() boolean
      //with a cache plugin, we need to always get a fresh answer from the server
      //falls back on TCParams.isWPMobile ( which can be cached, so not fully reliable )
      // czrapp.browserAgentSet = $.Deferred( function() {
      //       var _dfd = this;
      //       czrapp.doAjax( { action: "hu_wp_is_mobile" } )
      //             .always( function( _r_ ) {
      //                   czrapp.isMobileUserAgent( ( ! _r_.success || _.isUndefined( _r_.data.is_mobile ) ) ? ( '1' == TCParams.isWPMobile ) : _r_.data.is_mobile );
      //                   _dfd.resolve( czrapp.isMobileUserAgent() );
      //             });
      //       //always auto resolve after 1.5s if the server is too slow.
      //       _.delay( function() {
      //           if ( 'pending' == _dfd.state() )
      //             _dfd.resolve( false );
      //       }, 1500 );
      // });

      //THE DEFAULT MAP
      //Other methods can be hooked. @see czrapp.customMap
      var appMap = {
                base : {
                      ctor : czrapp.Base,
                      ready : [
                            'cacheProp'
                      ]
                },
                browserDetect : {
                      ctor : czrapp.Base.extend( czrapp.methods.BrowserDetect ),
                      ready : [ 'addBrowserClassToBody' ]
                },
                jqPlugins : {
                      ctor : czrapp.Base.extend( czrapp.methods.JQPlugins ),
                      ready : [
                            'centerImagesWithDelay',
                            'imgSmartLoad',
                            'dropCaps',
                            'extLinks',
                            'fancyBox',
                            'parallax'
                      ]
                },
                slider : {
                      ctor : czrapp.Base.extend( czrapp.methods.Slider ),
                      ready : [
                            'initOnDomReady',
                            'fireSliders',
                            'parallaxSliders',
                            'manageHoverClass',
                            'centerSliderArrows',
                            'addSwipeSupport',
                            'sliderTriggerSimpleLoad'
                      ]
                },
                dropdowns : {
                      ctor : czrapp.Base.extend( czrapp.methods.Dropdowns ),
                      ready : [ 'fireDropDown' ]
                },

                userXP : {
                      ctor : czrapp.Base.extend( czrapp.methods.UserXP ),
                      ready : [
                            'initOnDomReady',
                            'eventListener',
                            'outline',
                            'smoothScroll',
                            'anchorSmoothScroll',
                            'backToTop',
                            'widgetsHoverActions',
                            'attachmentsFadeEffect',
                            'clickableCommentButton',
                            'dynSidebarReorder',
                            'dropdownMenuEventsHandler',
                            'menuButtonHover',
                            'secondMenuRespActions'
                      ]
                },
                stickyHeader : {
                      ctor : czrapp.Base.extend( czrapp.methods.StickyHeader ),
                      ready : [
                            'initOnDomReady',
                            'stickyHeaderEventListener',
                            'triggerStickyHeaderLoad'
                      ]
                },
                stickyFooter : {
                      ctor : czrapp.Base.extend( czrapp.methods.StickyFooter ),
                      ready : [
                            'initOnDomReady',
                            'stickyFooterEventListener'
                      ]
                },
                sideNav : {
                      ctor : czrapp.Base.extend( czrapp.methods.SideNav ),
                      ready : [
                            'initOnDomReady'
                      ]
                }
      };//map

      //Instantiates
      var _instantianteAndFireOnDomReady = function( newMap, previousMap, isInitial ) {
            if ( ! _.isObject( newMap ) )
              return;
            _.each( newMap, function( params, name ) {
                  //skip if already instantiated or invalid params
                  if ( czrapp[ name ] || ! _.isObject( params ) )
                    return;

                  params = _.extend(
                        {
                              ctor : {},//should extend czrapp.Base with custom methods
                              ready : [],//a list of method to execute on dom ready,
                              options : {}//can be used to pass a set of initial params to set to the constructors
                        },
                        params
                  );

                  //the constructor has 2 mandatory params : id and dom_ready methods
                  var ctorOptions = _.extend(
                      {
                          id : name,
                          dom_ready : params.ready || []
                      },
                      params.options
                  );

                  try { czrapp[ name ] = new params.ctor( ctorOptions ); }
                  catch( er ) {
                        czrapp.errorLog( 'Error when loading ' + name + ' | ' + er );
                  }
            });

            //Fire on DOM ready
            $(function ($) {
                  _.each( newMap, function( params, name ) {
                        //bail if already fired
                        if ( czrapp[ name ] && czrapp[ name ].isReady && 'resolved' == czrapp[ name ].isReady.state() )
                          return;
                        if ( _.isObject( czrapp[ name ] ) && _.isFunction( czrapp[ name ].ready ) ) {
                              czrapp[ name ].ready();
                        }
                  });
                  czrapp.status = czrapp.status || 'OK';
                  if ( _.isArray( czrapp.status ) ) {
                        _.each( czrapp.status, function( error ) {
                              czrapp.errorLog( error );
                        });
                  }
                  //trigger czrapp-ready when the default map has been instantiated
                  czrapp.trigger( isInitial ? 'czrapp-ready' : 'czrapp-updated' );
            });
      };//_instantianteAndFireOnDomReady()

      //instantiates the default map
      //@param : new map, previous map, isInitial bool
      _instantianteAndFireOnDomReady( appMap, null, true );

      //instantiate additional classes on demand
      //EXAMPLE IN THE PRO HEADER SLIDER PHP TMPL :
      //instantiate on first run, then on the following runs, call fire statically
      // var _do = function() {
      //       if ( czrapp.proHeaderSlid ) {
      //             czrapp.proHeaderSlid.fire( args );
      //       } else {
      //             var _map = $.extend( true, {}, czrapp.customMap() );
      //             _map = $.extend( _map, {
      //                   proHeaderSlid : {
      //                         ctor : czrapp.Base.extend( czrapp.methods.ProHeaderSlid ),
      //                         ready : [ 'fire' ],
      //                         options : args
      //                   }
      //             });
      //             //this is listened to in xfire.js
      //             czrapp.customMap( _map );
      //       }
      // };
      // if ( ! _.isUndefined( czrapp ) && czrapp.ready ) {
      //       if ( 'resolved' == czrapp.ready.state() ) {
      //             _do();
      //       } else {
      //             czrapp.ready.done( _do );
      //       }
      // }
      czrapp.customMap = new czrapp.Value( {} );
      czrapp.customMap.bind( _instantianteAndFireOnDomReady );//<=THE CUSTOM MAP IS LISTENED TO HERE

})( czrapp, jQuery, _ );/****************************************************************
* FORMER HARD CODED SCRIPTS MADE ENQUEUABLE WITH LOCALIZED PARAMS
*****************************************************************/
(function($, czrapp, _ ) {
    //czrapp.localized = TCParams
    czrapp.ready.then( function() {
          var pluginCompatParams = ( czrapp.localized && czrapp.localized.pluginCompats ) ? czrapp.localized.pluginCompats : {},
              frontHelpNoticeParams = ( czrapp.localized && czrapp.localized.frontHelpNoticeParams ) ? czrapp.localized.frontHelpNoticeParams : {};

          //PARALLAX SLIDER
          $( function( $ ) {
                if ( czrapp.localized.isParallaxOn ) {
                      $( '.czr-parallax-slider' ).czrParallax( { parallaxRatio : czrapp.localized.parallaxRatio || 0.55 } );
                }
          });

          //PLUGIN COMPAT
          //Optimize Press
          if ( pluginCompatParams.optimizepress_compat && pluginCompatParams.optimizepress_compat.remove_fancybox_loading ) {
                if (typeof(opjq) !== 'undefined') {
                      opjq(document).ready( function() {
                          opjq('#fancybox-loading').remove();
                      } );
                }
          }

          //PLACEHOLDER NOTICES
          //two types of notices here :
          //=> the ones that remove the notice only : thumbnails, smartload, sidenav, secondMenu, mainMenu
          //=> and others that removes notices + an html block ( slider, fp ) or have additional treatments ( widget )
          // each placeholder item looks like :
          // {
          // 'thumbnail' => array(
          //        'active'    => true,
          //        'args'  => array(
          //            'action' => 'dismiss_thumbnail_help',
          //            'nonce' => array( 'id' => 'thumbnailNonce', 'handle' => 'tc-thumbnail-help-nonce' ),
          //            'class' => 'tc-thumbnail-help'
          //        )
          //    ),
          // }
          if ( czrapp.localized.frontHelpNoticesOn && ! _.isEmpty( frontHelpNoticeParams ) ) {
                // @_el : dom el
                // @_params_ looks like :
                // {
                //       action : '',
                //       nonce : { 'id' : '', 'handle' : '' },
                //       class : '',
                // }
                // Fired on click
                // Attempt to fire an ajax call
                var _doAjax = function( _query_ ) {
                          var ajaxUrl = czrapp.localized.adminAjaxUrl, dfd = $.Deferred();
                          $.post( ajaxUrl, _query_ )
                                .done( function( _r ) {
                                      // Check if the user is logged out.
                                      if ( '0' === _r ||  '-1' === _r )
                                        czrapp.errorLog( 'placeHolder dismiss : ajax error for : ', _query_.action, _r );
                                })
                                .fail( function( _r ) {
                                      czrapp.errorLog( 'placeHolder dismiss : ajax error for : ', _query_.action, _r );
                                })
                                .always( function() {
                                      dfd.resolve();
                                });
                          return dfd.promise();
                    },
                    //@remove_action optional removal action server side. Ex : 'remove_slider'
                    _ajaxDismiss = function( _params_ ) {
                          var _query = {},
                              dfd = $.Deferred();

                          if ( ! _.isObject( _params_ ) ) {
                                czrapp.errorLog( 'placeHolder dismiss : wrong params' );
                                return;
                          }

                          //normalizes
                          _params_ = _.extend( {
                                action : '',
                                nonce : { 'id' : '', 'handle' : '' },
                                class : '',
                                remove_action : null,//for slider and fp
                                position : null,//for widgets
                          }, _params_ );

                          //set query params
                          _query.action = _params_.action;

                          //for slider and fp
                          if ( ! _.isNull( _params_.remove_action ) )
                            _query.remove_action = _params_.remove_action;

                          //for widgets
                          if ( ! _.isNull( _params_.position ) )
                            _query.position = _params_.position;

                          _query[ _params_.nonce.id ] = _params_.nonce.handle;

                          //fires and resolve promise
                          _doAjax( _query ).done( function() { dfd.resolve(); });
                          return dfd.promise();
                    };


                //loop on the front help notice params sent by server
                _.each( frontHelpNoticeParams, function( _params_, _id_ ) {
                      //normalizes
                      _params_ = _.extend( {
                            active : false,
                            args : {
                                  action : '',
                                  nonce : { 'id' : '', 'handle' : '' },
                                  class : '',
                                  remove_action : null,//for slider and fp
                                  position : null,//for widgets
                            }
                      }, _params_ );

                      switch( _id_ ) {
                            //simple dismiss
                            case 'thumbnail' :
                            case 'smartload' :
                            case 'sidenav' :
                            case 'secondMenu' :
                            case 'mainMenu' :
                                  if ( _params_.active ) {
                                        //DOM READY
                                        $( function($) {
                                              $( '.tc-dismiss-notice', '.' + _params_.args.class ).click( function( ev ) {
                                                    ev.preventDefault();
                                                    var $_el = $(this);
                                                    _ajaxDismiss( _params_.args ).done( function() {
                                                          $_el.closest('.' + _params_.args.class ).slideToggle( 'fast' );
                                                    });
                                              } );
                                        } );
                                  }
                            break;

                            //specific dismiss
                            case 'slider' :
                                  if ( _params_.active ) {
                                        //DOM READY
                                        $( function($) {
                                              $('.tc-dismiss-notice', '.' + _params_.args.class ).click( function( ev ) {
                                                    ev.preventDefault();
                                                    var $_el = $(this);
                                                    _params_.args.remove_action = 'remove_notice';
                                                    _ajaxDismiss( _params_.args ).done( function() {
                                                          $_el.closest( '.' + _params_.args.class ).slideToggle('fast');
                                                    });
                                              } );
                                              $('.tc-inline-remove', '.' + _params_.args.class ).click( function( ev ) {
                                                    ev.preventDefault();
                                                    _params_.args.remove_action = 'remove_slider';
                                                    _ajaxDismiss( _params_.args ).done( function() {
                                                          $( 'div[id*="customizr-slider"]' ).fadeOut('slow');
                                                    });

                                              } );
                                        } );
                                  }
                            break;
                            case 'fp' :
                                  if ( _params_.active ) {
                                        //DOM READY
                                        $( function($) {
                                              $('.tc-dismiss-notice', '.' + _params_.args.class ).click( function( ev ) {
                                                    ev.preventDefault();
                                                    var $_el = $(this);
                                                    _params_.args.remove_action = 'remove_notice';
                                                    _ajaxDismiss(  _params_.args ).done( function() {
                                                          $_el.closest( '.' + _params_.args.class ).slideToggle('fast');
                                                    });
                                              } );
                                              $('.tc-inline-remove', '.' + _params_.args.class ).click( function( ev ) {
                                                    ev.preventDefault();
                                                    _params_.args.remove_action = 'remove_fp';
                                                    _ajaxDismiss( _params_.args ).done( function() {
                                                          $('#main-wrapper > .marketing').fadeOut('slow');
                                                    });

                                              } );
                                        } );
                                  }
                            break;
                            case 'widget' :
                                  if ( _params_.active ) {
                                        //DOM READY
                                        $( function($) {
                                              $('.tc-dismiss-notice, .tc-inline-dismiss-notice').click( function( ev ) {
                                                    ev.preventDefault();
                                                    var $_el = $(this);
                                                    var _position = $_el.attr('data-position');
                                                    if ( ! _position || ! _position.length )
                                                      return;

                                                     _params_.args.position = _position;
                                                    _ajaxDismiss(  _params_.args ).done( function() {
                                                          if ( 'sidebar' == _position )
                                                            $('.tc-widget-placeholder' , '.tc-sidebar').slideToggle('fast');
                                                          else
                                                            $_el.closest('.tc-widget-placeholder').slideToggle('fast');
                                                    });
                                              } );
                                        } );
                                  }
                            break;
                      }//switch
                });//_.each()
          }//if czrapp.localized.frontHelpNoticesOn && ! _.isEmpty( frontHelpNoticeParams
    });

})(jQuery, czrapp, _ );