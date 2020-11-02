const { DataTypes } = require( 'sequelize' );

const orderStatuses = [
	'cart',
	'created',
	'processing',
	'completed',
	'canceled'
];

function validateUpdate( order, options )
{
	const [ status ] = options.fields;
	
	if ( !status )
	{
		return;
	}
	
	const oldStatus = orderStatuses.findIndex( ( e ) => order._previousDataValues.status === e );
	const newStatus = orderStatuses.findIndex( ( e ) => order.dataValues.status === e );
	
	if ( ( newStatus < 0 )  /* || ( newStatus < oldStatus )*/  ||  ( oldStatus > 2 ) || ( newStatus > ( oldStatus + ( ( oldStatus > 0 ) ? 2 : 3 ) ) ) )
	{
		return Promise.reject( new Error( 'Can\'t change to that status' ) );
	}
	
	if ( newStatus !== 0 )
	{
		return new Promise( ( resolve, reject ) => {
			order.getProducts( ).then( ( products ) => {
				if ( !products || ( products.length === 0 ) ) {
					reject( new Error( 'Cart is empty' ) );
				}
				
				products.forEach( ( p ) => {
					if ( p.OrderProduct.quantity > p.stock ) {
						reject( new Error( 'Stock has changed' ) );
					}
				} );
				
				resolve( );
			} )
		} );
	}
	
	return Promise.resolve( );
}

module.exports = ( sequelize ) => {
	sequelize.define( 'order', {
		status: {
			type: DataTypes.ENUM,
			values: orderStatuses,
			allowNull: false
		}
	}, {
		hooks: {
			beforeUpdate: validateUpdate
		}
	} );
};