const server = require( 'express' ).Router( );
const { Media } = require( '../db.js' );

/* =================================================================================
* 		[ Creación de un modelo Media ]
* ================================================================================= */

server.post( '/', ( request, response ) => {
	Media.create( {
		...request.body
	}, {
		fields: [ 'path', 'type', 'productId' ]
	} )
	.then( ( media ) => {
		response.status( 200 ).send( media );
	} );
} );

/* =================================================================================
* 		[ Eliminación de un modelo Media ]
* ================================================================================= */

server.delete( '/:id', ( request, response ) => {
	let { id } = request.params;
	
	Media.findByPk( id ).then( media => {
		if ( !media ) {
			return response.sendStatus( 404 );
		}

		media.destroy( ).then( ( ) => {
			response.sendStatus( 204 );
		} );
	} );
} );

/* =================================================================================
* 		[ Exportamos nuestras rutas ]
* ================================================================================= */

module.exports = server;