'use strict';

define( function () {
    return function ( $scope, Visualizers ) {
        $scope.page     = 1;
        $scope.per_page = 10;
        $scope.query    = function () {
            $scope.visualizers   = Visualizers.query({
                expanded        : true,
                page            : $scope.page,
                per_page        : $scope.per_page,
                sort            : 'type'
            });
        };

        $scope.$on( Visualizers.getEvent( 'QUERIED' ), function () {
            $scope.total    = Visualizers.getTotal();
        });

        $scope.query();
    };
});
