class PaymentController {
    constructor(PaymentService, CartService, CartItemService) {
        this.paymentService = PaymentService;
        this.cartService = CartService;
        this.cartItemService = CartItemService;
    }

    async pay(req, res, metodoPagamento) {
        const { userId } = req.body;
        try {
            // Buscar o carrinho associado ao usuário
            const cart = await this.cartService.findCartByUserId(userId);
            if (!cart) {
                return res.status(404).json({ error: 'Carrinho não encontrado para o usuário' });
            }

            const items = await this.cartItemService.findAll(cart.dataValues.id)
            const valorTotal = items.reduce((acc, curr) => {
                return acc + parseFloat(curr.totalPrice)
            }, 0)

            console.log(cart.dataValues.id)

            // Processar o pagamento usando o valor total do carrinho
            const payment = await this.paymentService.processPayment(userId, valorTotal, metodoPagamento);
            await this.cartService.removeAllItemsFromCart(cart.dataValues.id);

            res.status(201).json({ message: 'Pagamento processado', payment });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao processar pagamento' });
        }
    }

    async status(req, res) {
        const { transactionId } = req.params;
        try {
            const payment = await this.paymentService.getStatus(transactionId);
            if (!payment) {
                return res.status(404).json({ error: 'Transação não encontrada' });
            }
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao consultar status' });
        }
    }
}

module.exports = PaymentController;
