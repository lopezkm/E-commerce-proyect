const server = require( 'express' ).Router( );
const passport = require( 'passport' );

/* =================================================================================
* 		[ Identifica un usuario con su cuenta ]
* ================================================================================= */

server.post( '/login', passport.authenticate( 'local' ), ( request, response, next ) => {
	response.send( request.user );
} );

/* =================================================================================
* 		[ Se exportan las rutas ]
* ================================================================================= */

module.exports = server;