// ./services/productService.js
const db = require('../models');

class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel; 
    }

    async create(name, description, price, stock) {
        try {
            const newProduct = await this.Product.create({
                name: name,
                description: description,
                price: price,
                stock: stock
            });
            return newProduct ? newProduct : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para retornar todos os produtos
    async findAll() {
        try {
            const allProducts = await this.Product.findAll();
            return allProducts ? allProducts : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para retornar o produto pelo id
    async findById(id) {
        try {
            const product = await this.Product.findByPk(id);
            return product ? product : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para atualizar um produto
    async update(id, updatedData) {
        try {
            const [updated] = await this.Product.update(updatedData, {
                where: { id: id }
            });
            return updated ? await this.findById(id) : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para deletar um produto
    async delete(id) {
        try {
            const deleted = await this.Product.destroy({
                where: { id: id }
            });
            return deleted ? true : false;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductService;
