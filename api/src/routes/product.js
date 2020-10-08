const server = require( 'express' ).Router( );
const { Product, Category } = require( '../db.js' );
const Promise = require( 'bluebird' );
const { request, response } = require('express');

server.get( '/', ( request, response, next ) => {
	Product.findAll( )
		.then( ( products ) => {
			response.send( products );
		} );
} );

server.get( '/:id', ( request, response, next ) => {
	const { id } = request.params;
	
	Product.findByPk( id )
		.then( ( product ) => {
			if ( !product ) {
				return response.sendStatus( 404 );
			}
			
			response.send( product );
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

server.post('/', (request, response) => {
	const { name, description, price, stock, media, developer, publisher, publishDate} = request.body;
	if(!name || !description || !price || !stock || !media || !developer || !publisher || !publishDate){
		return response.status(400).send('Verifique que todos los campos esten completos');
	}

	Product.create({
		name,
		description,
		price, 
		stock, 
		media, 
		developer, 
		publisher, 
		publishDate
	})
	.then(product => response.status(201).send(product))
	.catch(() => response.status(409).send('El producto que intenta ingresar ya existe'));
});

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