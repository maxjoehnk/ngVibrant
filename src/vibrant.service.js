angular
	.module('ngVibrant')
	.provider('$vibrant', $vibrantProvider);

function $vibrantProvider() {
	
	this.$get = function() {
		function $vibrant(element) {
			var instance = new Vibrant(element);
			return instance.swatches();
		}
	};
}