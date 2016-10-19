'use strict'

define( function() {
    return function ( $stateProvider ){
        $stateProvider
            .state('visualizers', {
                abstract  :true,
                parent    : 'admin',
                url       : '/visualizers',
                views     : {
                    'admin-main'  : {
                      templateUrl : 'partials/visualizers/base',
                      contoller   : 'VisualizersBaseCtrl'
                    }
                }
            })
            .state( 'visualizers.list', {
                url     : '/list',
                views   : {
                  'visualizers-main'  : {
                      templateUrl     : 'partials/visualizers/list',
                      controller      : 'VisualizersListCtrl'

                  }
                }
            });
    };

});
