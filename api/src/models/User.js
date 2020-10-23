const { DataTypes } = require( 'sequelize' );
const crypto = require( 'crypto' );

const generateSalt = ( ) => {
	return crypto.randomBytes( 16 ).toString( 'base64' );
};

const encryptPassword = ( plainText, salt ) => {
	return crypto
		.createHash( 'RSA-SHA256' )
		.update( plainText )
		.update( salt )
		.digest( 'hex' );
};

const setSaltAndPassword = ( user ) => {
	if ( !user.changed( 'password' ) ) {
		return;
	}
	
	user.salt = generateSalt( );
	user.password = encryptPassword( user.password( ), user.salt( ) );
};

module.exports = ( sequelize ) => {
	const User = sequelize.define( 'user', {
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
			unique: true,
			allowNull: false,
			validate: {
				isEmail: true
			}
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
		accessLevel: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, {
		hooks: {
			beforeCreate: setSaltAndPassword,
			beforeUpdate: setSaltAndPassword
		}
	} );
	
	User.prototype.correctPassword = function( password ) {
		return encryptPassword( password, this.salt( ) ) === this.password( );
	}
};