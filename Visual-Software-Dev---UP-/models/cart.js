const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Nome da tabela de usuários
                key: 'id'
            }
        },
        totalPrice: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            defaultValue: 0.00 // Inicializa o valor total em 0
        }
    });

    return Cart;
};

