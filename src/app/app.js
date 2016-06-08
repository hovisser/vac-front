

require('angular');
require('angular-mocks');
require('angular-ui-bootstrap');
require('angular-animate');
require('angular-route');


//load the controllers

var NavController = require('./controllers/NavController');
var FooterController = require('./controllers/FooterController');


// this module must exist because of templateCache
angular.module('templates', []);

var app = angular.module('app', ['ui.bootstrap.tpls', 'ui.bootstrap.typeahead','ui.bootstrap.dropdown', 'ngRoute', 'ngAnimate', 'templates']);
require('./components/CopyrightComponent');
require('./components/PlaylistComponent');
var MainController = require('./controllers/MainController');

//'use strict';
angular.module('app').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

      $routeProvider.when('/', {
          templateUrl: 'templates/home.html',
          controller: 'MainController'
      })
      .when('/about', {
         templateUrl: 'templates/about.html',
         controller: 'MainController'
      })
      .when('/contact', {
        templateUrl: 'templates/contact.html',
        controller: 'MainController'
      });


      $locationProvider.html5Mode(true);
    //
}]);




//app.controller('MainController',['$scope', MainController]);
app.controller('NavController',['$scope', '$location', NavController]);
