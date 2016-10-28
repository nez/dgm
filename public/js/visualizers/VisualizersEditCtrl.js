'use strict'

define( function() {
    return function ( $scope, $stateParams, events, Visualizers ) {
      var uploading       = false;

      $scope.configCover  = {
          fileName    : 'cover_photo',
          url         : 'cms-api/visualizers'
      };

      $scope.visualizer  = Visualizers.get( $stateParams.id );

      $scope.create       = function () {
          if ( !uploading ) {
              delete $scope.visualizer.cover_photo;
          }
          Visualizers.update( $stateParams.id, $scope.visualizer );
      };

      $scope.$on( events.FILEUPLOADER_DONE, function ( e, data ) {
          $scope.visualizer[ Object.keys( data )[0] ]   = data[ Object.keys( data )[0] ];
          uploading   = true;
          $scope.update();
      });

      $scope.$on( Visualizers.getEvent( 'UPDATED' ), function ( e, data ) {
          if ( !uploading ) {
                $scope.$state.go( 'visualizer.list' );
            } else {
                $scope.visualizer.cover_photo = data.cover_photo;
                uploading   = false;
            }
      });

      $scope.$on( 'UPDATE_VISUALIZER', function () {
          $scope.create();
      });

    }

});
