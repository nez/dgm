'use strict';

define( function ( require ) {
    var VisualizersBaseCtrl    = require( 'visualizers/VisualizersBaseCtrl' );
    var VisualizersListCtrl    = require( 'visualizers/VisualizersListCtrl' );
    var VisualizersEditCtrl       = require( 'visualizers/VisualizersEditCtrl' );
    var VisualizersRouter      = require( 'visualizers/VisualizersRouter' );
    var VisualizersService     = require( 'visualizers/VisualizersService' );

    var VisualizersModule      = angular.module( 'VisualizersModule', []);

    VisualizersModule.config([ '$stateProvider', VisualizersRouter ]);

    VisualizersModule.controller( 'VisualizersBaseCtrl', [ '$scope', VisualizersBaseCtrl ]);

    VisualizersModule.controller( 'VisualizersListCtrl', [ '$scope', 'VisualizersService', VisualizersListCtrl ]);

    VisualizersModule.controller( 'VisualizersEditCtrl', [ '$scope', '$stateParams', 'VisualizersService', VisualizersEditCtrl ]);

    VisualizersModule.factory( 'VisualizersService', [ 'BaseService', VisualizersService ]);
});
