module.exports = function($scope, $filter) {

  $scope.copyrightHolder = "Hotze Visser";
  $scope.copyrightText =   $scope.copyrightHolder + " " + $filter('date')(new Date(), 'yyyy');

};
