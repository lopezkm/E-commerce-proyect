const server = require( 'express' ).Router( );
//const Promise = require( 'bluebird' );
const { User, Product, Order } = require( '../db.js' );

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
	User.findAll( {
			include: [
				{ model: Order },
				{ model: Product }
			]
		} )
		.then( ( users ) => {
			response.status( 200 ).send( users );
		} )
        .catch( next );
});

/* =================================================================================
* 		[ Eliminación de un usuario ]
* ================================================================================= */

server.delete( '/:id', ( request, response ) => {
	let { id } = request.params;
	
	User.findByPk( id )
		.then( user => {
			if ( !user ) {
				return response.sendStatus( 404 );
			}
			
			user.destroy( )
				.then( ( ) => res.sendStatus( 200 ) );
		} );
} );

/* =================================================================================
* 		[ Modificación de un usuario ]
* ================================================================================= */

server.put( '/:id', ( request, response ) => {
	const { id } = request.params;
	
	User.findByPk( id )
		.then( user => {
			if ( !user ) {
				return response.sendStatus( 404 );
			}
			
			return user.update( { ...request.body } );
		} )
		.catch( error => response.status( 400 ).send( error ) );
} );