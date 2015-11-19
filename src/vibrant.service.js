angular
    .module('ngVibrant')
    .provider('$vibrant', $vibrantProvider);

/**
 * @ngdoc provider
 * @name  $vibrantProvider
 * @memberOf  ngVibrant
 */
function $vibrantProvider() {
    var defaultColors = 64;
    var defaultQuality = 5;
    var provider = {
        setDefaultQuality: setDefaultQuality,
        setDefaultColors: setDefaultColors,
        $get: $vibrant
    };
    /**
     * @ngdoc method
     * @memberOf ngVibrant
     * @name  $vibrantProvider#setDefaultQuality
     * @param {int} [5] quality Sets the default quality used for swatch generation. 0 is highest
     */
    function setDefaultQuality(q) {
        defaultQuality = q;
    }
    /**
     * @ngdoc method
     * @memberOf ngVibrant
     * @name  $vibrantProvider#setDefaultColors
     * @param {int} [64] colors
     * Sets the default amount of colors used for the initial palette from which the swatches will be generated
     */
    function setDefaultColors(c) {
        defaultColors = c;
    }
    /**
     * @ngdoc   service
     * @name    $vibrant
     * @memberof  ngVibrant
     * @description
     * Generates swatches from an image using Vibrant.js
     */
    function $vibrant($q, $document) {
        /**
         * @ngdoc method
         * @name  $vibrant
         * @memberOf  $vibrant
         * @param {element} element The img element to use for swatch generation
         * @param {int} [64] colors The amount of colors in initial palette from which the swatches will be generated
         * @param {int} [5] quality The quality of the generated swatches. 0 is highest
         * @return {array} An array with all swatches. A swatch can be undefined
         */
        function vibrant(element, colors, quality) {
            if (angular.isUndefined(colors)) {
                colors = defaultColors;
            }
            if (angular.isUndefined(quality)) {
                quality = defaultQuality;
            }
            var instance = new Vibrant(element, colors, quality);
            var swatches = instance.swatches();
            return swatches;
        }
        /**
         * @ngdoc method
         * @name  $vibrant#get
         * @description
         * Loads an image from the given url and generates its swatches
         * @param {string} url The URL to load the image from
         * @param {int} [64] colors The amount of colors in initial palette from which the swatches will be generated
         * @param {int} [5] quality The quality of the generated swatches. 0 is highest
         * @return {Promise} a `Promise` which resolves when the swatches are generated
         */
        vibrant.get = function(url, colors, quality) {
            return $q(function(resolve, reject) {
                var pic = $document[0].createElement('img');
                pic.src = url;
                $document.find('body').append(pic);
                var element = angular.element(pic);
                element.css({display: 'none'});
                element.on('load', function() {
                    resolve(vibrant(pic, colors, quality));
                });
                element.on('error', reject);
            });
        };
        /**
         * @ngdoc method
         * @name  $vibrant#getDefaultQuality
         * @return {int} The default quality used for swatch generation
         */
        vibrant.getDefaultQuality = function() {
            return defaultQuality;
        };
        /**
         * @ngdoc method
         * @name  $vibrant#getDefaultColors
         * @return {int} The default amount of colors used for swatch generation
         */
        vibrant.getDefaultColors = function() {
            return defaultColors;
        };
        /**
         * @ngdoc method
         * @name  $vibrant#vibrant
         * @description
         * Alias for $vibrant(element, colors, quality).Vibrant
         * @param {element} element The img element to use for swatch generation
         * @param {int} [64] colors The amount of colors in initial palette from which the swatches will be generated
         * @param {int} [5] quality The quality of the generated swatches. 0 is highest
         * @return {Swatch} The 'Vibrant' Swatch or undefined
         */
        vibrant.vibrant = function(element, colors, quality) {
            return vibrant(element, colors, quality).Vibrant;
        };
        /**
         * @ngdoc method
         * @name  $vibrant#muted
         * @description
         * Alias for $vibrant(element, colors, quality).Muted
         * @param {element} element The img element to use for swatch generation
         * @param {int} [64] colors The amount of colors in initial palette from which the swatches will be generated
         * @param {int} [5] quality The quality of the generated swatches. 0 is highest
         * @return {Swatch} The 'Muted' Swatch or undefined
         */
        vibrant.muted = function(element, colors, quality) {
            return vibrant(element, colors, quality).Muted;
        };
        /**
         * @ngdoc method
         * @name  $vibrant#darkVibrant
         * @description
         * Alias for $vibrant(element, colors, quality).DarkVibrant
         * @param {element} element The img element to use for swatch generation
         * @param {int} [64] colors The amount of colors in initial palette from which the swatches will be generated
         * @param {int} [5] quality The quality of the generated swatches. 0 is highest
         * @return {Swatch} The 'DarkVibrant' Swatch or undefined
         */
        vibrant.darkVibrant = function(element, colors, quality) {
            return vibrant(element, colors, quality).DarkVibrant;
        };
        /**
         * @ngdoc method
         * @name  $vibrant#darkMuted
         * @description
         * Alias for $vibrant(element, colors, quality).DarkMuted
         * @param {element} element The img element to use for swatch generation
         * @param {int} [64] colors The amount of colors in initial palette from which the swatches will be generated
         * @param {int} [5] quality The quality of the generated swatches. 0 is highest
         * @return {Swatch} The 'DarkMuted' Swatch or undefined
         */
        vibrant.darkMuted = function(element, colors, quality) {
            return vibrant(element, colors, quality).DarkMuted;
        };
        /**
         * @ngdoc method
         * @name  $vibrant#lightVibrant
         * @description
         * Alias for $vibrant(element, colors, quality).LightVibrant
         * @param {element} element The img element to use for swatch generation
         * @param {int} [64] colors The amount of colors in initial palette from which the swatches will be generated
         * @param {int} [5] quality The quality of the generated swatches. 0 is highest
         * @return {Swatch} The 'LightVibrant' Swatch or undefined
         */
        vibrant.lightVibrant = function(element, colors, quality) {
            return vibrant(element, colors, quality).lightVibrant;
        };
        /**
         * @ngdoc method
         * @name  $vibrant#lightMuted
         * @description
         * Alias for $vibrant(element, colors, quality).LightMuted
         * @param {element} element The img element to use for swatch generation
         * @param {int} [64] colors The amount of colors in initial palette from which the swatches will be generated
         * @param {int} [5] quality The quality of the generated swatches. 0 is highest
         * @return {Swatch} The 'LightMuted' Swatch or undefined
         */
        vibrant.lightMuted = function(element, colors, quality) {
            return vibrant(element, colors, quality).lightMuted;
        };
        return vibrant;
    }
    return provider;
}
