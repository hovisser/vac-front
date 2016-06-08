module.exports = angular.module('app')
  .component('playlistSpotify', {
    templateUrl: 'templates/playlist.html',
    controller: 'PlaylistController'
  })
  .controller('PlaylistController', ['$scope', '$http', require('../controllers/PlaylistController')]);
