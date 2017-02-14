var bodyParser      = require( 'body-parser' ),
    buildify        = require( 'buildify' ),
    express         = require( 'express' ),
    fs              = require( 'fs' ),
    less            = require( 'less' ),
    methodOverride  = require( 'method-override' ),
    mkdirp          = require( 'mkdirp' ),
    mongoose        = require( 'mongoose' ),
    morgan          = require( 'morgan' ),
    path            = require( 'path' ),
    watch           = require( 'node-watch' ),
    requirejs       = require( 'requirejs' ),
    wiredep         = require( 'wiredep' ),
    db              = require( '../config/db' ),
    Utils           = require( './utils' );

exports.launch      = function ( app ) {
    app.use( Utils.cors );

    app.use( morgan( 'dev' ) );
    app.use( bodyParser.json({
            limit       : '10mb'
        }) );
    app.use( bodyParser.urlencoded({
            extended    : false,
            limit       : '10mb'
        }) );
    app.use( methodOverride() );
    app.use( express.static( path.join( __dirname, '../public' ) ) );
    app.use( '/public', express.static( path.join( __dirname, '../public' ) ) );

    app.set( 'views', path.join( __dirname, '../views' ) );
    app.set( 'view engine', 'jade' );

    mkdirp( 'public/tmp' );

    app.use( Utils.params );

    var jsDeps  = [],
        cssDeps = [];

    connectDB();
    setStyles();
    wiredep({
        exclude         : [ 'require.js' ],
        ignorePath      : '../public/',
        src             : [ './views/index.jade', './views/layout.jade' ],
        onPathInjected  : function ( fileObject ) {
            if ( fileObject.block == 'js' ) {
                jsDeps.push( path.join( 'public', fileObject.path ) );
            } else if ( fileObject.block == 'css' ) {
                cssDeps.push( path.join( 'public', fileObject.path ) );
            }
        }
    });

    if ( app.get( 'env' ) == 'production' ) {
        compile( jsDeps, cssDeps );
    }
};

function connectDB () {
    var conn_str    = 'mongodb://';

    if ( db.user ) {
        conn_str    += db.user;
        if ( db.pass ) {
            conn_str    += ':' + db.pass;
        }
        conn_str    += '@';
    }
    conn_str        += db.host + ':' + db.port + '/' + db.database;

    var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

    mongoose.connect( conn_str, options );
};

function setStyles () {
    // Compile frontend less styles
    var stylesPath      = path.join( path.join( __dirname, '../public', 'less', 'style.less' ) ),
        compile         = function () {
            var styles  = fs.readFileSync( stylesPath, 'utf8' );
            less.render( styles, {
                compress    : true,
                filename    : 'style.less',
                paths       : [ path.join( __dirname, '../public' ) ]
            }, function ( e, output ) {
                if ( !e ) {
                    fs.writeFileSync( path.join( __dirname, '../public', 'css', 'style.css' ), output.css );
                }
            });
        };

    watch( stylesPath, compile );
    compile();
};

function compile( js, css ) {
    requirejs.optimize({
        baseUrl         : 'public/js',
        mainConfigFile  : 'public/js/main.js',
        name            : 'main',
        out             : 'public/built/main.js'
    });

    buildify()
        .concat( js )
        .uglify()
        .save( 'public/built/vendor.js' );

    buildify()
        .concat( css )
        .cssmin()
        .save( 'public/css/vendor.css' );

    fs.readFile( 'views/index.jade', 'utf8', function ( err, data ) {
        var result  = data.replace( /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi, "    // bower:js\n    script( src='built/vendor.js' )\n    // endbower" );

        fs.writeFile( 'views/index.jade', result, 'utf8' );
    });

    fs.readFile( 'views/layout.jade', 'utf8', function ( err, data ) {
        var result  = data.replace( /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi, "        // bower:css\n        link( rel='stylesheet' href='css/vendor.css' )\n        // endbower" );

        fs.writeFile( 'views/layout.jade', result, 'utf8' );
    });
};
