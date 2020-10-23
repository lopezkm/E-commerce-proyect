const { DataTypes } = require( 'sequelize' );
const crypto = require( 'crypto' );

const generateToken = ( ) => {
	return crypto.randomBytes( 32 ).toString( 'hex' );
};

module.exports = ( sequelize ) => {
	sequelize.define( 'ResetToken', {
		token: {
			type: DataTypes.STRING,
			unique: true,
			defaultValue: ( ) => {
				return generateToken( );
			}
		},
		requested: {
			type: DataTypes.DATE,
			defaultValue: ( ) => {
				return Date.now( );
			}
		},
		expiration: {
			type: DataTypes.DATE,
			defaultValue: ( ) => {
				return ( Date.now( ) + 3600000 );
			}
		},
		used: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		tableName: 'recovery'
	} );
};