const server = require( 'express' ).Router( );
const Promise = require( 'bluebird' );
const { Product, Category, Media } = require( '../db.js' );

/* =================================================================================
* 		[ Obtención de todos los productos ]
* ================================================================================= */

server.get( '/', ( request, response, next ) => {
	Product.findAll( {
			include: [
				{ model: Media },
				{ model: Category }
			]
		} )
		.then( ( products ) => {
			response.status( 200 ).send( products );
		} )
		.catch( next );
} );

/* =================================================================================
* 		[ Búsqueda de un producto por identificador ]
* ================================================================================= */

server.get( '/:id', ( request, response, next ) => {
	const { id } = request.params;
	
	Product.findByPk( id, {
			include: [
				{ model: Media },
				{ model: Category }
			]
		} )
		.then( ( product ) => {
			if ( !product ) {
				return response.sendStatus( 404 );
			}
			
			response.send( product );
		} );
} );

/* =================================================================================
* 		[ Creación de la relación entre un producto y una categoría ]
* ================================================================================= */

server.post( '/:idProduct/category/:idCategory', ( request, response, next ) => {
	const { idProduct, idCategory } = request.params;
	const promises = [ ];
	
	promises.push( Product.findByPk( idProduct ) );
	promises.push( Category.findByPk( idCategory ) );
	
	Promise.all( promises )
		.spread( function( product, category ) {
			if ( !product || !category ) {
				return response.sendStatus( 404 );
			}
			
			product.addCategory( category )
				.then( ( data ) => {
					( !!data ) ?
						response.sendStatus( 201 ) : response.sendStatus( 409 );
				} );
		} );
} );

/* =================================================================================
* 		[ Eliminación de la relación entre un producto y una categoría ]
* ================================================================================= */

server.delete( '/:idProduct/category/:idCategory', ( request, response, next ) => {
	const { idProduct, idCategory } = request.params;
	const promises = [ ];
	
	promises.push( Product.findByPk( idProduct ) );
	promises.push( Category.findByPk( idCategory ) );
	
	Promise.all( promises )
		.spread( function( product, category ) {
			if ( !product || !category ) {
				return response.sendStatus( 404 );
			}
			
			product.removeCategory( category )
				.then( ( data ) => {
					( !!data ) ?
						response.sendStatus( 204 ) : response.sendStatus( 409 );
				} );
		} );
} );

/* =================================================================================
* 		[ Creación de un producto ]
* ================================================================================= */

server.post( '/', ( request, response ) => {
	Product.create( {
			...request.body
		} )
		.then( product => {
			if ( !product ) {
				return response.sendStatus( 400 );
			}
			
			return product
		} )
		.catch( error => response.status( 400 ).send( error ) );
} );

/* =================================================================================
* 		[ Modificación de un producto ]
* ================================================================================= */

server.put( '/:id', ( request, response ) => {
	const { id } = request.params;
	
	Product.findByPk( id )
		.then( product => {
			if ( !product ) {
				return response.sendStatus( 404 );
			}
			
			return product.update( { ...request.body } );
		} )
		.catch( error => response.status( 400 ).send( error ) );
} );

/* =================================================================================
* 		[ Eliminación de un producto ]
* ================================================================================= */

server.delete( '/:id', ( request, response ) => {
	let { id } = request.params;
	
	Product.findByPk( id )
		.then( product => {
			if ( !product ) {
				return response.sendStatus( 404 );
			}
			
			product.destroy( )
				.then( ( ) => res.sendStatus( 200 ) );
		} );
} );

/* =================================================================================
* 		[ Exportamos nuestras rutas ]
* ================================================================================= */

module.exports = server;