'use strict';

define( function () {
    return function ( $scope, $cookies, $modal, Visualizers ) {
        $scope.closeFunctionality   = function () {
            $( '#site-functionality' ).css( 'display', 'none' );

            $cookies.put( 'dgm.functionality.dismissed', true );
        };
        $scope.openVideo            = function ( e ) {
            e.preventDefault();

            $modal.open({
                controller  : 'FrontPopupCtrl',
                size        : 'lg',
                templateUrl : 'partials/front/popup'
            });
        };

        if ( !$cookies.get( 'dgm.functionality.dismissed' ) ) {
            $( '#site-functionality' ).css( 'display', 'block' );
        }

        Visualizers.query({
            page        : 1,
            per_page    : 1,
            status      : "PUBLISHED"
        }).$promise.then( function ( data ){
            $scope.visualizerPublish = true;
            if( !data[0] )
                $scope.visualizerPublish = false;
        });
    };
});
