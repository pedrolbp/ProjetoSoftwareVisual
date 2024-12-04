// ./services/cartItemService.js
const db = require('../models');

class CartItemService {
    constructor(CartItemModel, ProductModel) {
        this.CartItem = CartItemModel; 
        this.Product = ProductModel;
    }

    // Método para criar um novo item no carrinho
    async create(cartId, productId, quantity, totalPrice) {
        try {
            const newCartItem = await this.CartItem.create({
                cartId: cartId,
                productId: productId,
                quantity: quantity,
                totalPrice: totalPrice
            });
            return newCartItem ? newCartItem : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para retornar todos os itens do carrinho
    async findAll(cartId) {
        try {
            const allCartItems = await this.CartItem.findAll({
                where: { cartId: cartId },
                include: [{
                    model: db.Product,
                    as: 'product', 
                    attributes: ['id', 'name', 'price'] 
                }]
            });
            return allCartItems ? allCartItems : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para retornar um item do carrinho pelo id
    async findById(id) {
        try {
            const cartItem = await this.CartItem.findByPk(id);
            return cartItem ? cartItem : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para atualizar um item do carrinho
    async update(id, updatedData) {
        try {
            const [updated] = await this.CartItem.update(updatedData, {
                where: { id: id }
            });
            return updated ? await this.findById(id) : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para deletar um item do carrinho
    async delete(id) {
        try {
            const deleted = await this.CartItem.destroy({
                where: { id: id }
            });
            return deleted ? true : false;
        } catch (error) {
            throw error;
        }
    }
    async findProductById(id){
        try {
            const product = await this.Product.findByPk(id) 
            return product ? product : null
        } catch (error) {
            throw error
        }
    }
}

module.exports = CartItemService;
