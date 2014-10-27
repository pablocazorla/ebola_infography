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
			this.currentSlide = 0;
			this.steps = [];
			this.length = 0;
			this.running = false;

			this.$container = $('#' + this.config.id);

			var $controls = $('<div class="infography-controls"/>').appendTo(this.$container);

			this.$arrowPrev = $('<div class="infography-controls-arrow infography-controls-prev disabled"/>').appendTo($controls);
			this.$line = $('<div class="infography-controls-line"/>').appendTo($controls);
			this.$arrowNext = $('<div class="infography-controls-arrow infography-controls-next"/>').appendTo($controls);



			return this.setEvents(this);
		},
		addStep: function(step) {
			var newStep = $.extend({
				reset: emptyFunction,
				fw: null,
				bk: null
			}, step);
			this.steps.push(newStep);
			this.length++;
			return this;
		},
		gotoSlide: function(numSlide) {
			if (!this.running && numSlide !== this.currentSlide && numSlide >= 0) {
				if (numSlide > this.mapy.stepLength) {
					numSlide = 0;
				}
				this.currentSlide = numSlide;
				this.mapy.changeStep(numSlide);				
			}
			return this;
		},
		next: function() {
			if (!this.running) {
				var nextStep = this.currentStep + 1;
				this.currentStep = (nextStep > this.length) ? 0 : nextStep;
				this.steps[this.currentStep].reset();
				if (this.steps[this.currentStep].fw !== null) {
					this.steps[this.currentStep].fw(this);
				} else {
					this.gotoSlide(this.currentSlide + 1);
				}
			}
			return this;
		},
		prev: function() {
			if (!this.running) {
				var prevStep = this.currentStep - 1;
				if (prevStep > 0) {
					this.currentStep = prevStep;
					if (this.steps[this.currentStep].bk !== null) {
						this.steps[this.currentStep].bk(this);
					} else {
						this.gotoSlide(this.currentSlide - 1);
					}
				}
			}
			return this;
		},
		setEvents : function(self){

			this.$arrowPrev.click(function(){
				self.prev();
			});
			this.$arrowNext.click(function(){
				self.next();
			});

			return this;
		}
	};

	window.Infography = function(options, mapyOptions, mapySetup) {
		return new info(options, mapyOptions, mapySetup);
	};
})();