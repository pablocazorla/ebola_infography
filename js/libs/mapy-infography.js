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
				preFw: emptyFunction,
				preBk: emptyFunction,
				fw: null,
				bk: null
			}, step);

			this.addPointLine(newStep.title, this);

			this.lastTitle = newStep.title;
			this.lastSlide = newStep.slide;
			this.steps.push(newStep);
			this.length++;
			return this;
		},
		addPointLine: function(title, self) {
			var $wrap = $('<div class="infography-step-indicator" data-step="' + this.length + '"/>').appendTo(this.$line).click(function() {
				var step = parseInt($(this).attr('data-step'));
				self.gotoStep(step);
			}).html('<span class="infography-step-indicator-glob"></span><span class="infography-step-indicator-line"></span><span class="infography-step-indicator-banner">' + title + '</span>');

			if (this.length === 0) {
				$wrap.addClass('ready');
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
					this.gotoSlide(this.steps[this.currentStep].slide);
					if (this.steps[this.currentStep].fw !== null) {
						this.steps[this.currentStep].preFw();
						this.steps[this.currentStep].fw(this);
					}
				} else {
					// Prev
					if (proxStep >= 0) {
						this.currentStep = proxStep;
						this.gotoSlide(this.steps[this.currentStep].slide);
						if (this.steps[this.currentStep].bk !== null) {
							this.steps[this.currentStep].preBk();
							this.steps[this.currentStep].bk(this);
						}
					}
				}
				this.verifyArrows();
				this.verifyPointLines(this);
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
					$points.eq(index).addClass('ready');
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
})();