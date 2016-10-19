'use strict'

define( function() {
  return function( $scope ){
    $scope.update = function() {
      $scope.$broadcast( 'VISUALIZER_UPDATE');
    };
  };
});
