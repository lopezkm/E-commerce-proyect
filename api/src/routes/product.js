const server = require( 'express' ).Router( );
const Promise = require( 'bluebird' );
const sequelize = require( 'sequelize' );
const { Op, QueryTypes } = sequelize;

const { Product, Category, Media, Review, Order, conn, User } = require( '../db.js' );
const { isAuthenticated, hasAccessLevel } = require( '../passport.js' );

/* =================================================================================
* 		[ Métodos y constantes de ayuda para las rutas ]
* ================================================================================= */

const _SORT_FIELDS = [
	'name',
	'price',
	'publishDate'
];

const _SORT_DIRECTIONS = [
	'ASC',
	'DESC'
];

const _MAX_PRICE = 200.0;
const _MAX_PAGE = 1000;

const _MIN_PER_PAGE = 5;
const _MAX_PER_PAGE = 50;
const _DEF_PER_PAGE = 50;

const _clamp = ( value, min, max ) => {
	return Math.max( min, Math.min( max, value ) );
};

const _buildProductsQuery = ( categories ) => {
	let query = `SELECT "products".id FROM "products" `;
	
	if ( categories && ( categories.length > 0 ) )
	{
		query = query + `
			INNER JOIN "product_category" ON "product_category"."productId" = "products"."id"
			INNER JOIN "categories" ON "product_category"."categoryId" = "categories"."id"
			WHERE "categories"."id" IN( :list )
			GROUP BY "products"."id" HAVING COUNT( "products"."id" ) = :length
		`;
	}
	
	return conn.query( query, {
		replacements: {
			list: categories && categories,
			length: categories && categories.length
		},
		type: QueryTypes.SELECT
	} );
}

/* =================================================================================
* 		[ Obtención de todos los productos ]
* ================================================================================= */

server.get( '/', ( request, response, next ) => {
	let { query, categories, sortBy, sortDir, minPrice, maxPrice, page, limit } = request.query;
	
	sortBy = _SORT_FIELDS.find( v => sortBy === v ) || _SORT_FIELDS[ 0 ];
	sortDir = _SORT_DIRECTIONS.find( v => sortDir === v ) || _SORT_DIRECTIONS[ 0 ];
	
	minPrice = _clamp( ( minPrice || 0.0 ), 0.0, _MAX_PRICE );
	maxPrice = _clamp( ( maxPrice || _MAX_PRICE ), 0.0, _MAX_PRICE );
	
	page = _clamp( ( page || 0 ), 0, _MAX_PAGE );
	limit = _clamp( ( limit || _DEF_PER_PAGE ), _MIN_PER_PAGE, _MAX_PER_PAGE );
	
	query = query && `%${query}%`;
	categories = categories && categories.split && categories.split( ',' ).map( c => parseInt( c ) || undefined );
	
	// TO-DO: fix, very inefficient with a high amount of products
	_buildProductsQuery( categories, limit, page ).then( ( data ) => {
		if ( !data || ( data.length === 0 ) ) {
			response.status( 200 ).send( [ ] );
			
			return null;
		}
		
		const productIds = data.map( v => v.id );
		
		return Product.findAll( {
			where: {
				[ Op.and ]: [
					{
						id: productIds
					},
					{
						[ Op.and ]: [
							{ price: { [ Op.gte ]: minPrice } },
							{ price: { [ Op.lte ]: maxPrice } }
						]
					},
					query && {
						[ Op.or ]: [
							{ name: { [ Op.iLike ]: query } },
							{ description: { [ Op.iLike ]: query } }
						]
					}
				]
			},
			order: [
				[ sortBy, sortDir ]
			],
			include: [
				{ model: Category },
				{ model: Media }
			],
			limit: limit,
			offset: ( page * limit )
		} );
	} )
	.then( ( products ) => {
		if ( products === null ) {
			return null;
		}
		
		response.status( 200 ).send( products );
	} );
} );

/* =================================================================================
* 		[ Búsqueda de varios productos por identificador ]
* ================================================================================= */

