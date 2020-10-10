const server = require( 'express' ).Router( );
const { Category } = require( '../db.js' );

/* =================================================================================
* 		[ Obtención de todas las categorías ]
* ================================================================================= */

server.get( '/', ( request, response ) => {
	Category.findAll( )
		.then( categories => {
			if ( !categories ) {
				return response.sendStatus( 404 );
			}
			
			response.status( 200 ).send( categories );
		} );
} );

/* =================================================================================
* 		[ Búsqueda de categorías por nombre ]
* ================================================================================= */

server.get( '/:categoryName', ( request, response ) => {
	const categoryName = request.params.categoryName.toUpperCase( );
	
	Category.findOne( { where: { name: categoryName } } )
		.then( ( category ) => {
			if ( !category ) {
				return response.sendStatus( 404 );
			}
			
			category.getProducts( ).then( ( products ) => {
				response.status( 200 ).send( products );
			} );
		} );
} );

/* =================================================================================
* 		[ Creación de una ategoría ]
* ================================================================================= */

server.post( '/', ( request, response ) => {
	let { name, description } = request.body;
	
	name = name.toUpperCase( );
	
	Category.create( {
			name: name,
			description: description 
		} )
		.then( ( ) => response.sendStatus( 200 ) )
		.catch( ( ) => response.status( 409 ).send( 'La categoría ya existe' ) );
} );

/* =================================================================================
* 		[ Modificación de una categoría ]
* ================================================================================= */

server.put( '/:id', ( request, response ) => {
	let { id } = request.params;
	
	Category.findByPk( id )
		.then( category => {
			if ( !category ) {
				return response.status( 404 ).send( 'Categoría inexistente' );
			}
			
			category.update( { ...request.body } )
				.then( category => response.status( 200 ).send( category ) )
				.catch( error => response.status( 400 ).send( error ) );
		} );
} );

/* =================================================================================
* 		[ Eliminación de una categoría ]
* ================================================================================= */

server.delete( '/:id', ( request, response ) => {
	let { id } = request.params;
	
	Category.findByPk( id )
		.then( category => {
			if ( !category ) {
				return response.status( 404 ).send( 'Categoría inexistente' );
			}

			category.destroy( )
				.then( ( ) => response.sendStatus( 200 ) );
		} );
} );

/* =================================================================================
* 		[ Exportamos nuestras rutas ]
* ================================================================================= */

module.exports = server;