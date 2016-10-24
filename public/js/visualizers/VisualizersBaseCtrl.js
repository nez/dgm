'use strict'

define( function() {
    return function ( $scope ){
        $scope.remove   = function () {
            $scope.$broadcast( 'REMOVE_VISUALIZER' );
        };
        $scope.save     = function () {
            $scope.$broadcast( 'CREATE_VISUALIZER' );
        };
        $scope.update   = function () {
            $scope.$broadcast( 'UPDATE_VISUALIZER' );
        };

    };
});
