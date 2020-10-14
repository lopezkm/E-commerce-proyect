const server = require( 'express' ).Router( );
const Promise = require( 'bluebird' );
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
			
			response.send(user);
		} )
		.catch( error => response.status( 400 ).send( error ) );
} );

/* =================================================================================
* 		[ Obtención de todos los usuarios ]
* ================================================================================= */

server.get( '/', ( request, response ) => {
	User.findAll( /* {
			include: [
				{ model: Order },
				{ model: Product }
			]
		}  */)
		.then( ( users ) => {
			response.status( 200 ).send( users );
		} )
        .catch( error => response.status( 400 ).send( error ) );
});

/* =================================================================================
* 		[ Obtención de un usuario particular ]
* ================================================================================= */
server.get( '/:id', ( request, response ) => {
	let { id } = request.params;
	
	User.findByPk( id )
		.then( user => {
			if ( !user ) {
				return response.sendStatus( 404 );
			}
			
			response.status( 200 ).send( user );
		} )
		.catch( error => response.status( 400 ).send( error ) );
} );

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
				.then( () => response.status( 200 ).send("Eliminado") );
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
			
			return user.update( { ...request.body } )
			.then(user => response.status(200).send(user))
		} )
		.catch( error => response.status( 400 ).send( error ) );
} );

/* =================================================================================
* 		[ Exportamos nuestras rutas ]
* ================================================================================= */

module.exports = server;