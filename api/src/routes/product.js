const server = require( 'express' ).Router( );
const { Product, Category } = require( '../db.js' );
const Promise = require( 'bluebird' );

server.get( '/', ( request, response, next ) => {
	Product.findAll( )
		.then( ( products ) => {
			response.send( products );
		} );
} );

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

module.exports = server;