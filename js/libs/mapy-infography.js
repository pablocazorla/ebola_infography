// Mapy Infography
;
(function() {
	var emptyFunction = function() {};


	var info = function(options, mapyOptions, mapySetup) {
		return this.init(options, mapyOptions, mapySetup);
	};

	info.prototype = {
		init: function(options, mapyOptions, mapySetup) {
			this.config = $.extend({
				id: null
			}, options);

			var configMapy = $.extend({
				margin: 0,
				initial: 0,
				panorama: false,
				hash: false,
				keyboard: false
			}, mapyOptions);

			this.mapy = Mapy(configMapy).setup(mapySetup);

			this.currentStep = 0;
			this.steps = [];
			this.length = 0;
			this.running = false;
			this.lastTitle = '';
			this.lastSlide = 0;
			this.currentSlide = 0;

			this.$container = $('#' + this.config.id);
			var $controls = $('<div class="infography-controls"/>').appendTo(this.$container);
			this.$arrowPrev = $('<div class="infography-controls-arrow infography-controls-prev disabled"/>').appendTo($controls);
			this.$line = $('<div class="infography-controls-line"/>').appendTo($controls);
			this.$arrowNext = $('<div class="infography-controls-arrow infography-controls-next"/>').appendTo($controls);
			return this.setEvents(this);
		},
		addStep: function(step) {
			var newStep = $.extend({
				title: this.lastTitle,
				slide: this.lastSlide,
				reset: emptyFunction,
				fw: null
			}, step);

			this.addPointLine(newStep.title, this);

			this.lastTitle = newStep.title;
			this.lastSlide = newStep.slide;

			var $slide = $(this.mapy.step(newStep.slide).node());
			if ($slide.find('.slide-title').length === 0) {
				$('<div class="slide-title">' + newStep.title + '</div>').appendTo($slide);
			}

			this.steps.push(newStep);
			this.length++;
			return this;
		},
		addPointLine: function(title, self) {
			var $wrap = $('<div class="infography-step-indicator" data-step="' + this.length + '"/>').appendTo(this.$line).click(function() {
				//if ($(this).hasClass('complete')) {
				var step = parseInt($(this).attr('data-step'));
				self.gotoStep(step);
				//}
			}).html('<span class="infography-step-indicator-glob"></span><span class="infography-step-indicator-line"></span><span class="infography-step-indicator-banner">' + title + '</span>');

			if (this.length === 0) {
				$wrap.addClass('complete ready');
			}

			this.$line.find('.infography-step-indicator').css({
				'width': (95 / (this.length + 1)) + '%'
			});



			return this;
		},
		gotoSlide: function(numSlide) {
			if (!this.running && numSlide !== this.currentSlide && numSlide >= 0) {
				if (numSlide > this.mapy.stepLength) {
					numSlide = 0;
				}
				this.currentSlide = numSlide;
				this.mapy.changeStep(numSlide);
				this.verifyArrows();
			}
			return this;
		},
		gotoStep: function(proxStep) {
			if (!this.running && proxStep !== this.currentStep && proxStep >= 0) {
				if (proxStep > this.currentStep) {
					// Next
					this.currentStep = (proxStep >= this.length) ? 0 : proxStep;
				} else {
					// Prev
					this.currentStep = proxStep;
				}
				if (this.currentStep >= 0) {
					this.gotoSlide(this.steps[this.currentStep].slide);
					this.steps[this.currentStep].reset(this);
					if (this.steps[this.currentStep].fw !== null) {
						var delay = 1,
							self = this;
						if (this.currentSlide !== this.steps[this.currentStep].slide) {
							delay = 1000;
						}
						setTimeout(function() {
							self.steps[self.currentStep].fw(self);
						}, delay);
					}
					this.verifyArrows();
					this.verifyPointLines(this);
				}
			}

			return this;
		},
		next: function() {
			return this.gotoStep(this.currentStep + 1);
		},
		prev: function() {
			return this.gotoStep(this.currentStep - 1);
		},
		verifyArrows: function() {
			if (this.currentStep === 0) {
				this.$arrowPrev.addClass('disabled');
			} else {
				this.$arrowPrev.removeClass('disabled');
			}
			return this;
		},
		verifyPointLines: function(self) {
			var $points = this.$line.find('.infography-step-indicator');
			$points.each(function(index) {
				if (index <= self.currentStep) {
					$points.eq(index).addClass('complete').addClass('ready');
				} else {
					$points.eq(index).removeClass('ready');
				}
			});
			return this;
		},
		setEvents: function(self) {

			this.$arrowPrev.click(function() {
				self.prev();
			});
			this.$arrowNext.click(function() {
				self.next();
			});
			this.mapy
				.onStartChange(function() {
					self.running = true;
				})
				.onFinishChange(function() {
					self.running = false;
				});


			return this;
		}
	};

	window.Infography = function(options, mapyOptions, mapySetup) {
		return new info(options, mapyOptions, mapySetup);
	};


	var multimg = function(options) {
		return this.init(options);
	};
	multimg.prototype = {
		init: function(options) {
			this.cfg = $.extend({
				id: '',
				width: 400,
				height: 300,
				scale: 1,
				top: 0,
				left: 0,
				duration: 700
			}, options);

			this.$container = $('#' + this.cfg.id);

			this.$imgs = this.$container.find('img');

			this.length = this.$imgs.length;
			this.current = -1;

			return this.positionScale({}, 'noAnim').reset();
		},
		positionScale: function(options, animate) {
			var anim = animate || 'anim';

			var conf = $.extend({
				top: this.cfg.top,
				left: this.cfg.left,
				scale: this.cfg.scale
			}, options);
			this.cfg.top = conf.top;
			this.cfg.left = conf.left;
			this.cfg.scale = conf.scale;
			var w = this.width(),
				h = this.height();

			if (anim === 'anim') {
				this.$container.animate({
					top: this.cfg.top + 'px',
					left: this.cfg.left + 'px',
					width: w + 'px',
					height: h + 'px'
				}, this.cfg.duration);
			} else {
				this.$container.css({
					top: this.cfg.top + 'px',
					left: this.cfg.left + 'px',
					width: w + 'px',
					height: h + 'px'
				});
			}

			return this;
		},
		width: function() {
			return Math.round(this.cfg.scale * this.cfg.width);
		},
		height: function() {
			return Math.round(this.cfg.scale * this.cfg.height);
		},
		reset: function() {
			this.$imgs.hide();
			this.current = -1;
			return this;
		},
		set: function(num, callback) {
			if (this.current !== num) {
				var cbk = callback || function() {};
				this.$imgs.eq(this.current).fadeOut(this.cfg.duration);
				var n = (num >= this.length) ? 0 : ((num < 0) ? this.length - 1 : num);
				this.current = n;
				this.$imgs.eq(this.current).fadeIn(this.cfg.duration, cbk);
			}
			return this;
		},
		prev: function(callback) {
			return this.set(this.current - 1, callback);
		},
		next: function(callback) {
			return this.set(this.current + 1, callback);
		}
	};

	window.MultiImagen = function(options) {
		return new multimg(options);
	};
})();