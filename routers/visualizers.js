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
                    res.json( visualizer );
                }
            };
            cursor.exec( callback )
    });

    router.put('/:id', Session.validate, function (req, res, next){
        var cover_photo  = false;

        moveImg     = function ( field, visualizer ){
            Utils.move( req.body[field], path.join( config.uploads_path, viusalizer.id ), function ( e, file ) {
                visualizer[field] = file;
                visualizer.save( updated );
            });
        }

        var updated     = function ( err, visualizer ) {
            res.json( visualizer );
        };

        Visualizer.findById( req.params.id, function (err, visualizer) {
            if ( err || !visualizer ) {
                err     = new Error ('Invalid visualizer id');
                err.status = 404;
                next(err);

            } else {
              for( var key in  req.body ){
                if ( req.session.access_level == 3 ) {
                    if (  key == 'edition_date' || key == 'status' )
                        continue;
                }

                if ( key == 'cover_photo') {
                    if ( visualizer[key] == undefined || visualizer[key].path != req.body[key].path ) {
                        cover_photo  = true;
                    }
                    continue;
                }

                if ( key == 'edition_date' ) {
                    visualizer[key] = new Date();
                    continue;
                }

                visualizer[key] = req.body[key];
              }

              if ( cover_photo ){
                if ( visualizer.cover_photo ){
                  fs.unlink( visualizer.cover_photo.path, function(){
                      moveImg( 'cover_photo', visualizer );
                  });
                } else {
                    moveImg( 'cover_photo', visualizer );
                }
              }

              visualizer.save( updated );
            }
        });
    });

    router.post( '/', function ( req, res, next ) {
    });


module.exports  = router;
