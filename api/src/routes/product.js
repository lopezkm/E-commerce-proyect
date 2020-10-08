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

server.put('/:id', (request, response) => {
	const {id} = request.params;
	let { name, description, price, stock, media, developer, publisher, publishDate } = request.body;
	Product.findByPk(id)
	.then(product => {
		if(!product) {
			return response.status(404).send('El producto a modificar no existe')
		}
		
		name = name || product.name;
		description = description || product.description;
		price = price || product.price;
		stock = stock || product.stock;
		media = media || product.media;
		developer = developer || product.developer;
		publisher = publisher || product.publisher; 
		publishDate = publishDate || product.publishDate;
		
		return product.update({ name, description, price, stock, media, developer, publisher, publishDate })
	})
	.then( product => {
		return response.status(200).send(product)
	})
	.catch(err => response.status(401).send('Hiciste algo mal urita mocha'))
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

server.delete("/:id", (req, res) => {
	let { id } = req.params;
	Product.findByPk(id)
		.then(product => {
			if (!product) {
				return res.status(404).send("El producto a eliminar no existe.");
			}

			product.destroy()
			.then(() => res.sendStatus(200));
		});
});

module.exports = server;