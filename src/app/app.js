require('angular');
require('angular-ui-bootstrap');
require('angular-route');

var MainController = require('./controllers/MainController')
var app = angular.module('app', ['ui.bootstrap', 'ngRoute']);

app.controller('MainController', ['$scope', MainController]);
