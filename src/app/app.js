require('angular');
require('angular-ui-bootstrap');
var app = angular.module('app', ['ui.bootstrap']);

app.controller('MainController', function($scope) {
    $scope.message = 'Whatever';
});
