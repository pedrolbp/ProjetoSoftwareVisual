const express = require('express');
const router = express.Router();
const db = require('../models');
const auth = require('../auth');

const PaymentService = require('../services/paymentService');
const CartService = require('../services/cartService');
const PaymentController = require('../controllers/paymentController');
const CartItemService = require('../services/cartItemService');

const paymentService = new PaymentService(db.Payment);
const cartService = new CartService(db.Cart, db.CartItem);
const cartItemService = new CartItemService(db.CartItem, db.Product);
const paymentController = new PaymentController(paymentService, cartService, cartItemService);

router.post('/creditcard', auth.verifyToken, (req, res) => paymentController.pay(req, res, 'CARTAO_DE_CREDITO'));
router.post('/pix', auth.verifyToken, (req, res) => paymentController.pay(req, res, 'PIX'));
router.get('/status/:transactionId', auth.verifyToken, (req, res) => paymentController.status(req, res));

module.exports = router;
