const server = require( 'express' ).Router( );
const { Op } = require( 'sequelize' );
const { User, Order } = require( '../db.js' );

/* =================================================================================
* 		[ Obtención de todas las órdenes de un usuario ]
* ================================================================================= */

/*
	- Retorna un arreglo con las órdenes pertenecientes al usuario.
	- Retorna todas las órdenes, no solo las que estén cerradas o abiertas.
	- Retorna las órdenes ordenadas por fecha de creación ( nueva > vieja )
*/

server.get( '/:id/orders', ( request, response ) => {
	const { id } = request.params;
	
	User.findByPk( id )
		.then( user => {
			if ( !user ) {
				return response.sendStatus( 404 );
			}
			
			user.getOrders( ).then( ( orders ) => {
				response.status( 200 ).send( orders );
			} );
		} )
		.catch( error => response.status( 500 ).send( error ) );
} );

/* =================================================================================
* 		[ Obtención de los productos del carrito del usuario ]
* ================================================================================= */

/*
	- El carrito es la última orden abierta que tenga el usuario
	- Si no tiene orden abierta retorna un estado 404
*/

server.get( '/:id/cart', ( request, response ) => {
	const { id } = request.params;
	
	Order.findOne( {
		where: {
			userId: id,
			status: {
				[ Op.or ]: [ 'cart', 'created', 'processing' ]
			}
		}
	} )
	.then( ( order ) => {
		if ( !order ) {
			return response.sendStatus( 404 );
		}
		
		order.getProducts( ).then( ( products ) => {
			response.send( 200 ).status( products );
		} );
	} )
	.catch( error => response.status( 500 ).send( error ) );
} );

/* =================================================================================
* 		[ Vaciamiento del carrito del usuario ]
* ================================================================================= */

server.delete( '/:id/cart', ( request, response ) => {
	const { id } = request.params;
	
	User.findByPk( id )
		.then( user => {
			if ( !user ) {
				return response.sendStatus( 404 );
			}
			
			return user.getOrders( {
				where: {
					status: {
						[ Op.or ]: [ 'cart', 'created', 'processing' ]
					}
				}
			} );
		} )
		.then( ( orders ) => {
			if ( !orders ) {
				return response.sendStatus( 404 );
			}
			
			orders[ 0 ].removeProducts( )
				.then( ( ) => response.sendStatus( 204 ) );
		} )
		.catch( error => response.status( 400 ).send( error ) );
} );

/* =================================================================================
* 		[ Modificación del carrito del usuario ]
* ================================================================================= */

server.put( '/:id/cart', ( request, response ) => {
	const { id } = request.params;
	const { productId, quantity } = request.body;
	
	User.findByPk( id )
		.then( user => {
			if ( !user ) {
				return response.sendStatus( 404 );
			}
			
			return user.getOrders( {
				where: {
					status: 'cart'
				}
			} );
		} )
		.then( ( orders ) => {
			if ( !orders ) {
				return response.sendStatus( 404 );
			}
			
			OrderProducts.findOne( { 
				where: {
					orderId: orders[ 0 ].id,
					productId: productId
				}
			} )
			.then( ( orderProduct ) => { 
				return orderProduct.update( { quantity } );
			} )
			.then( ( data ) => {
				response.send( 200 ).status( data );
			} );
		} )
		.catch( error => response.status( 400 ).send( error ) );
} );

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
* 		[ Obtención de todos los usuarios ]
* ================================================================================= */

server.get( '/', ( request, response ) => {
	User.findAll( ).then( ( users ) => {
			response.status( 200 ).send( users );
		} )
        .catch( error => response.status( 400 ).send( error ) );
} );

/* =================================================================================
* 		[ Agregado de un producto al carrito del usuario ]
* ================================================================================= */

server.post( '/:idUser/cart', ( request, response ) => {
	const { userId } = request.params;
	const { productId } = request.body;
	
	User.findByPk( userId )
		.then( ( user ) => {
			if ( !user ) {
				throw new Error( 'User not found' );
			}
			
			return Order.getOrders( {
				where: {
					status: {
						[ Op.or ]: [ 'cart', 'created', 'processing' ]
					}
				}
			} );
		} )
		.then( ( orders ) => {
			if ( orders ) {
				if ( orders[ 0 ].status !== 'cart' ) {
					throw new Error( 'User has an active order which is not editable' );
				}
				
				return orders[ 0 ];
			}
			
			return Order.create( {
				status: 'cart',
				userId: userId
			} );
		} )
		.then( ( order ) => {
			if ( !order ) {
				throw new Error( 'Cart could not be created/retrieved' );
			}
			
			Product.findByPk( productId )
				.then( ( product ) => product.addOrder( order ) )
				.then( ( data ) => response.status( 200 ).send( data ) )
		} )
		.catch( ( error ) => {
			console.log( error );
			response.status( 400 ).send( error );
		} );
} );

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
			
			response.send( user );
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
				.then( ( ) => response.status( 200 ).send( 'Eliminado' ) );
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
				.then( user => response.status( 200 ).send( user ) )
		} )
		.catch( error => response.status( 400 ).send( error ) );
} );

/* =================================================================================
* 		[ Exportamos nuestras rutas ]
* ================================================================================= */

module.exports = server;