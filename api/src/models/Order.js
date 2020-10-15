const { DataTypes } = require( 'sequelize' );

module.exports = ( sequelize ) => {
	sequelize.define( 'order', {
		status: {
			type: DataTypes.ENUM,
			values: [ 'cart', 'created', 'processing', 'canceled', 'completed' ],
			allowNull: false
		}
	} );
};