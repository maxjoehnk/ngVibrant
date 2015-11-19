angular
    .module('ngVibrant')
    .provider('$vibrant', $vibrantProvider);

function $vibrantProvider() {
    this.$get = function($q, $document) {
        function vibrant(element, colors, quality) {
            if (angular.isUndefined(colors)) {
                colors = 64;
            }
            if (angular.isUndefined(quality)) {
                quality = 5;
            }
            var instance = new Vibrant(element, colors, quality);
            var swatches = instance.swatches();
            return swatches;
        }
        vibrant.get = function(url) {
            return $q(function(resolve, reject) {
                var pic = $document[0].createElement('img');
                pic.src = url;
                $document.find('body').append(pic);
                var element = angular.element(pic);
                element.css({display: 'none'});
                element.on('load', function() {
                    resolve(vibrant(pic));
                });
                element.on('error', reject);
            });
        };
        vibrant.vibrant = function(element, colors, quality) {
            return vibrant(element, colors, quality).Vibrant;
        };
        vibrant.muted = function(element, colors, quality) {
            return vibrant(element, colors, quality).Muted;
        };
        vibrant.darkVibrant = function(element, colors, quality) {
            return vibrant(element, colors, quality).DarkVibrant;
        };
        vibrant.darkMuted = function(element, colors, quality) {
            return vibrant(element, colors, quality).DarkMuted;
        };
        vibrant.lightVibrant = function(element, colors, quality) {
            return vibrant(element, colors, quality).lightVibrant;
        };
        vibrant.lightMuted = function(element, colors, quality) {
            return vibrant(element, colors, quality).lightMuted;
        };
        return vibrant;
    };
}
