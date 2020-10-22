const { DataTypes, Model } = require( 'sequelize' );
const crypto = require( 'crypto' );

const generateSalt = ( ) => {
	return crypto.randomBytes( 16 ).toString( 'base64' );
}

const encryptPassword = ( plainText, salt ) => {
	return crypto
		.createHash( 'RSA-SHA256' )
		.update( plainText )
		.update( salt )
		.digest( 'hex' );
}

const setSaltAndPassword = ( user ) => {
	if ( !user.changed( 'password' ) ) {
		return;
	}
	
	user.salt = generateSalt( );
	user.password = encryptPassword( user.password( ), user.salt( ) );
}

const correctPassword = function( password ) {
	return encryptPassword( password, this.salt( ) ) === this.password( );
}

module.exports = ( sequelize ) => {
	const model = sequelize.define( 'user', {
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			isEmail: true,
			unique: true,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			get( ) {
				return ( ) => this.getDataValue( 'password' );
			}
		},
		salt: {
			type: DataTypes.STRING,
			get( ) {
				return ( ) => this.getDataValue( 'salt' );
			}
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		}
	}, {
		hooks: {
			beforeCreate: setSaltAndPassword,
			beforeUpdate: setSaltAndPassword
		}
	}/*, {
		instanceMethods: {
			correctPassword
		}
	}*/ );
	
	model.prototype.correctPassword = correctPassword;
};