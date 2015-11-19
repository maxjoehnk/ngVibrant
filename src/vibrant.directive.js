angular
    .module('ngVibrant')
    .directive('vibrant', vibrant);

function vibrant($vibrant) {
    var directive = {
        restrict: 'AE',
        scope: {
            model: '=ngModel', //Model
            url: '@?',
            swatch: '@?',
            quality: '@?',
            colors: '@?'
        },
        link: link
    };

    return directive;

    function link(scope, element, attrs) {
        scope.model = [];
        if (angular.isUndefined(attrs.quality)) {
            attrs.quality = $vibrant.getDefaultQuality();
        }
        if (angular.isUndefined(attrs.colors)) {
            attrs.colors = $vibrant.getDefaultColors();
        }
        if (angular.isDefined(attrs.url)) {
            $vibrant.get(attrs.url).then(function(swatches) {
                scope.model = angular.isDefined(attrs.swatch) ? swatches[attrs.swatch] : swatches;
            });
        }else {
            element.on('load', function() {
                var swatches = $vibrant(element[0], attrs.colors, attrs.quality);
                scope.model = angular.isDefined(attrs.swatch) ? swatches[attrs.swatch] : swatches;
            });
        }
    }
}
