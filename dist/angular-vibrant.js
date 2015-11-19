angular
	.module('ngVibrant', []);

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

angular
    .module('ngVibrant')
    .directive('vibrant', vibrant);

function vibrant($vibrant) {
    var directive = {
        restrict: 'AE',
        scope: {
            model: '=ngModel', //Model
            url: '@?',
            color: '@?'
        },
        link: link
    };

    return directive;

    function link(scope, element, attrs) {
        scope.model = [];
        if (angular.isDefined(attrs.url)) {
            $vibrant.get(attrs.url).then(function(swatches) {
                scope.model = angular.isDefined(attrs.color) ? swatches[attrs.color] : swatches;
            });
        }else {
            element.on('load', function() {
                var swatches = $vibrant.vibrant(element[0]);
                scope.model = angular.isDefined(attrs.color) ? swatches[attrs.color] : swatches;
            });
        }
    }
}
vibrant.$inject = ['$vibrant'];

angular
    .module('ngVibrant')
    .provider('$vibrant', $vibrantProvider);

function $vibrantProvider() {
    this.$get = ['$q', '$document', function($q, $document) {
        return ({
            get: function(url) {
                var that = this;
                return $q(function(resolve, reject) {
                    var pic = $document[0].createElement('img');
                    pic.src = url;
                    $document.find('body').append(pic);
                    var element = angular.element(pic);
                    element.css({display: 'none'});
                    element.on('load', function() {
                        resolve(that.vibrant(pic));
                    });
                    element.on('error', reject);
                });
            },
            vibrant: function(element) {
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
        });
    }];
}
