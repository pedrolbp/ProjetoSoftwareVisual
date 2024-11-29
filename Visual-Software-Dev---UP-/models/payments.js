const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Payment = sequelize.define('Payment', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', 
                key: 'id'
            }
        },
        valorTotal:{
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        metodoPagamento:{
            type: Sequelize.STRING,
            allowNull: false
        },
        status:{
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Payment;
};
