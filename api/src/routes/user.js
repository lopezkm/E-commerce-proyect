const server = require( 'express' ).Router( );
const { Op } = require( 'sequelize' );
const { User, Order, Product, OrderProduct } = require( '../db.js' );

const { isAuthenticated, hasAccessLevel, ACCESS_LEVELS } = require( '../passport.js' );
const { ACCESS_LEVEL_USER } = ACCESS_LEVELS;

/* =================================================================================
* 		[ Obtención de todas las órdenes de un usuario ]
* ================================================================================= */

/*
	- Retorna un arreglo con las órdenes pertenecientes al usuario.
	- Retorna todas las órdenes, no solo las que estén cerradas o abiertas.
	- Devuelve las órdenes ordenadas por fecha de creación (de más nueva a mas vieja)
*/

server.get( '/:id/orders', isAuthenticated, ( request, response ) => {
	const { id } = request.params;
	
	if ( ( id !== request.user.id ) && ( request.user.accessLevel === ACCESS_LEVEL_USER ) ) {
		return response.status( 401 ).send( 'Not allowed to visualize another user\'s orders' );
	}
	
	User.findByPk( id ).then( ( user ) => {
		if ( !user ) {
			return response.sendStatus( 404 );
		}
		
		user.getOrders( {
			order: [
				[ 'createdAt', 'DESC' ]
			],
			include: {
				model: Product
			}
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

server.post( '/:id/cart', isAuthenticated, ( request, response ) => {
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

server.get( '/:id/cart', isAuthenticated, ( request, response ) => {
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
			response.status( 200 ).send( products );
		} );
	} );
} );

/* =================================================================================
* 		[ Vaciamiento del carrito del usuario ]
* ================================================================================= */

/*
	- Remueve los productos del carrito sin borrar el carrito
*/

server.delete( '/:id/cart', isAuthenticated, ( request, response ) => {
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

server.put( '/:id/cart', isAuthenticated, ( request, response, next ) => {
	const { id } = request.params;
	const { productId, quantity } = request.body;
	
	let price;
	
	Product.findByPk( productId ).then( ( product ) => {
		if ( !product ) {
			throw new Error( 'Product not found' );
		}
		
		if ( product.stock < quantity ) {
			throw new Error( 'Not enough stock' );
		}
		
		price = product.price;
		
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
				price,
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
	} )
	.catch( ( error ) => {
		next( error );
	} );
} );

/* =================================================================================
* 		[ Obtención de un usuario particular ]
* ================================================================================= */

server.get( '/:id', hasAccessLevel( ), ( request, response ) => {
	let { id } = request.params;
	
	User.findByPk( id ).then( ( user ) => {
		if ( !user ) {
			return response.sendStatus( 404 );
		}
		
		response.status( 200 ).send( user );
	} );
} );

/* =================================================================================
* 		[ Obtención de todos los usuarios ]
* ================================================================================= */

server.get( '/', hasAccessLevel( ), ( request, response ) => {
	User.findAll( ).then( ( users ) => {
		response.status( 200 ).send( users );
	} );
} );

/* =================================================================================
* 		[ Modificación de un usuario ]
* ================================================================================= */

server.put( '/:id', hasAccessLevel( ), ( request, response ) => {
	const { id } = request.params;
	
	User.findByPk( id ).then( ( user ) => {
		if ( !user ) {
			return response.sendStatus( 404 );
		}
		
		return user.update( {
			...request.body
		}, {
			fields: [ 'firstName', 'lastName', 'email' ]
		} )
		.then( ( user ) => {
			response.status( 200 ).send( user );
		} );
	} );
} );

/* =================================================================================
* 		[ Eliminación de un usuario ]
* ================================================================================= */

server.delete( '/:id', hasAccessLevel( ), ( request, response ) => {
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
* 		[ Exportamos nuestras rutas ]
* ================================================================================= */

module.exports = server;