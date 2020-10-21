const server = require( 'express' ).Router( );
const Promise = require( 'bluebird' );
const sequelize = require( 'sequelize' );
const { Op, QueryTypes } = sequelize;
const { Product, Category, Media, conn, Review, User } = require( '../db.js' );

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
const _MAX_PER_PAGE = 20;
const _DEF_PER_PAGE = 20;

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
		
		response.status( 200 ).send( product );
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
* 		[ Creación de la relación entre un producto y varias categoría ]
* ================================================================================= */

server.post( '/:idProduct/category/', ( request, response, next ) => {
	const { idProduct } = request.params;
	const { categories } = request.body;
	let promises=[];
	
	Product.findByPk( idProduct )
	.then(product => product)
	.then(prod => categories.map(cat => promises.push(prod.addCategory(cat))) )
	.then(x => {

		Promise.all( promises )
		.then(data => {
			response.send(data)
		})
		.catch(e => response.send (e))
	})
} );

/* =================================================================================
* 		[ Eliminación de la relación entre un producto y una categoría ]
* ================================================================================= */

server.delete( '/:idProduct/category/:idCategory', ( request, response, next ) => {
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

server.post( '/', ( request, response ) => {
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

server.put( '/:id', ( request, response ) => {
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

server.delete( '/:id', ( request, response ) => {
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

server.post( '/:id/review/:userId', ( request, response ) => {

	const { id, userId } = request.params;
	const { qualification, description } = request.body;
		
	Review.create( {
		
		productId: id,
		userId, 
		qualification,
		description

	})
	.then( ( review ) => {
		response.status( 201 ).send( review );
	} );
} );

/* =================================================================================
* 		[ Modificación de una review ]
* ================================================================================= */

server.put( '/:id/review/:userId', ( request, response ) => {

	const { id, userId } = request.params;
	
	Review.findOne( {
		where: {
			productId: id,
			userId
		}
	})
	.then( ( review ) => {
		if ( !review ) {
			return response.status( 404 ).send();
		} 
	
		return review.update ({
			...request.body
		}, {
			fields: [ 'qualification', 'description' ]
		})
		.then( review => {response.status(200).send(review)} )
		.catch( error => {response.status(500).send(error.message)} );
	});
});

/* =================================================================================
* 		[ Eliminación de una review ]
* ================================================================================= */

server.delete( '/:id/review/:userId', ( request, response ) => {
	
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

		review.destroy( ).then( ( ) => {
			response.sendStatus( 204 );
		} );
	} );
} );

/* =================================================================================
* 		[ Obtención de todas las review de un producto ]
* ================================================================================= */

server.get( '/:id/review', ( request, response ) => {
	
	const { id } = request.params;
	
	Review.findAll({
		
		where: {
			productId:id
		}
	})
	.then( ( reviews ) => {
		if ( !reviews ) {
			return response.sendStatus( 404 );
		}
			return response.status( 200 ).send( reviews );
	} );
});

/* =================================================================================
* 		[ Exportamos nuestras rutas ]
* ================================================================================= */

module.exports = server;