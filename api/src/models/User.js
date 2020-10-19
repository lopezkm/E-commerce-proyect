const { DataTypes } = require( 'sequelize' );

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
            isAlphanumeric: true,
            len: [5,10],
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    } );
};