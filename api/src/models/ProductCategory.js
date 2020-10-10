const { DataTypes } = require( 'sequelize' );

module.exports = ( sequelize ) => {
	sequelize.define( 'ProductCategory', {
		productId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Product',
				key: 'id'
			}
		},
		categoryId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Category',
				key: 'id'
			}
		}
	}, {
		timestamps: false,
		tableName: 'product_category'
	} );
};