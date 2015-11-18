angular
    .module('ngVibrant')
    .provider('$vibrant', $vibrantProvider);

function $vibrantProvider() {
    this.$get = function() {
        function $vibrant(element) {
            var instance = new Vibrant(element);
            var swatches = instance.swatches();
            var rgb = {};
            Object.getOwnPropertyNames(swatches).forEach(function(swatch) {
                if (angular.isDefined(swatches[swatch])) {
                    rgb[swatch] = swatches[swatch].rgb;
                }
            });
            return rgb;
        }
    };
}
