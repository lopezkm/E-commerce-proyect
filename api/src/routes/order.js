const { Op } = require('sequelize');
const server = require( 'express' ).Router( );
const { Order } = require( '../db.js' );

/* =================================================================================
* 		[ Búsqueda y/o obtención de todas las órdenes ]
* ================================================================================= */

server.get( '/', ( request, response ) => {
	const { status } = request.query;
	const options = !status ? { } : { where: { status: status } };
	console.log(status);
	Order.findAll( options ).then( ( orders ) => {
		if ( !orders ) {
			return response.sendStatus( 404 );
		}
		
		response.status( 200 ).send( orders );
	} );
} );

/* =================================================================================
* 		[ Búsqueda de una orden por identificador ]
* ================================================================================= */

server.get( '/:id', ( request, response ) => {
	let { id } = request.params;
	
	Order.findByPk( id )
		.then( order => {
			if ( !order ) {
				return response.sendStatus( 404 );
			}
			
			response.status( 200 ).send( order );
		} )
		.catch( error => response.status( 400 ).send( error ) );
} );

/* =================================================================================
* 		[ Modificación de una orden ]
* ================================================================================= */

server.put( '/:id', ( request, response ) => {
	const { id } = request.params;
	
	Order.findByPk( id )
		.then( order => {
			if ( !order ) {
				return response.sendStatus( 404 );
			}
			
			return order.update( { ...request.body } )
				.then( order => response.status( 200 ).send( order ) );
		} )
		.catch( error => response.status( 400 ).send( error ) );
} );

/* =================================================================================
* 		[ Exportamos nuestras rutas ]
* ================================================================================= */

module.exports = server;