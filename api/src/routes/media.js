const server = require( 'express' ).Router( );
const { Media } = require( '../db.js' );

/* =================================================================================
* 		[ Creación de la relación entre un producto y una media ]
* ================================================================================= */

server.post( '/:idMedia/product/:idProduct', ( request, response, next ) => {
	const { idMedia, idProduct } = request.params;
	const promises = [ ];
	
	promises.push( Media.findByPk( idMedia ) );
	promises.push( Product.findByPk( idProduct ) );
	
	Promise.all( promises )
		.spread( function( media, product ) {
			if ( !media || !product ) {
				return response.sendStatus( 404 );
			}
			
			media.addProduct( product )
				.then( ( data ) => {
					( !!data ) ?
						response.sendStatus( 201 ) : response.sendStatus( 409 );
				} );
		} );
} );

/* =================================================================================
* 		[ Eliminación de la relación entre un producto y una media ]
* ================================================================================= */

server.delete( '/:idMedia/product/:idProduct', ( request, response, next ) => {
	const { idMedia, idProduct } = request.params;
	const promises = [ ];
	
	promises.push( Media.findByPk( idMedia ) );
	promises.push( Product.findByPk( idProduct ) );
	
	Promise.all( promises )
		.spread( function( media, product ) {
			if ( !media || !product ) {
				return response.sendStatus( 404 );
			}
			
			media.removeProduct( product )
				.then( ( data ) => {
					( !!data ) ?
						response.sendStatus( 204 ) : response.sendStatus( 409 );
				} );
		} );
} );

/* =================================================================================
* 		[ Creación de un modelo Media ]
* ================================================================================= */

server.post( '/', ( request, response ) => {
	Media.findOrCreate( {
			...request.body
		} )
		.then( media => response.status( 200 ).send( media ) )
		.catch( error => response.status( 400 ).send( error ) );
} );

/* =================================================================================
* 		[ Modificación de un modelo Media ]
* ================================================================================= */

server.put( '/:id', ( request, response ) => {
	let { id } = request.params;
	
	Media.findByPk( id )
		.then( media => {
			if ( !media ) {
				return response.status( 404 ).send( 'Media inexistente' );
			}
			
			media.update( { ...request.body } )
                .then( media => response.status( 200 ).send( media ) )
                .catch( error => response.status( 400 ).send( error ) );
		} );
} );

/* =================================================================================
* 		[ Eliminación de un modelo Media ]
* ================================================================================= */

server.delete( '/:id', ( request, response ) => {
	let { id } = request.params;
	
	Media.findByPk( id )
		.then( media => {
			if ( !media ) {
				return response.status( 404 ).send( 'Media inexistente' );
			}

			media.destroy( )
				.then( ( ) => response.sendStatus( 204 ) );
		} );
} );

/* =================================================================================
* 		[ Exportamos nuestras rutas ]
* ================================================================================= */

module.exports = server;