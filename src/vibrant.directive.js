angular
    .module('ngVibrant')
    .directive('vibrant', vibrant);
/**
 * @ngdoc directive
 * @memberOf ngVibrant
 * @name  vibrant
 * @restrict EA
 * @attr {object} ng-model  The Model to bind to
 * @attr {string} url The url to load
 * @attr {string} swatch
 * The Swatch to bind to the model (Vibrant, Muted, DarkVibrant, DarkMuted, LightVibrant, LightMuted)
 * @attr {int} quality Overrides the quality used for palette generation. 0 is highest
 * @attr {int} colors Overrides the amount of initial colors used for palette generation
 * @param {service} $vibrant The $vibrant service
 */
function vibrant($vibrant) {
    return {
        restrict: 'AE',
        scope: {
            model: '=ngModel',
            url: '@?',
            swatch: '@?',
            quality: '@?',
            colors: '@?'
        },
        link: link
    };

    /**
     * The link function for the vibrant directive
     * @param  {service} scope  The current scope
     * @param  {service} element The element
     * @param  {object} attrs    The attributes
     */
    function link(scope, element, attrs) {
        scope.model = [];
        if (angular.isUndefined(attrs.quality)) {
            attrs.quality = $vibrant.getDefaultQuality();
        }
        if (angular.isUndefined(attrs.colors)) {
            attrs.colors = $vibrant.getDefaultColors();
        }
        if (angular.isDefined(attrs.url)) {
            $vibrant.get(attrs.url, attrs.colors, attrs.quality).then(function(swatches) {
                scope.model = angular.isDefined(attrs.swatch) ?
                    swatches[attrs.swatch] : swatches;
            });
        }else {
            element.on('load', function() {
                var swatches = $vibrant(element[0], attrs.colors, attrs.quality);
                scope.$apply(function() {
                    scope.model = angular.isDefined(attrs.swatch) ?
                        swatches[attrs.swatch] : swatches;
                });
            });
        }
    }
}
