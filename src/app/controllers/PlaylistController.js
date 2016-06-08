module.exports = function($scope, $http) {
  console.log('yes i have been called');
  $scope.playlist = [];
  $http({
    method: 'GET',
    url: 'https://api.spotify.com/v1/search?q=artist:queen&amp;type=album&amp;market=us',
    data: {
        q: 'artist:queen',
        type: 'album',
        market: "US"
    }
  }).then(function successCallback(response) {
    $scope.albums = response.data.albums;
    console.log("albums:", $scope.albums);
    if($scope.albums !== null && $scope.albums.items !== null){
      for(var i = 0; i < $scope.albums.items.length; i++){
        $scope.playlist.push($scope.albums.items[i]);
      }
    }
    // when the response is available

  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log("failed ", response);
  });
};
