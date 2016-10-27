'use strict'

define( function() {
    return function ( $scope, $stateParams, events, Visualizers ) {
      var uploading       = false;

      $scope.configCover  = {
          fileName    : 'cover_photo',
          url         : 'cms-api/visualizers'
      };

      $scope.configGrid   = {
          fileName        : 'grid_photo',
          url             : 'cms-api/categories'
      }

      $scope.visualizer  = Visualizers.get( $stateParams.id );

      $scope.update       = function () {
          Visualizers.update( $stateParams.id, $scope.visualizer );
      };

      $scope.$on( events.FILEUPLOADER_DONE, function ( e, data ) {
          $scope.visualizer[ Object.keys( data )[0] ]   = data[ Object.keys( data )[0] ];
          uploading   = true;
          $scope.update();
      });

      $scope.$on( Visualizers.getEvent( 'UPDATED' ), function ( e, data ) {
          if ( !uploading ) {
              $scope.$state.go( 'visualizers.list' );
          } else {
              $scope.visualizers.cover_photo = data.cover_photo;
              uploading   = false;
          }
      });

      $scope.$on( 'UPDATE_VISUALIZER', function () {
          $scope.update();
      });

    }

});
