angular
	.module('ngVibrant', []);

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
rgbToHex.$inject = ['rgb'];

angular
    .module('ngVibrant')
    .directive('vibrant', vibrant);

function vibrant($vibrant) {
    var directive = {
        restrict: 'A',
        scope: {
            vibrant: '=' //Model
        },
        link: link
    };

    return directive;

    function link(scope, element) {
        scope.vibrant = [];
        element.on('load', function() {
            var swatches = $vibrant(element[0]);
            scope.vibrant = swatches;
        });
    }
}
vibrant.$inject = ['$vibrant'];

angular
    .module('ngVibrant')
    .provider('$vibrant', $vibrantProvider);

function $vibrantProvider() {
    this.$get = function() {
        function $vibrant(element) {
            var instance = new Vibrant(element);
            return instance.swatches();
        }
    };
}
