const { DataTypes } = require( 'sequelize' );

module.exports = ( sequelize ) => {
	sequelize.define( 'ProductMedia', {
		productId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Product',
				key: 'id'
			}
		},
		mediaId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Media',
				key: 'id'
			}
		}
	}, {
		timestamps: false,
		tableName: 'product_media'
	} );
};