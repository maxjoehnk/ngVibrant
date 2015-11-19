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
