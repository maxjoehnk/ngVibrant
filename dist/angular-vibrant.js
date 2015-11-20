angular
	.module('ngVibrant', []);

angular
    .module('ngVibrant')
    .directive('vibrant', vibrant);
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
vibrant.$inject = ['$vibrant'];

angular
    .module('ngVibrant')
    .provider('$vibrant', $vibrantProvider);
function $vibrantProvider() {
    var defaultColors = 64;
    var defaultQuality = 5;
    var provider = {
        setDefaultQuality: setDefaultQuality,
        setDefaultColors: setDefaultColors,
        $get: $vibrant
    };
    function setDefaultQuality(q) {
        defaultQuality = q;
    }
    function setDefaultColors(c) {
        defaultColors = c;
    }
    function $vibrant($q, $document) {
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
    $vibrant.$inject = ['$q', '$document'];
    return provider;
}
