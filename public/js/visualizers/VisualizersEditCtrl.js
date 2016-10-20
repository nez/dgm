'use strict'

define( function() {
    return function ( $scope, $stateParams, Visualizers ) {
      var uploading       = false;

      $scope.configCover  = {
          fileName    : 'cover_photo',
          url         : 'cms-api/visualizers'
      };


      $scope.$on( Visualizers.getEvent( 'UPDATED' ), function () {
          $scope.$state.go( 'visualizers.list' );
      });
      $scope.visualizer  = Visualizers.get( $stateParams.id );

      $scope.update       = function () {
          Visualizers.update( $stateParams.id, $scope.visualizer );
      };

      $scope.$on( 'VISUALIZER_UPDATE', function () {
          $scope.create();
      });
    }

});
