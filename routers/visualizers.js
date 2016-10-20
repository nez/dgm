var express     = require( 'express' ),
    mongoose    = require( 'mongoose' ),
    path        = require( 'path' ),
    rimraf      = require( 'rimraf' ),
    config      = require( '../config/app' ),
    Visualizer     = require( '../models/visualizer' ),
    Utils       = require( '../lib/utils' ),
    Session     = require( '../lib/session' ),
    router      = express.Router(),
    _getRefs    = function () {
        return [
            {
                field   : 'name',
                select  : 'name slug'
            }
          ]};

    router.get( '', function ( req, res, next ) {
        var filters = [ 'name', 'edition_date', 'status' ];

        Utils.paginate( Visualizer, filters, [], req, res, next );
    });

    router.get( '/:id', function ( req, res, next ) {
        var query       = { _id : mongoose.Types.ObjectId( req.params.id ) } ,
            cursor      = Visualizer.findOne( query ),
            callback    = function ( err, visualizer ) {
                if ( err || !visualizer ) {
                    err         = new Error( 'Invalid visualizer id' );
                    err.status  = 404;
                    next( err );
                } else {
                  console.log('ENTER!!')
                    res.json( visualizer );
                }
            };
            cursor.exec( callback )
    });

    router.put('/:id', Session.validate, function (req, res, next){


        Visualizer.findById( req.params.id, function (err, visualizer) {
            if ( err || !visualizer ) {
                err     = new Error ('Invalid visualizer id');
                err.status = 404;
                next(err);

            } else {
              //fill dates with information request
              for( var key in  req.body ){
                visualizer[key] = req.body[key];
              }

              visualizer.save( visualizer );
            }

        });
    });


module.exports  = router;
