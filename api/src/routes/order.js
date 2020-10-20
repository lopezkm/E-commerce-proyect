const server = require( 'express' ).Router( );
const { Op } = require( 'sequelize' );
const { Order, Product, User } = require( '../db.js' );

/* =================================================================================
* 		[ Búsqueda y/o obtención de todas las órdenes ]
* ================================================================================= */

/*
	- Puede recibir un "status" en query para devolver solo las órdenes que pertenezcan a un estado en particular
	- Puede recibir mas de un status separados por comas para buscar por varios status a la vez (OR)
	- Devuelve las órdenes ordenadas por fecha de creación (de más nueva a mas vieja)
*/

server.get( '/', ( request, response ) => {
	const { status } = request.query;
	const options = {
		where: status && {
			status: {
				[ Op.or ]: status.split( ',' )
			}
		},
		order: [
			[ 'createdAt', 'DESC' ]
		],
		include: [
			{ model: Product }
		],
		include: [
			{ model: User }
		]
	};
	
	Order.findAll( options ).then( ( orders ) => {
		response.status( 200 ).send( orders );
	} );
} );

/* =================================================================================
* 		[ Búsqueda de una orden por identificador ]
* ================================================================================= */

server.get( '/:id', ( request, response ) => {
	let { id } = request.params;
	
	Order.findByPk( id, {
		include: [
			{ model: Product }
		]
	} )
	.then( ( order ) => {
		if ( !order ) {
			return response.sendStatus( 404 );
		}
		
		response.status( 200 ).send( order );
	} );
} );

/* =================================================================================
* 		[ Modificación de una orden ]
* ================================================================================= */

/*
	- Se pasan por body las propiedades a cambiar con sus respectivos valores
*/

server.put( '/:id', ( request, response ) => {
	const { id } = request.params;
	
	Order.findByPk( id, {
		include: [
			{ model: Product }
		]
	} )
	.then( ( order ) => {
		if ( !order ) {
			return response.sendStatus( 404 );
		}
		
		return order.update( {
			...request.body
		}, {
			fields: [ 'status' ]
		} )
		.then( ( order ) => {
			response.status( 200 ).send( order );
		} )
		.catch( ( error ) => {
			response.status( 500 ).send( error.message );
		} );
	} );
} );

/* =================================================================================
* 		[ Exportamos nuestras rutas ]
* ================================================================================= */

module.exports = server;