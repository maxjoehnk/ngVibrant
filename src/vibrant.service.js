angular
    .module('ngVibrant')
    .provider('$vibrant', $vibrantProvider);

function $vibrantProvider() {
    var defaultColors = 64;
    var defaultQuality = 5;
    var provider = {
        setDefaultQuality: setDefaultQuality,
        setDefaultColors: setDefaultColors,
        $get: $get
    };

    function setDefaultQuality(q) {
        defaultQuality = q;
    }
    function setDefaultColors(c) {
        defaultColors = c;
    }
    function $get($q, $document) {
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

        vibrant.getDefaultQuality = function() {
            return defaultQuality;
        };
        vibrant.getDefaultColors = function() {
            return defaultColors;
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
    }
    return provider;
}
