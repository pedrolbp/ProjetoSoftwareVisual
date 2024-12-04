const db = require('../models');

class CartService {
    constructor(CartModel, CartItemModel) {
        this.Cart = CartModel;
        this.CartItem = CartItemModel;
    }

    // Método para criar um novo carrinho para um usuário
    async create(userId) {
        try {
            const newCart = await this.Cart.create({
                userId: userId,
                totalPrice: 0.00 // Inicializa com 0
            });
            return newCart ? newCart : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para calcular e atualizar o valor total do carrinho
    async updateCartTotal(cartId) {
        try {
            const cartItems = await this.CartItem.findAll({
                where: { cartId: cartId }
            });

            // Somar o totalPrice de todos os itens do carrinho
            const total = cartItems.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0);

            // Atualizar o valor total no carrinho
            await this.Cart.update({ totalPrice: total }, { where: { id: cartId } });

            return total;
        } catch (error) {
            throw error;
        }
    }

    // Método para adicionar um item ao carrinho e recalcular o valor total
    async addItemToCart(userId, productId, quantity, totalPrice) {
        try {
            // Buscar o carrinho do usuário
            const cart = await this.findCartByUserId(userId);
            if (!cart) throw new Error('Carrinho não encontrado');

            await this.CartItem.create({
                cartId: cart.id,
                productId: productId,
                quantity: quantity,
                totalPrice: totalPrice // Quantidade x preço do produto
            });

            // Atualiza o total do carrinho
            return await this.updateCartTotal(cart.id);
        } catch (error) {
            throw error;
        }
    }

    // Método para remover um item do carrinho e recalcular o valor total
    async removeItemFromCart(cartItemId) {
        try {
            const cartItem = await this.CartItem.findByPk(cartItemId);

            if (!cartItem) throw new Error('Item não encontrado');

            const cartId = cartItem.cartId;
            await this.CartItem.destroy({ where: { id: cartItemId } });

            // Atualiza o total do carrinho
            return await this.updateCartTotal(cartId);
        } catch (error) {
            throw error;
        }
    }

    // Método para buscar o carrinho associado ao usuário
    async findCartByUserId(userId) {
        try {
            const cart = await this.Cart.findOne({
                where: { userId: userId }
            });
            return cart ? cart : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para retornar o carrinho pelo id
    async findById(id) {
        try {
            const cart = await this.Cart.findByPk(id);
            return cart ? cart : null;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            const carts = await this.Cart.findAll();
            return carts ? carts : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para deletar um carrinho
    async delete(id) {
        try {
            const deleted = await this.Cart.destroy({
                where: { id: id }
            });
            return deleted ? true : false;
        } catch (error) {
            throw error;
        }
    }

    async removeAllItemsFromCart(cartId) {
        try {
            const deletedCount = await this.CartItem.destroy({
                where: { cartId: cartId }
            });
            return deletedCount; 
        } catch (error) {
            console.error('Erro ao remover todos os itens do carrinho:', error);
            throw error;
        }
    }
}

module.exports = CartService;
