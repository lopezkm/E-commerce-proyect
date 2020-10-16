const server = require( 'express' ).Router( );
const { Order } = require( '../db.js' );

/* =================================================================================
* 		[ Búsqueda y/o obtención de todas las órdenes ]
* ================================================================================= */

/*
	- Puede recibir un "status" en query para devolver solo las órdenes que pertenezcan a un estado en particular
	- Puede recibir mas de un status separado por coma para buscar por mas de un status a la vez
*/

server.get( '/', ( request, response ) => {
	const { status } = request.query;
	const options = !status ? { } : { where: { status: { [ Op.or ]: status.split( ',' ) } } };
	
	Order.findAll( options )
		.then( ( orders ) => response.status( 200 ).send( orders ) )
		.catch( ( error ) => response.status( 500 ).send( error ) );
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