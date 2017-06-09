var express     = require( 'express' ),
    debug       = require( 'debug' )( 'app' ),
    app         = express(),
    livereload  = require( 'livereload' ),
    error       = require( './lib/error' ),
    start       = require( './lib/start' );

// Set the PORT and ENV variables and start the server
app.set( 'port', process.env.PORT || 3000 );
app.set( 'env', process.env.ENV || 'development' );
app.settings.env    = app.get( 'env' );
process.env.CDN_URL = process.env.CDN_URL   || 'http://cdn.datos.gob.mx/bower_components/';

start.launch( app );

// Set the CMS server routes
var cmsApi      = require( './routers/cmsApi' ),
    front       = require( './routers/front' );

app.use( '/cms-api', cmsApi );
app.use( '/', front );

app.use( error.notFound );
app.use( error.handler );

if ( app.get( 'env' ) == 'development' ) {
    var liveServer  = livereload.createServer();
    liveServer.watch( __dirname + '/public' );
}

var server      = app.listen( app.get('port'), function() {
    debug( 'Express server listening on port ' + server.address().port );
});
module.exports  = app;