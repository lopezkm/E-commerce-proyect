const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Product',
                key: 'id'
            }
        },
        qualification: {
            type: DataTypes.ENUM,
            values: ['1', '2', '3', '4', '5'],
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            validate: {
                min: {
                    args: [10],
                    msg: "Tu descripción debe tener al menos 10 caracteres."
                }
            }
        }
    },
        {
            tableName: 'review'
        })
}