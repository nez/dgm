'use strict';

define( function ( require ) {
    var VisualizersBaseCtrl       = require( 'visualizers/VisualizersBaseCtrl' );
    var VisualizersEditCtrl       = require( 'visualizers/VisualizersEditCtrl' );
    var VisualizersListCtrl       = require( 'visualizers/VisualizersListCtrl' );
    var VisualizersRouter         = require( 'visualizers/VisualizersRouter' );
    var VisualizersService        = require( 'visualizers/VisualizersService' );

    var VisualizersModule            = angular.module( 'VisualizersModule', []);

    VisualizersModule.config([ '$stateProvider', VisualizersRouter ]);

    VisualizersModule.controller( 'VisualizersBaseCtrl', [ '$scope', VisualizersBaseCtrl ]);

    VisualizersModule.controller( 'VisualizersEditCtrl', [ '$scope', '$stateParams', 'events', 'VisualizersService', VisualizersEditCtrl ]);

    VisualizersModule.controller( 'VisualizersListCtrl', [ '$scope', 'VisualizersService', VisualizersListCtrl ]);

    VisualizersModule.factory( 'VisualizersService', [ 'BaseService', VisualizersService ]);
});
