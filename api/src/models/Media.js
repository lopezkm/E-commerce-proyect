const { DataTypes } = require( 'sequelize' );

module.exports = ( sequelize ) => {
	sequelize.define( 'media', {
		type: {
			type: DataTypes.STRING,
			allowNull: false
		},
		path: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		width: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		height: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		timestamps: false
	} );
};