const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Supplier = sequelize.define('Supplier', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cnpj: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [14, 14], // Valida que o CNPJ tenha 14 caracteres
                isNumeric: true // Valida que seja apenas números
            }
        },
        product: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Supplier;
};
