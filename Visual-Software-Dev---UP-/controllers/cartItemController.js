// ./controllers/cartItemController.js

class CartItemController {
  constructor(CartItemService) {
    this.cartItemService = CartItemService;
  }

  // Método para criar um novo item no carrinho
  async createCartItem(req, res) {
    const { cartId, productId, quantity } = req.body;
    try {
      if (quantity < 0) {
        res
          .status(400)
          .json({ error: "A quantidade não pode ser menor que 0!" });
      }
      const product = await this.cartItemService.findProductById(productId);
      if (!product) {
        res.status(404).json({ error: "Produto não encontrado" });
      }
      const totalPrice = product.price * quantity;

      const cart = await this.cartItemService.findAll(cartId);
      if (!cart) {
        res.status(404).json({ error: "Carrinho não encontrado" });
      }

      const cartItem = cart.find((item) => item.product.id === productId);

      let newCartItem = null;

      if (cartItem) {
        newCartItem = await this.cartItemService.update(cartItem.id, {
          cartId,
          productId,
          totalPrice: product.price * (cartItem.quantity + 1),
          quantity: cartItem.quantity + 1,
        });
      } else {
        newCartItem = await this.cartItemService.create(cartId, productId, quantity, totalPrice);
      }

      if (newCartItem) {
        res.status(201).json(newCartItem);
      } else {
        res
          .status(400)
          .json({ error: "Não foi possível criar o item do carrinho" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao criar o item do carrinho" });
    }
  }

  // Método para retornar todos os itens do carrinho
  async getAllCartItems(req, res) {
    const { cartId } = req.params;
    try {
      const allCartItems = await this.cartItemService.findAll(cartId);
      if (allCartItems) {
        res.status(200).json(allCartItems);
      } else {
        res.status(404).json({ error: "Nenhum item de carrinho encontrado" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao buscar os itens do carrinho" });
    }
  }

  // Método para retornar um item do carrinho pelo id
  async getCartItemById(req, res) {
    const { id } = req.params;
    try {
      const cartItem = await this.cartItemService.findById(id);
      if (cartItem) {
        res.status(200).json(cartItem);
      } else {
        res
          .status(404)
          .json({ error: `Item do carrinho com ID ${id} não encontrado` });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao buscar o item do carrinho" });
    }
  }

  // Método para atualizar um item do carrinho
  async updateCartItem(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      if (updatedData.quantity < 0) {
        res
          .status(400)
          .json({ error: "A quantidade não pode ser menor que 0!" });
      }
      const updatedCartItem = await this.cartItemService.update(
        id,
        updatedData
      );
      if (updatedCartItem) {
        res.status(200).json(updatedCartItem);
      } else {
        res.status(404).json({
          error: `Item do carrinho com ID ${id} não encontrado para atualização`,
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao atualizar o item do carrinho" });
    }
  }

  // Método para deletar um item do carrinho
  async deleteCartItem(req, res) {
    const { itemId } = req.params;
    try {
      const deleted = await this.cartItemService.delete(itemId);
      if (deleted) {
        res.status(200).send("Item deletado com sucesso!");
      } else {
        res.status(404).json({
          error: `Item do carrinho com ID ${itemId} não encontrado para exclusão`,
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao deletar o item do carrinho" });
    }
  }
}

module.exports = CartItemController;
