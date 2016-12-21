var express         = require( 'express' ),
    categories      = require( './categories' ),
    collections     = require( './collections' ),
    datasets        = require( './datasets' ),
    posts           = require( './posts' ),
    users           = require( './users' ),
    sessions        = require( './sessions' ),
    visualizers     = require( './visualizers')
    SessionHandler  = require( '../lib/session' ),
    cmsApi          = express.Router();

cmsApi.use( '/categories', categories );
cmsApi.use( '/datasets', datasets );
cmsApi.use( '/sessions', sessions );
cmsApi.use( '/posts', posts );
cmsApi.use( '/visualizers', visualizers)

// Validate the user's session
cmsApi.use( SessionHandler.validate );

// Members only resources
cmsApi.use( '/collections', collections );
cmsApi.use( '/users', users );

module.exports  = cmsApi;
