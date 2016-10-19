'use strict'

define( function() {
    return function ( $scope, $stateParams, events, Visualizers ) {

      $scope.$on( 'VISUALIZER_UPDATE', function () {
          $scope.update();
      });
    }

});
