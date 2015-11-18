angular
    .module('ngVibrant')
    .filter('rgbToHex', rgbToHex);

function rgbToHex() {
    return function(rgb) {
        if (angular.isArray(rgb)) {
            var hex = '#';
            rgb.forEach(function(color) {
                var str = Math.round(color).toString(16);
                if (str.length === 1) {
                    hex += '0';
                }
                hex += str;
            });
            return hex;
        }else {
            return rgb;
        }
    };
}
