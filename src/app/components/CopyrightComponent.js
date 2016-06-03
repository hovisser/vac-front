module.exports = angular.module('app')
  .component('copyrightFooter', {
    templateUrl: 'templates/footer.html',
    controller: 'FooterController'
  })
  .controller('FooterController', ['$scope', '$filter', require('../controllers/FooterController')]);
