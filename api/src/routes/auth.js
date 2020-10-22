const server = require( 'express' ).Router( );
const passport = require( 'passport' );
const { User } = require( '../db.js' );

server.post( '/login', passport.authenticate( 'local', {
	successMessage: 'Auth OK',
	failureMessage: 'Error'
} ), ( request, response, next ) => {
	response.send( request.user );
} );

server.get( '/test', ( request, response, next ) => {
	if ( request.isAuthenticated( ) ) {
		return response.sendStatus( 200 );
	}
	
	return response.sendStatus( 401 );
} );

module.exports = server;