server.get( '/some', ( request, response, next ) => {
	const { ids } = request.body;
	
	if ( !ids || !Array.isArray( ids ) || ids.some( id => isNaN( id ) ) ) {
		return response.sendStatus( 400 );
	}
	
	Product.findAll( {
		where: {
			id: {
				[ Op.in ]: ids
			}
		},
		include: [
			{ model: Media },
			{ model: Category }
		]
	} )
	.then( ( products ) => {
		if ( !products ) {
			return response.sendStatus( 404 );
		}
		
		response.status( 200 ).send( products );
	} );
} );

/* =================================================================================
* 		[ Búsqueda de un producto por identificador ]
* ================================================================================= */

server.get( '/:id', ( request, response, next ) => {
	const { id } = request.params;
	
	Product.findByPk( id, {
		include: [
			{ model: Media },
			{ model: Category },
			{ model: User }
		]
	} )
	.then( ( product ) => {
		if ( !product ) {
			return response.sendStatus( 404 );
		}
		
		response.status( 200 ).send( product );
	} );
} );

/* =================================================================================
* 		[ Creación de la relación entre un producto y una categoría ]
* ================================================================================= */

server.post( '/:idProduct/category/:idCategory', hasAccessLevel( ), ( request, response, next ) => {
	const { idProduct, idCategory } = request.params;
	const promises = [ ];
	
	promises.push( Product.findByPk( idProduct ) );
	promises.push( Category.findByPk( idCategory ) );
	
	Promise.all( promises ).spread( function( product, category ) {
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
* 		[ Creación de la relación entre un producto y varias categorías ]
* ================================================================================= */

server.post( '/:idProduct/category/', hasAccessLevel( ), ( request, response, next ) => {
	const { idProduct } = request.params;
	const { categories } = request.body;
	
	Product.findByPk( idProduct )
		.then( ( product ) => {
			if ( !product ) {
				return response.sendStatus( 404 );
			}
			
			Promise.map( categories, ( category ) => {
				return product.addCategory( category );
			} )
			.then( ( data ) => {
				response.sendStatus( 200 );
			} )
			.catch( ( error ) => {
				response.sendStatus( 400 );
			} );
		} )
		.catch( ( error ) => {
			response.sendStatus( 500 );
		} );
} );

/* =================================================================================
* 		[ Eliminación de la relación entre un producto y una categoría ]
* ================================================================================= */

server.delete( '/:idProduct/category/:idCategory', hasAccessLevel( ), ( request, response, next ) => {
	const { idProduct, idCategory } = request.params;
	const promises = [ ];
	
	promises.push( Product.findByPk( idProduct ) );
	promises.push( Category.findByPk( idCategory ) );
	
	Promise.all( promises ).spread( function( product, category ) {
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

server.post( '/', hasAccessLevel( ), ( request, response ) => {
	Product.create( {
		...request.body
	}, {
		fields: [ 'name', 'description', 'price', 'stock', 'developer', 'publisher', 'publishDate' ]
	} )
	.then( ( product ) => {
		if ( !product ) {
			return response.sendStatus( 409 );
		}
		
		const promises = [ ];
		const { categories, medias } = request.body;
		
		categories && ( categories.length > 0 ) && promises.push( product.addCategories( categories ) );
		medias && ( medias.length > 0 ) && promises.push( product.addMedium( medias ) );
		
		if ( promises.length > 0 ) {
			Promise.all( promises ).then( ( ) => {
				response.status( 200 ).send( product );
			} );
		}
		else {
			response.status( 200 ).send( product );
		}
	} )
	.catch( ( error ) => {
		response.status( 500 ).send( error );
	} );
} );

/* =================================================================================
* 		[ Modificación de un producto ]
* ================================================================================= */

server.put( '/:id', hasAccessLevel( ), ( request, response ) => {
	const { id } = request.params;
	
	Product.findByPk( id ).then( ( product ) => {
		if ( !product ) {
			return response.sendStatus( 404 );
		}
		
		product.update( {
			...request.body
		}, {
			fields: [ 'name', 'description', 'price', 'stock', 'developer', 'publisher', 'publishDate' ]
		} )
		.then( ( product ) => {
			response.status( 200 ).send( product );
		} );
	} );
} );

/* =================================================================================
* 		[ Eliminación de un producto ]
* ================================================================================= */

server.delete( '/:id', hasAccessLevel( ), ( request, response ) => {
	let { id } = request.params;
	
	Product.findByPk( id ).then( ( product ) => {
		if ( !product ) {
			return response.sendStatus( 404 );
		}
		
		product.destroy( ).then( ( ) => {
			res.sendStatus( 204 );
		} );
	} );
} );

/* =================================================================================
* 		[ Creación de una review ]
* ================================================================================= */

server.post( '/:productId/review/:userId', isAuthenticated, ( request, response, next ) => {
	const { productId, userId } = request.params;
	const { qualification, description } = request.body;
	
	Order.count( {
		where: {
			userId
		},
		include: {
			model: Product,
			required: true,
			where: {
				id: productId
			}
		}
	} )
	.then( ( order ) => {
		if ( !order ) {
			response.status( 404 ).send( 'User has never bought this product' );
			
			return null;
		}
		
		return Review.findOrCreate( {
			where: {
				productId,
				userId
			},
			defaults: {
				qualification,
				description
			}
		} );
	} )
	.then( ( data ) => {
		if ( data === null ) {
			return;
		}
		
		const [ review, created ] = data;
		
		if ( !created ) {
			return response.status( 409 ).send( 'User already submitted a review of this product' );
		}
		
		response.status( 201 ).send( review );
	} )
	.catch( ( error ) => {
		next( error );
	} );
} );

/* =================================================================================
* 		[ Modificación de una review ]
* ================================================================================= */

server.put( '/:productId/review/:userId', isAuthenticated, ( request, response ) => {

	const { productId, userId } = request.params;
	
	Review.findOne( {
		where: {
			productId,
			userId
		}
	} )
	.then( ( review ) => {
		if ( !review ) {
			response.status( 404 ).send( 'User has never submitted a review for this product' );
			
			return null;
		} 
	
		return review.update( {
			...request.body
		}, {
			fields: [ 'qualification', 'description' ]
		} );
	} )
	.then( ( data ) => {
		if ( data === null ) {
			return;
		}
		
		response.status( 200 ).send( review );
	} )
	.catch( ( error ) => {
		response.sendStatus( 500 );
	} );
} );

/* =================================================================================
* 		[ Eliminación de una review ]
* ================================================================================= */

server.delete( '/:productId/review/:userId', isAuthenticated, ( request, response ) => {
	
	const { productId, userId } = request.params;
	
	Review.findOne( {
		where: {
			productId,
			userId
		}
	} )
	.then( ( review ) => {
		if ( !review ) {
			return response.status( 404 ).send( 'User has never submitted a review for this product' );
		}
		
		review.destroy( ).then( ( ) => {
			response.sendStatus( 204 );
		} );
	} );
} );

/* =================================================================================
* 		[ Obtención de la review de un producto por un usuario especifico ]
* ================================================================================= */

server.get( '/:id/review/:userId', ( request, response ) => {
	
	const { id, userId } = request.params;
	
	Review.findOne( {
		where: {
			productId: id,
			userId
		}
	})
	.then( review => {
		if ( !review ) {
			return response.status( 404 ).send();
		}
		return response.status(200).send(review);
	} );
} );

/* =================================================================================
* 		[ Obtención de todas las review de un producto ]
* ================================================================================= */

server.get( '/:productId/review', ( request, response ) => {
	const { productId } = request.params;
	
	Review.findAll( {
		where: {
			productId
		}
	} )
	.then( ( reviews ) => {
		if ( !reviews ) {
			return response.status( 404 ).send( 'There are no reviews for this product' );
		}
		
		return response.status( 200 ).send( reviews );
	} );
});

/* =================================================================================
* 		[ Exportamos nuestras rutas ]
* ================================================================================= */

module.exports = server;