const { DataTypes } = require('sequelize');
const crypto = require('crypto');

const generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
}

const encryptPassword = function(plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex')
}

const setSaltAndPassword = user => {
    if (user.changed('password')) {
        const salt = generateSalt();
        user.salt = salt;
        user.password = encryptPassword(user.password(), user.salt());
        console.log(salt, user.salt());
    }
}

// Esto hay que usarlo para cuando haya login

// const correctPassword = function(enteredPassword) {
//     return User.encryptPassword(enteredPassword, this.salt()) === this.password();
// }

module.exports = ( sequelize ) => {
    sequelize.define( 'user', {
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
            get() {
                return () => this.getDataValue('password');
            }
        },
        salt: {
            type: DataTypes.STRING,
            get() {
                return() => this.getDataValue('salt');
            }
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },{
        hooks: {
            beforeCreate: setSaltAndPassword,
            beforeUpdate: setSaltAndPassword
        } 
    });
};