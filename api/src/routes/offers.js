const server = require('express').Router();
const sequelize = require('sequelize');
const { Op } = require( 'sequelize' );
const { hasAccessLevel } = require( '../passport.js' );

const { OffersProduct, Offers } = require('../db.js');
/* =================================================================================
* 		[ Obtención de todos los productos en oferta ]
* ================================================================================= */

server.get( '/products', ( request, response ) => {
	OffersProduct.findAll( ).then( ( offersProds ) => {
		response.status( 200 ).send( offersProds );
	} );
} );

/* =================================================================================
* 		[ Obtención de todos las ofertas ]
* ================================================================================= */

server.get( '/', ( request, response ) => {
	Offers.findAll( ).then( ( offers ) => {
		response.status( 200 ).send( offers );
	} );
} );


/* =================================================================================
* 		[ Creación de una oferta ]
* ================================================================================= */



server.post( '/create',  hasAccessLevel( ),  ( request, response ) => {
	const { alias } = request.body;
	
	Offers.findOne( {
		where: {
			alias: { [ Op.iLike ]: alias }
		}
	} )
	.then( offer => {
		if ( offer ) {
			return response.status( 409 ).send( 'Oferta ya existe' );
		}
		
		Offers.create( {
			...request.body
		}, {
			fields: [ 'alias', 'discount', 'startDate', 'endDate' ]
		} ).then( ( offers ) => {
			response.status( 200 ).send( offers );
		} );
	} );
} );

module.exports = server;


