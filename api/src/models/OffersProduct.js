const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('OffersProduct', {
        offersId: {
            type: DataTypes.INTEGER,
			references: {
				model: 'Offers',
				key: 'id'
			}
        },

		productId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Product',
				key: 'id'
			}
		},
    });
}