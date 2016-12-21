var express     = require( 'express' ),
    fs          = require( 'fs' ),
    mongoose    = require( 'mongoose' ),
    path        = require( 'path' ),
    rimraf      = require( 'rimraf' ),
    config      = require( '../config/app' ),
    Visualizer  = require( '../models/visualizer' ),
    Session     = require( '../lib/session' ),
    Utils       = require( '../lib/utils' ),
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

    router.post('/', Session.validate, function(req, res, next){
        moveImg     = function ( field, visualizer ){
            Utils.move( req.body[field], path.join( config.uploads_path, viusalizer.id ), function ( e, file ) {
                visualizer[field] = file;
                visualizer.save( updated );
            });
        }

        if ( req.session.access_level > 2 ) {
            var err     = new Error( 'Permission denied' );
            err.status  = 401;
            next( err );
        } else {
            if ( req.uploading ) {
                Utils.upload( req, req.body.file, path.join( config.uploads_tmp_path ), function ( e, file ) {
                    if ( e ) {
                        next( e );
                    } else {
                        res.json( file );
                    }
                });
            } else {

                Visualizer.create({
                    edition_date : req.body.description,
                    link        : req.body.link,
                    name        : req.body.name,
                    status      : req.body.status
                }, function ( err, visualizer ) {
                    if ( err || !visualizer ) {
                        err         = new Error( 'Invalid visualizer data' );
                        err.status  = 403;
                        next( err );
                    } else {
                        if ( req.body.cover_photo || req.body.grid_photo ) {
                          if( req.body.cover_photo ) {
                            moveFile( 'cover_photo', visualizer );
                          }

                          if( req.body.grid_photo ) {
                            moveFile( 'grid_photo', visualizer );
                          }
                        }

                        res.json( visualizer );
                    }
                });
            }
        }
    });

    router.put('/:id', Session.validate, function (req, res, next){
         var uploading   = {
            cover_photo     : false,
            grid_photo      : false
        },
        moveImg     = function ( field, visualizer ) {
            Utils.move( req.body[field], path.join( config.uploads_path, visualizer.id ), function ( e, file ) {
                visualizer[field] = file;
                visualizer.save( updated );
            });
        },
        updated     = function ( err, visualizer ) {
            res.json( visualizer );
        };

    Visualizer.findById( req.params.id, function ( err, visualizer ) {
        if ( err || !visualizer ) {
            err         = new Error( 'Invalid visualizer id' );
            err.status  = 404;
            next( err );
        } else {
            for ( var key in req.body ) {
                if ( req.session.access_level == 3 ) {
                    if (  key == 'edition_date' || key == 'status' )
                        continue;
                }

                if ( key == 'edition_date'){
                    visualizer[key]   = new Date();
                    continue;
                }

                if ( key == 'cover_photo' || key=='grid_photo') {
                    if ( visualizer[key] == undefined || visualizer[key].path != req.body[key].path ){
                        uploading[key]  = true;
                    }
                    continue;
                }

                visualizer[key]   = req.body[key];
            }

            if ( uploading.cover_photo  || uploading.grid_photo) {
                if ( uploading.cover_photo ) {
                    if ( visualizer.cover_photo ) {
                        fs.unlink( visualizer.cover_photo.path, function () {
                            moveImg( 'cover_photo', visualizer );
                        });
                    } else {
                        moveImg( 'cover_photo', visualizer );
                    }
                }
                if ( uploading.grid_photo ) {
                  if( visualizer.grid_photo ) {
                    fs.unlink( visualizer.grid_photo.path, function() {
                      moveImg( 'grid_photo', visualizer)
                    })
                  } else {
                    moveImg( 'grid_photo', visualizer );
                  }
                }
            } else {
                visualizer.save( updated );
            }
        }
    });

    });


module.exports  = router;
