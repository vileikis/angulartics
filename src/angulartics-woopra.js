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
    var isIdentified = false;
    var eventList = [];

    $analyticsProvider.registerSetUserProperties(function (properties) {

      if (angular.isObject(properties) && angular.isString(properties.email)) {
        woopra.identify(properties);
        isIdentified = true;

        var delay = 1000;
        angular.forEach(eventList, function (e) {

          setTimeout(function () {
            track(e.name, e.data);
          }, delay);
        });

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
      if (!isIdentified) {
        eventList.push({name: action, data: properties});
      } else {
        woopra.track(action, properties);
      }
    }
}]);
})(angular);
