// Ebola Infography
$('document').ready(function() {

	// TEMP
	var l = $('#ebola-mapy-slider .slide-info').length,
		arr = [];
	for (var i = 0; i < l; i++) {
		var obj = {
			translate: {
				x: 960 * i
			}
		};
		arr.push(obj);
	}
	// end TEMP

	var ebolaInfographic = Infography({
		id: 'ebola-infography'
	}, {
		id: 'ebola-mapy-slider',
		cssClasses: {
			slide: 'slide-info'
		}
	}, arr);

	// Steps
	ebolaInfographic
		.addStep({
			slide: 0,
			title: 'Titulo-0'
		})
		.addStep({
			slide: 1,
			title: 'Titulo-1'
		})
		.addStep({//2a
			slide: 2, 
			title: 'Titulo-2',
			reset: function(){
				var $img = $('#slide-info-history img').hide();
				$img.eq(0).show();
			},
			fw: null,
			bk: null
		})
		.addStep({//2b
			reset: function(){
				var $img = $('#slide-info-history img').hide();
				$img.eq(0).show();
			},
			fw: function(self){
				var $img = $('#slide-info-history img');
				self.running = true;
				$img.eq(1).fadeIn(500,function(){
					self.running = false;
				});
			}
		})
		.addStep({//2c
			reset: function(){
				var $img = $('#slide-info-history img').show();
				$img.eq(2).hide();
			},
			fw: function(self){
				var $img = $('#slide-info-history img');
				self.running = true;
				$img.eq(2).fadeIn(500,function(){
					self.running = false;
				});
			}
		})
		.addStep({
			slide: 3,
			title: 'Titulo-3'
		})
		.addStep({
			slide: 4,
			title: 'Titulo-4'
		})
		.addStep({
			slide: 5,
			title: 'Titulo-5'
		})
		.addStep({
			slide: 6,
			title: 'Titulo-6'
		})
		.addStep({//7a
			slide: 7, 
			title: 'Titulo-7',
			reset: function(){
				var $img = $('#slide-info-signos img').hide();
				$img.eq(0).show();
			},
			fw: null,
			bk: null
		})
		.addStep({//7b
			reset: function(){
				var $img = $('#slide-info-signos img').hide();
				$img.eq(0).show();
			},
			fw: function(self){
				var $img = $('#slide-info-signos img');
				self.running = true;
				$img.eq(1).fadeIn(500,function(){
					self.running = false;
				});
			}
		})
		.addStep({//7c
			reset: function(){
				var $img = $('#slide-info-signos img').show();
				$img.eq(2).hide();
				$img.eq(3).hide();
			},
			fw: function(self){
				var $img = $('#slide-info-signos img');
				self.running = true;
				$img.eq(2).fadeIn(500,function(){
					self.running = false;
				});
			}
		})
		.addStep({//7d
			reset: function(){
				var $img = $('#slide-info-signos img').show();
				$img.eq(3).hide();
			},
			fw: function(self){
				var $img = $('#slide-info-signos img');
				self.running = true;
				$img.eq(3).fadeIn(500,function(){
					self.running = false;
				});
			}
		})
		.addStep({
			slide: 8,
			title: 'Titulo-8'
		})
		.addStep({
			slide: 9,
			title: 'Titulo-9'
		})
		.addStep({
			slide: 10,
			title: 'Titulo-10'
		})
		.addStep({
			slide: 11,
			title: 'Titulo-11'
		})
		.addStep({//12a
			slide: 12, 
			title: 'Titulo-12',
			reset: function(){
				var $img = $('#slide-info-alerta img').hide();
				$img.eq(0).show();
			},
			fw: null,
			bk: null
		})
		.addStep({//12b
			reset: function(){
				var $img = $('#slide-info-alerta img').hide();
				$img.eq(0).show();
			},
			fw: function(self){
				var $img = $('#slide-info-alerta img');
				self.running = true;
				$img.eq(1).fadeIn(500,function(){
					self.running = false;
				});
			}
		})
		.addStep({//12c
			reset: function(){
				var $img = $('#slide-info-alerta img').show();
				$img.eq(2).hide();
			},
			fw: function(self){
				var $img = $('#slide-info-alerta img');
				self.running = true;
				$img.eq(2).fadeIn(500,function(){
					self.running = false;
				});
			}
		})
		.addStep({
			slide: 13,
			title: 'Titulo-13'
		})

});