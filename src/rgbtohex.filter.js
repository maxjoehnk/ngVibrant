angular
	.module('ngVibrant')
	.filter('rgbToHex', rgbToHex);

function rgbToHex(rgb) {
	if (angular.isArray(rgb)) {
		var hex = '#';
		hex += rgb[0].toString(16);
		hex += rgb[1].toString(16);
		hex += rgb[2].toString(16);
		return hex;
	}else {
		return rgb;
	}
}