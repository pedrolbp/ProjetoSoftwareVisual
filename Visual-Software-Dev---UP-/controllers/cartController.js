// ./controllers/cartController.js

class CartController {
    constructor(CartService) {
        this.cartService = CartService;
    }

    // Método para criar um novo carrinho
    async createCart(req, res) {
        const { userId } = req.body;
        try {
            const newCart = await this.cartService.create(userId);
            if (newCart) {
                res.status(201).json(newCart); // 201 Created
            } else {
                res.status(400).json({ error: 'Não foi possível criar o carrinho' });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Ocorreu um erro ao criar o carrinho' });
        }
    }

    // Método para retornar todos os carrinhos
    async getAllCarts(req, res) {
        try {
            const allCarts = await this.cartService.findAll();
            if (allCarts) {
                res.status(200).json(allCarts);
            } else {
                res.status(404).json({ error: 'Nenhum carrinho encontrado' });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Ocorreu um erro ao buscar os carrinhos' });
        }
    }

    // Método para retornar um carrinho pelo id
    async getCartById(req, res) {
        const { id } = req.params;
        try {
            const cart = await this.cartService.findById(id);
            if (cart) {
                res.status(200).json(cart);
            } else {
                res.status(404).json({ error: `Carrinho com ID ${id} não encontrado` });
            }
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao buscar o carrinho' });
        }
    }

    async getCartByUserId(req, res) {
        const { id } = req.params;
        try {
            const cart = await this.cartService.findCartByUserId(id);
            if (cart) {
                res.status(200).json(cart);
            } else {
                res.status(404).json({ error: `Carrinho com ID ${id} não encontrado` });
            }
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao buscar o carrinho' });
        }
    }

    // Método para atualizar um carrinho
    async updateCart(req, res) {
        const { id } = req.params;
        const updatedData = req.body;
        try {
            const updatedCart = await this.cartService.update(id, updatedData);
            if (updatedCart) {
                res.status(200).json(updatedCart);
            } else {
                res.status(404).json({ error: `Carrinho com ID ${id} não encontrado para atualização` });
            }
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao atualizar o carrinho' });
        }
    }

    // Método para deletar um carrinho
    async deleteCart(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.cartService.delete(id);
            if (deleted) {
                res.status(200).send("Carrinho deletado com sucesso");
            } else {
                res.status(404).json({ error: `Carrinho com ID ${id} não encontrado para exclusão` });
            }
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao deletar o carrinho' });
        }
    }
}

module.exports = CartController;
