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
});