'use strict'

define( function() {
    return function ( $stateProvider ){
        $stateProvider
            .state('visualizers', {
                abstract  : true,
                parent    : 'admin',
                url       : '/visualizers',
                views     : {
                    'admin-main'  : {
                      templateUrl : 'partials/visualizers/base',
                      controller   : 'VisualizersBaseCtrl'
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
            })
            .state( 'visualizers.edit', {
                url     : '/edit/:id',
                views   : {
                  'visualizers-main'  : {
                      templateUrl     : 'partials/visualizers/create',
                      controller      : 'VisualizersEditCtrl'
                  }
                }
            });
    };

});
