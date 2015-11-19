# ngVibrant
[![License](https://img.shields.io/badge/license-Apache%202.0-brightgreen.svg?style=flat-square)](https://github.com/maxjoehnk/ngVibrant/blob/master/LICENSE)

AngularJS Bindings for [Vibrant.js](http://jariz.github.io/vibrant.js/).

##Features
- Exposes the Vibrant.js Library as Service
- Easy access with the provided directive
- Set global defaults for the color palette or quality
- Automatic loading of the Vibrant.js Library (future Release)

##Installation
You can install ngVibrant from bower with
```
bower install angular-vibrant
```
or download it directly from [here](https://github.com/maxjoehnk/ngVibrant/tree/master/dist).

##Usage
You'll need to add ngVibrant as a dependency in your Angular Module Definition
```js
angular.module('myApp', ['ngVibrant']);
```
and that's basically it. You can modify some settings of course, but most of the time you don't have to do this.

Now just access Vibrant.js as a Service or as a Directive.
###Directive
ngVibrant provides an attribute as well as an element for easy access.
```html
	<div ng-repeat="item in items" ng-style="{'background-color': item.swatch.getHex()}">
		<img ng-src="{{item.image}}" vibrant ng-model="item.swatch" swatch="Vibrant"/>
		<span ng-style="{color: item.swatch.getBodyTextColor()}">{{item.text}}</span>
	</div>
```
```html
	<div ng-repeat="item in items" ng-style="{'background-color': item.swatch.Vibrant.getHex()}">
		<vibrant url="{{item.image}}" ng-model="item.swatch"></vibrant>
	</div>
```
###Service
ngVibrant provides a server for easy access to the Vibrant.js Library.
```js
	angular
		.module('myApp')
		.controller('MyCtrl', ['$vibrant', function($vibrant) {
			var swatches;
			swatches = $vibrant(element);
			//or
			$vibrant.get(url).then(function(loaded) {
				swatches = loaded;
			});
		}]);
```

Read more in the [API Docs](http://maxjoehnk.github.io/ngVibrant/api/)