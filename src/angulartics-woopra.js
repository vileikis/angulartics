/**
 * @license Angulartics v0.16.3
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * License: MIT
 */
(function(angular) {
'use strict';

/**
 * @ngdoc overview
 * @name angulartics.woopra
 * Enables analytics support for Woopra (http://www.woopra.com)
 */
angular.module('angulartics.woopra', ['angulartics'])
.config(['$analyticsProvider', function ($analyticsProvider) {

    var isFirstTime = true;

    $analyticsProvider.registerSetUserProperties(function (properties) {
      if (angular.isObject(properties) && angular.isString(properties.email)) {
        woopra.identify(properties);
      } else {
        throw "Invalid use properties or email. " + properties;
      }
    });


    $analyticsProvider.registerPageTrack(function (path) {
      track('pv', {
        url: path
      });
    });

    $analyticsProvider.registerEventTrack(function (action, properties) {
      track(action, properties);
    });

    function track (action, properties) {

      if (isFirstTime && action === 'pv') {

        setTimeout(function () {
          woopra.track(action, properties);
          isFirstTime = false;
        }, 3000);
      } else {
        woopra.track(action, properties);
      }
    }
}]);
})(angular);
