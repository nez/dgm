'use strict'

define( function() {
    return function ( $scope, $stateParams, events, Visualizers ) {
      var uploading       = false;

      $scope.configCover  = {
          fileName    : 'cover_photo',
          url         : 'cms-api/visualizers'
      };
      $scope.configGrid       = {
          fileName    : 'grid_photo',
          url         : 'cms-api/visualizers'
      };
      $scope.visualizer  = Visualizers.get( $stateParams.id );

      $scope.create       = function () {
          if ( !uploading ) {
              delete $scope.visualizer.cover_photo;
              delete $scope.visualizer.grid_photo;
          }
          Visualizers.update( $stateParams.id, $scope.visualizer );
      };

      $scope.$on( events.FILEUPLOADER_DONE, function ( e, data ) {
          $scope.visualizer[ Object.keys( data )[0] ]   = data[ Object.keys( data )[0] ];

          switch (Object.keys(data)[0] ) {
            case "cover_photo":
              delete $scope.visualizer.grid_photo;
              break;
            case "grid_photo":
              delete $scope.visualizer.cover_photo;
              break;

          }
          uploading   = true;
          $scope.update();
      });

      $scope.$on( Visualizers.getEvent( 'UPDATED' ), function ( e, data ) {
          if ( !uploading ) {
                $scope.$state.go( 'visualizers.list' );
            } else {
                $scope.visualizer.cover_photo = data.cover_photo;
                $scope.visualizer.grid_photo = data.grid_photo;
                uploading   = false;
            }
      });

      $scope.$on( 'UPDATE_VISUALIZER', function () {
          $scope.create();
      });

    }

});
