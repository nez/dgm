'use strict';

define( function () {
    return function ( BaseService ) {
        var VisualizersService = new BaseService( 'visualizers' );

        return VisualizersService;
    };
});
