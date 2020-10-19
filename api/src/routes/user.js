const server = require( 'express' ).Router( );
const { Op } = require( 'sequelize' );
const { User, Order, Product } = require( '../db.js' );

/* =================================================================================
* 		[ Obtención de todas las órdenes de un usuario ]
* ================================================================================= */

/*
	- Retorna un arreglo con las órdenes pertenecientes al usuario.
	- Retorna todas las órdenes, no solo las que estén cerradas o abiertas.
	- Devuelve las órdenes ordenadas por fecha de creación (de más nueva a mas vieja)
*/

server.get( '/:id/orders', ( request, response ) => {
	const { id } = request.params;
	
	User.findByPk( id ).then( ( user ) => {
		if ( !user ) {
			return response.sendStatus( 404 );
		}
		
		user.getOrders( {
			order: [
				[ 'createdAt', 'DESC' ]
			]
		} ).then( ( orders ) => {
			response.status( 200 ).send( orders );
		} );
	} );
} );

/* =================================================================================
* 		[ Crea el carrito del usuario ]
* ================================================================================= */

/*
	- Crea el carrito (una orden en estado carrito) y lo devuelve
	- No agrega un producto sino que sirve para "inicializar" el carrito
*/

server.post( '/:id/cart', ( request, response ) => {
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
		if ( order ) {
			return response.sendStatus( 409 );
		}
		
		Order.create( {
			status: 'cart',
			userId: id
		} )
		.then( ( newOrder ) => {
			response.status( 201 ).send( newOrder );
		} );
	} );
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
	} );
} );

/* =================================================================================
* 		[ Vaciamiento del carrito del usuario ]
* ================================================================================= */

/*
	- Remueve los productos del carrito sin borrar el carrito
*/

server.delete( '/:id/cart', ( request, response ) => {
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
		
		order.removeProducts( ).then( ( ) => {
			response.sendStatus( 204 );
		} );
	} );
} );

/* =================================================================================
* 		[ Modificación del carrito del usuario ]
* ================================================================================= */

/*
	- Se pasa el id y cantidad del producto por body (productId y quantity)
	- Si la operación fue exitosa se devuelve 200, 201 o 204 (modificada/creada/eliminada)
	- Si la operación falló se devuelve un error 400
*/

server.put( '/:id/cart', ( request, response ) => {
	const { id } = request.params;
	const { productId, quantity } = request.body;
	
	Product.findByPk( productId ).then( ( product ) => {
		if ( !product ) {
			throw new Error( 'Product not found' );
		}
		
		if ( product.stock < quantity ) {
			throw new Error( 'Not enough stock' );
		}
		
		return Order.findOne( {
			where: {
				userId: id,
				status: 'cart'
			},
			include: {
				model: Product,
				required: false,
				where: {
					id: productId
				}
			}
		} );
	} )
	.then( ( order ) => {
		if ( !order ) {
			throw new Error( 'Order not found' );
		}
		
		if ( quantity <= 0 )
		{
			return OrderProduct.destroy( {
				where: {
					orderId: order.id,
					productId
				}
			} );
		}
		
		return OrderProduct.findOrCreate( {
			where: {
				orderId: order.id,
				productId
			},
			defaults: {
				price: product.price,
				quantity
			}
		} );
	} )
	.then( ( data ) => {
		if ( !Array.isArray( data ) ) {
			return response.sendStatus( 204 );
		}
		
		const [ orderline, created ] = data;
		
		if ( created )
		{
			return response.sendStatus( 201 );
		}
		
		orderline.update( { quantity } ).then( ( ) => {
			response.sendStatus( 200 );
		} );
	} );
} );

/* =================================================================================
* 		[ Obtención de un usuario particular ]
* ================================================================================= */

server.get( '/:id', ( request, response ) => {
	let { id } = request.params;
	
	User.findByPk( id ).then( user => {
		if ( !user ) {
			return response.sendStatus( 404 );
		}
		
		response.status( 200 ).send( user );
	} );
} );

/* =================================================================================
* 		[ Obtención de todos los usuarios ]
* ================================================================================= */

server.get( '/', ( request, response ) => {
	User.findAll( ).then( ( users ) => {
		response.status( 200 ).send( users );
	} );
} );

/* =================================================================================
* 		[ Creación de un usuario ]
* ================================================================================= */

server.post( '/', ( request, response ) => {
	User.create( {
		...request.body
	}, {
		fields: [ 'firstName', 'lastName', 'email', 'password' ]
	} )
	.then( ( user ) => {
		response.status( 200 ).send( user );
	} )
	.catch(err => response.status ( 409 ).send(err))
} );

/* =================================================================================
* 		[ Eliminación de un usuario ]
* ================================================================================= */

server.delete( '/:id', ( request, response ) => {
	let { id } = request.params;
	
	User.findByPk( id ).then( ( user ) => {
		if ( !user ) {
			return response.sendStatus( 404 );
		}
		
		user.destroy( ).then( ( ) => {
			response.sendStatus( 204 );
		} );
	} );
} );

/* =================================================================================
* 		[ Modificación de un usuario ]
* ================================================================================= */

server.put( '/:id', ( request, response ) => {
	const { id } = request.params;
	
	User.findByPk( id ).then( ( user ) => {
		if ( !user ) {
			return response.sendStatus( 404 );
		}
		
		return user.update( {
			...request.body
		}, {
			fields: [ 'firstName', 'lastName', 'email', 'password' ]
		} )
		.then( ( user ) => {
			response.status( 200 ).send( user );
		} );
	} );
} );

/* =================================================================================
* 		[ Exportamos nuestras rutas ]
* ================================================================================= */

module.exports = server;