const { DataTypes } = require( 'sequelize' );

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = ( sequelize ) => {
	sequelize.define( 'product', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false
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

