;(function($, window, undefined){
	var Dialog;

	Dialog = (function(){
		function Dialog(options){
			this.settings = $.extend({}, $.fn.dialog.defaults, options);
			this.init();
		}

		Dialog.prototype = {
			init: function() {
				var _self = this;
				_self.create();
			}, 
			create: function() {
				var _self = this;
				// HTML
				if (!_self.settings.title) {
					var hd = '';
				} else {
					var hd = '<div class="hd">' + _self.settings.title + '</div>'
				}
				var templates ='<div class="dialog-mask">'
					+ '<div class="z-dialog">' 
					+ hd
					+ '<div class="bd">' 
					+ _self.settings.content
					+ '</div>'
					+ '<div class="ft">'
					+ _self.settings.confirmText
					+ '</div>'
					+ '</div>'
					+ '</div>';
				console.log(_self.settings);
				_self.dialog = $('body').append(templates).find('.z-dialog').addClass('fade-in');
				// 设置confirm按钮
				if ($.isFunction(_self.settings.confirm)) {
				    _self.confirm();
				}
				_self.size();
			},
			confirm: function() {
				var _self = this;

				_self.dialog.find('.ft').on("click", function() {
			        var confirmCallback = _self.settings.confirm();
			        if (confirmCallback == undefined || confirmCallback) {
			            _self.close();
			        }
				});
			},
			cancel: function() {

			},
			size: function() {
				var _self = this;
				_self.dialog.css({
					width: _self.settings.width,
					height: _self.settings.height
				});
			},
			close: function() {
				var _self = this;
				_self.dialog.removeClass('fade-in').addClass('fade-out');
				setTimeout(function(){
					$('body').find('.dialog-mask').remove();
				}, 800)
			}

		};

		return Dialog;
	})();

	$.fn.dialog = function(options){
	    return this.each(function () {
	        var $this = $(this),
	            instance = $.fn.dialog.lookup[$this.data('dialog')];
	        if (!instance) {
	            //zepto的data方法只能保存字符串，所以用此方法解决一下
	            $.fn.dialog.lookup[++$.fn.dialog.lookup.i] = new Dialog(this,options);
	            $this.data('dialog', $.fn.dialog.lookup.i);
	            instance = $.fn.dialog.lookup[$this.data('dialog')];
	        }

	        if (typeof options === 'string') instance[options]();
	    })
	};

	$.fn.dialog.lookup = {i: 0};

	/**
	 * 插件的默认值
	 */
	$.fn.dialog.defaults = {
	    title: '',
	    content: 'content',
	    width: 'auto', //宽度
	    height: 'auto', //高度
	    confirm: null,
	    cancel: null,
	    confirmText: 'OK',
	    cancleText: 'CANCEL'
	};

	var zDialog = function(options) {
		return new Dialog(options);
	}

	window.zDialog = $.zDialog = $.dialog = zDialog;

})(window.jQuery || window.Zepto, window)