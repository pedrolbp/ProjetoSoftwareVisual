const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const CartItem = sequelize.define('CartItem', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cartId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Carts', // Nome da tabela de carrinhos
                key: 'id'
            }
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Products', // Nome da tabela de produtos
                key: 'id'
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1 // Valor padrão para a quantidade de produtos
        },
        totalPrice: {
            type: Sequelize.DECIMAL,
            allowNull: false
        }
    });

    return CartItem;
};
