const { DataTypes } = require( 'sequelize' );

module.exports = ( sequelize ) => {
	sequelize.define( 'product', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: { isFloat: true }
		},
		stock: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		media: {
			type: DataTypes.STRING,
			allowNull: false
		},
		developer: {
			type: DataTypes.STRING,
			allowNull: false
		},
		publisher: {
			type: DataTypes.STRING,
			allowNull: false
		},
		publishDate: {
			type: DataTypes.DATE,
			allowNull: false
		}
	} );
};

