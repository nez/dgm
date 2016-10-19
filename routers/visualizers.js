var express     = require( 'express' ),
    mongoose    = require( 'mongoose' ),
    config      = require( '../config/app' ),
    Visualizer     = require( '../models/visualizer' ),
    Utils       = require( '../lib/utils' ),
    Session     = require( '../lib/session' ),
    router      = express.Router();

    router.get( '', function ( req, res, next ) {
        var filters = [ 'name', 'edition_date', 'status' ];

        Utils.paginate( Visualizer, filters, [], req, res, next );
    });


module.exports  = router;
