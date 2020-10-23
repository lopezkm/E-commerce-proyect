const server = require( 'express' ).Router( );
const passport = require( 'passport' );

const { isAuthenticated, hasAccessLevel, ACCESS_LEVELS } = require( '../passport.js' );
const { ACCESS_LEVEL_USER, ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_SUPER } = ACCESS_LEVELS;

/* =================================================================================
* 		[ Registra una nueva cuenta de usuario ]
* ================================================================================= */

server.post( '/signup', ( request, response, next ) => {
	if ( request.isAuthenticated( ) ) {
		return response.status( 400 ).send( { message: 'User is already logged in' } );
	}
	
	const { firstName, lastName, email, password } = request.body;
	
	User.findOrCreate( {
		where: {
			email
		},
		defaults: {
			firstName,
			lastName,
			password
		}
	} )
	.then( ( [ user, created ] ) => {
		if ( !created ) {
			return response.status( 409 ).send( 'User already exists' );
		}
		
		request.login( user, ( error ) => {
			if ( error ) {
				throw new Error( error );
			}
			
			response.status( 200 ).send( user );
		} );
	} )
	.catch( ( error ) => {
		response.sendStatus( 500 );
	} );
} );

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
* 		[ Borra la sesión de un usuario ]
* ================================================================================= */

server.get( '/logout', isAuthenticated, ( request, response, next ) => {
	request.logout( );
	response.sendStatus( 200 );
} );

/* =================================================================================
* 		[ Promueve un usuario (incrementa su nivel de acceso) ]
* ================================================================================= */

server.get( '/promote/:id', hasAccessLevel( ACCESS_LEVEL_SUPER ), ( request, response, next ) => {
	const { id } = request.params;
	
	if ( isNaN( id ) ) {
		return response.sendStatus( 400 );
	}
	
	User.findByPk( id ).then( ( user ) => {
		if ( !user ) {
			return response.sendStatus( 404 );
		}
		
		if ( user.accessLevel !== ACCESS_LEVEL_USER ) {
			return response.sendStatus( 409 );
		}
		
		user.increment( 'accessLevel', { by: 1 } )
			.then( ( response ) => response.sendStatus( 204 ) );
	} )
	.catch( ( error ) => {
		response.sendStatus( 500 );
	} );
} );

/* =================================================================================
* 		[ Degrada un usuario (decrementa su nivel de acceso) ]
* ================================================================================= */

server.get( '/demote/:id', hasAccessLevel( ACCESS_LEVEL_SUPER ), ( request, response, next ) => {
	const { id } = request.params;
	
	if ( isNaN( id ) ) {
		return response.sendStatus( 400 );
	}
	
	User.findByPk( id ).then( ( user ) => {
		if ( !user ) {
			return response.sendStatus( 404 );
		}
		
		if ( user.accessLevel !== ACCESS_LEVEL_ADMIN ) {
			return response.sendStatus( 409 );
		}
		
		user.decrement( 'accessLevel', { by: 1 } )
			.then( ( response ) => response.sendStatus( 204 ) );
	} )
	.catch( ( error ) => {
		response.sendStatus( 500 );
	} );
} );

/* =================================================================================
* 		[ Se exportan las rutas ]
* ================================================================================= */

module.exports = server;