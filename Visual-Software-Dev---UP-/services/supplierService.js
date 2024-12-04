const db = require('../models');

class SupplierService {
    constructor(SupplierModel) {
        this.Supplier = SupplierModel;
    }

    // Método para criar um fornecedor
    async create(name, cnpj, product, address) {
        try {
            const newSupplier = await this.Supplier.create({
                name,
                cnpj,
                product,
                address
            });
            return newSupplier ? newSupplier : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para retornar todos os fornecedores
    async findAll() {
        try {
            const allSuppliers = await this.Supplier.findAll();
            return allSuppliers ? allSuppliers : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para retornar o fornecedor pelo ID
    async findById(id) {
        try {
            const supplier = await this.Supplier.findByPk(id);
            return supplier ? supplier : null;
        } catch (error) {
            throw error;
        }
    }

    // Método para atualizar um fornecedor
    async update(id, data) {
        try {
            const supplier = await this.Supplier.findByPk(id);
            if (supplier) {
                await supplier.update(data);
                return supplier;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    // Método para deletar um fornecedor
    async delete(id) {
        try {
            const rowsDeleted = await this.Supplier.destroy({ where: { id } });
            return rowsDeleted > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SupplierService;
