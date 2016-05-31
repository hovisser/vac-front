require('angular');
require('angular-ui-bootstrap');
require('angular-animate');
require('angular-route');

var MainController = require('./controllers/MainController');
var app = angular.module('app', ['ui.bootstrap.tpls', 'ui.bootstrap.typeahead','ui.bootstrap.dropdown', 'ngRoute', 'ngAnimate']);

app.controller('MainController', ['$scope', MainController]);
