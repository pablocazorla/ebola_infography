// Ebola Infography
$('document').ready(function() {


	$('#ebola-mapy-slider').css('visibility','visible');
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

	arr = [{}, {
		translate: {
			x: 6,
			y: -931
		},
		rotate: {
			x: 69
		}
	}, {
		translate: {
			x: 1406,
			z: -1584
		},
		rotate: {
			z: 46
		}
	}, {
		translate: {
			x: 2880
		}
	}, {
		translate: {
			x: 3840
		}
	}, {
		translate: {
			x: 4800
		}
	}, {
		translate: {
			x: 5760
		}
	}, {
		translate: {
			x: 6720
		}
	}, {
		translate: {
			x: 7680
		}
	}, {
		translate: {
			x: 8640
		}
	}, {
		translate: {
			x: 9600
		}
	}, {
		translate: {
			x: 10560
		}
	}, {
		translate: {
			x: 11520
		}
	}, {
		translate: {
			x: 12480
		}
	}];

	// end TEMP

	// Store
	var store = {};

	store.$historyPoints = $('#slide-info-history .slide-time-line-point');

	store.AfricaMapMulti = MultiImagen({
		id: 'slide-africa-map',
		width: 749,
		height: 805
	});



	// Anims	
	var fadeIn = function(selection, action, duration) {
		var duration = duration || 500;
		var $elems = $('#' + selection).find('.slide-fadein');
		if (action === 'reset') {
			$elems.hide();
		} else {
			store.infograph.running = true;
			var l = $elems.length,
				i = 0,
				fade = function() {
					$elems.eq(i).fadeIn(duration, function() {
						i++;
						if (i < l) {
							fade();
						} else {
							store.infograph.running = false;
						}
					});
				};
			fade();
		}
	};

	var ebolaInfographic = Infography({
		id: 'ebola-infography'
	}, {
		id: 'ebola-mapy-slider',
		cssClasses: {
			slide: 'slide-info'
		}
	}, arr);

	store.infograph = ebolaInfographic;

	// Steps
	ebolaInfographic
		.addStep({
			slide: 0,
			title: 'Titulo-0'
		})
		.addStep({
			slide: 1,
			title: 'Qué es el Ébola',
			reset: function() {
				fadeIn('slide-que-es-ebola', 'reset');
			},
			fw: function() {
				fadeIn('slide-que-es-ebola', 'run');
			}
		})
		.addStep({ //2a
			slide: 2,
			title: 'Un poco de historia',
			reset: function() {
				store.$historyPoints.css('left', '150%');
				store.AfricaMapMulti.reset().positionScale({
					top: 97,
					left: 315,
					scale: .35
				}, 'noAnim');
				$('#slide-text-1976a,.slide-map-mark,#slide-text-rioebola,#slide-rioebola,#slide-text-2013a,#slide-eeuu,#slide-text-2014a,#slide-text-2014b').hide();
				$('#slide-africa-map').show();
			},
			fw: function() {
				store.$historyPoints.eq(0).animate({
					'left': '50%'
				}, 600);
				setTimeout(function() {
					store.AfricaMapMulti.set(0, function() {
						store.AfricaMapMulti.positionScale({
							top: -151,
							left: 177,
							scale: 1
						}).next(function() {
							$('.slide-map-mark').fadeIn(500);
							setTimeout(function() {
								store.AfricaMapMulti.next();
								$('#slide-text-1976a').fadeIn(600, function() {
									$('#slide-rioebola').fadeIn(400, function() {
										$('#slide-text-rioebola').fadeIn(400);
									});
								});
							}, 400);
						});
					});
				}, 1000);

			}
		})
		.addStep({ //2b
			reset: function() {
				store.$historyPoints.css('left', '150%').eq(0).css({
					'left': '50%'
				});
				$('#slide-text-1976a,.slide-map-mark,#slide-text-rioebola,#slide-rioebola,#slide-africa-map').show();
				$('#slide-text-2013a,#slide-eeuu,#slide-text-2014a,#slide-text-2014b').hide();
			},
			fw: function() {
				store.$historyPoints.eq(0).animate({
					'left': '-150%'
				}, 600);
				store.$historyPoints.eq(1).animate({
					'left': '50%'
				}, 600);
				$('#slide-text-1976a,.slide-map-mark,#slide-text-rioebola,#slide-rioebola').fadeOut(600);
				store.AfricaMapMulti.positionScale({
					top: -42,
					left: 430,
					scale: 1
				}).set(3, function() {
					$('#slide-text-2013a').fadeIn(600);
				});
			}
		})
		.addStep({ //2c
			reset: function() {
				store.$historyPoints.eq(0).css({
					'left': '-150%'
				});
				store.$historyPoints.eq(1).css({
					'left': '50%'
				});
				store.$historyPoints.eq(2).css({
					'left': '150%'
				});
				$('#slide-text-1976a,.slide-map-mark,#slide-text-rioebola,#slide-rioebola,#slide-eeuu,#slide-text-2014a,#slide-text-2014b').hide();
				$('#slide-text-2013a,#slide-africa-map').show();
			},
			fw: function() {
				store.$historyPoints.eq(1).animate({
					'left': '-150%'
				}, 600);
				store.$historyPoints.eq(2).animate({
					'left': '50%'
				}, 600);
				$('#slide-text-2013a').fadeOut(600);
				store.AfricaMapMulti.positionScale({
					top: 266,
					left: 527,
					scale: 0.4
				}).set(1, function() {
					//$('#slide-text-2013a').fadeIn(600);
					$('#slide-eeuu').fadeIn(600);
					$('#slide-africa-map').fadeOut(800, function() {
						$('#slide-text-2014a,#slide-text-2014b').fadeIn(600);
					});
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
		.addStep({ //7a
			slide: 7,
			title: 'Titulo-7',
			reset: function() {
				var $img = $('#slide-info-signos img').hide();
				$img.eq(0).show();
			},
			fw: null,
			bk: null
		})
		.addStep({ //7b
			reset: function() {
				var $img = $('#slide-info-signos img').hide();
				$img.eq(0).show();
			},
			fw: function(self) {
				var $img = $('#slide-info-signos img');
				self.running = true;
				$img.eq(1).fadeIn(500, function() {
					self.running = false;
				});
			}
		})
		.addStep({ //7c
			reset: function() {
				var $img = $('#slide-info-signos img').show();
				$img.eq(2).hide();
				$img.eq(3).hide();
			},
			fw: function(self) {
				var $img = $('#slide-info-signos img');
				self.running = true;
				$img.eq(2).fadeIn(500, function() {
					self.running = false;
				});
			}
		})
		.addStep({ //7d
			reset: function() {
				var $img = $('#slide-info-signos img').show();
				$img.eq(3).hide();
			},
			fw: function(self) {
				var $img = $('#slide-info-signos img');
				self.running = true;
				$img.eq(3).fadeIn(500, function() {
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
		.addStep({ //12a
			slide: 12,
			title: 'Titulo-12',
			reset: function() {
				var $img = $('#slide-info-alerta img').hide();
				$img.eq(0).show();
			},
			fw: null,
			bk: null
		})
		.addStep({ //12b
			reset: function() {
				var $img = $('#slide-info-alerta img').hide();
				$img.eq(0).show();
			},
			fw: function(self) {
				var $img = $('#slide-info-alerta img');
				self.running = true;
				$img.eq(1).fadeIn(500, function() {
					self.running = false;
				});
			}
		})
		.addStep({ //12c
			reset: function() {
				var $img = $('#slide-info-alerta img').show();
				$img.eq(2).hide();
			},
			fw: function(self) {
				var $img = $('#slide-info-alerta img');
				self.running = true;
				$img.eq(2).fadeIn(500, function() {
					self.running = false;
				});
			}
		})
		.addStep({
			slide: 13,
			title: 'Titulo-13'
		})

});