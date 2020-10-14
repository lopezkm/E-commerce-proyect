const server = require( 'express' ).Router( );
//const Promise = require( 'bluebird' );
const { User, Product } = require( '../db.js' );

/* =================================================================================
* 		[ Creación de un usuario ]
* ================================================================================= */

server.post( '/', ( request, response ) => {
	User.create( {
			...request.body
		} )
		.then( user => {
			if ( !user ) {
				return response.sendStatus( 400 );
			}
			
			return user
		} )
		.catch( error => response.status( 400 ).send( error ) );
} );

/* =================================================================================
* 		[ Obtención de todos los usuarios ]
* ================================================================================= */

server.get( '/', ( request, response, next ) => {
	Product.findAll( {
			include: [
				{ model: Order },
				{ model: Product }
			]
		} )
		.then( ( products ) => {
			response.status( 200 ).send( products );
		} )
		.catch( next );