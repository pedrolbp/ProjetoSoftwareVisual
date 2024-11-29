class PaymentService {
    constructor(PaymentModel) {
        this.Payment = PaymentModel;
    }

    async processPayment(userId, valorTotal, metodoPagamento) {
        try {
            const newPayment = await this.Payment.create({
                userId: userId,
                valorTotal: valorTotal,
                metodoPagamento: metodoPagamento,
                status: 'PENDING'
            });
            return newPayment;
        } catch (error) {
            throw error;
        }
    }

    async getStatus(transactionId) {
        try {
            const payment = await this.Payment.findByPk(transactionId);
            return payment ? payment : null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PaymentService;
