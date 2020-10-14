const { DataTypes } = require( 'sequelize' );

module.exports = ( sequelize ) => {
    sequelize.define( 'order', {
        status: {
            type: DataTypes.ENUM,
            values: ['carrito', 'creada', 'procesando', 'cancelada', 'completa'],
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        payMethod: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};