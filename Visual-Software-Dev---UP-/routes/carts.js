const express = require('express');
const router = express.Router();
const db = require('../models');

const CartService = require('../services/cartService');
const CartItemService = require('../services/cartItemService');
const CartController = require('../controllers/cartController');
const CartItemController = require('../controllers/cartItemController');

const cartService = new CartService(db.Cart);
const cartItemService = new CartItemService(db.CartItem, db.Product);
const cartController = new CartController(cartService);
const cartItemController = new CartItemController(cartItemService);

// Rotas relacionadas ao carrinho
router.get('/getallcarts', async (req, res) => {
    cartController.getAllCarts(req, res);
}); // Buscar carrinhos

router.post('/createcart', async (req, res) => {
    cartController.createCart(req, res);
}); // Criar um novo carrinho

router.get('/viewcart/:id', async (req, res) => {
    cartController.getCartById(req, res);
}); // Visualizar um carrinho específico

router.put('/updatecart/:id', async (req, res) => {
    cartController.updateCart(req, res);
}); // Atualizar um carrinho

router.delete('/deletecart/:id', async (req, res) => {
    cartController.deleteCart(req, res);
}); // Deletar um carrinho

// Rotas relacionadas aos itens do carrinho
router.post('/additem', async (req, res) => {
    cartItemController.createCartItem(req, res);
}); // Adicionar um produto à cesta

router.delete('/removeitem/:itemId', async (req, res) => {
    cartItemController.deleteCartItem(req, res);
}); // Remover um produto da cesta

// Rota para obter o carrinho do usuário
router.get('/getusercart/:id', async(req, res) => {
    cartController.getCartByUserId(req, res);
})

router.get('/:cartId/viewcartitems', async (req, res) => {
    cartItemController.getAllCartItems(req, res);
}); // Visualizar todos os itens de um carrinho

router.put('/updateitem/:id', async (req, res) => {
    cartItemController.updateCartItem(req, res);
});
module.exports = router;
