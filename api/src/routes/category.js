const server = require( 'express' ).Router( );
const { Category, Media } = require( '../db.js' );
const { Op } = require( 'sequelize' );

/* =================================================================================
* 		[ Obtención de todas las categorías ]
* ================================================================================= */

server.get( '/', ( request, response ) => {
	Category.findAll( ).then( ( categories ) => {
		response.status( 200 ).send( categories );
	} );
} );

/* =================================================================================
* 		[ Obtención de una categoria ]
* ================================================================================= */

server.get( '/:id', ( request, response ) => {
	const { id } = request.params;
	
	Category.findByPk( id )
	.then( ( category ) => {
		if ( !category ) {
			return response.sendStatus( 404 );
		}
		
		response.status( 200 ).send( category );
	} );
} );

/* =================================================================================
* 		[ Búsqueda de productos por nombre de categoría ]
* ================================================================================= */

server.get( '/:name', ( request, response ) => {
	const { name } = request.params;
	
	Category.findOne( {
		where: {
			name: { [ Op.iLike ]: name }
		}
	} )
	.then( ( category ) => {
		if ( !category ) {
			return response.sendStatus( 404 );
		}
		
		category.getProducts( {
			include: [
				{ model: Media }
			]
		} ).then( ( products ) => {
			response.status( 200 ).send( products );
		} );
	} );
} );

/* =================================================================================
* 		[ Creación de una categoría ]
* ================================================================================= */

server.post( '/', ( request, response ) => {
	const { name } = request.body;
	
	Category.findOne( {
		where: {
			name: { [ Op.iLike ]: name }
		}
	} )
	.then( category => {
		if ( category ) {
			return response.status( 409 ).send( 'Categoría ya existe' );
		}
		
		Category.create( {
			...request.body
		}, {
			fields: [ 'name', 'description' ]
		} ).then( ( category ) => {
			response.status( 200 ).send( category );
		} );
	} );
} );

/* =================================================================================
* 		[ Modificación de una categoría ]
* ================================================================================= */

server.put( '/:id', ( request, response ) => {
	const { id } = request.params;
	
	Category.findByPk( id ).then( ( category ) => {
		if ( !category ) {
			return response.status( 404 ).send( 'Categoría inexistente' );
		}
		
		category.update( {
			...request.body
		}, {
			fields: [ 'name', 'description' ]
		} )
		.then( ( category ) => {
			response.status( 200 ).send( category );
		} );
	} );
} );

/* =================================================================================
* 		[ Eliminación de una categoría ]
* ================================================================================= */

server.delete( '/:id', ( request, response ) => {
	const { id } = request.params;
	
	Category.findByPk( id ).then( category => {
		if ( !category ) {
			return response.status( 404 ).send( 'Categoría inexistente' );
		}

		category.destroy( ).then( ( ) => {
			response.sendStatus( 204 );
		} );
	} );
} );

/* =================================================================================
* 		[ Exportamos nuestras rutas ]
* ================================================================================= */

module.exports = server;