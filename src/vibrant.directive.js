angular
	.module('ngVibrant')
	.directive('vibrant', vibrant);

function vibrant($vibrant) {
	var directive = {
		restrict: 'E',
		scope: {
			vibrant: '=' //Model
		},
		link: link
	};

	return directive;

	function link(scope, element) {
		var swatches = $vibrant(element[0]);
		scope.vibrant = swatches;
	}
}