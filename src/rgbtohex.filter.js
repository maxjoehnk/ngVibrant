angular
    .module('ngVibrant')
    .filter('rgbToHex', rgbToHex);

function rgbToHex() {
    return function(rgb) {
        if (angular.isArray(rgb)) {
            var hex = '#';
            rgb.forEach(function(color) {
                hex += Math.round(color).toString(16);
            });
            return hex;
        }else {
            return rgb;
        }
    };
}
