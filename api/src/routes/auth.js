const server = require( 'express' ).Router( );
const passport = require( 'passport' );

const { isAuthenticated, hasAccessLevel, ACCESS_LEVELS } = require( '../passport.js' );
const { ACCESS_LEVEL_USER, ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_SUPER } = ACCESS_LEVELS;

/* =================================================================================
* 		[ Identifica un usuario con su cuenta ]
* ================================================================================= */

server.post( '/login', passport.authenticate( 'local' ), ( request, response, next ) => {
	response.send( request.user );
} );

/* =================================================================================
* 		[ Devuelve el usuario logueado o 401 en caso contrario ]
* ================================================================================= */

server.get( '/me', isAuthenticated, ( request, response, next ) => {
	response.status( 200 ).send( request.user );
} );

/* =================================================================================
* 		[ Se exportan las rutas ]
* ================================================================================= */

module.exports = server;