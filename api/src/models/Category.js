const { DataTypes } = require( 'sequelize' );

// Exportamos una función que define el modelo
// Luego le injectamos la conexión a sequelize

module.exports = ( sequelize ) => {
	sequelize.define( 'category', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		}
	} );
};
