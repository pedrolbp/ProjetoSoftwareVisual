class SupplierController {
    constructor(SupplierService) {
        this.supplierService = SupplierService;
    }

    // Método para criar fornecedor
    async createSupplier(req, res) {
        const { name, cnpj, product, address } = req.body;
        try {
            if (!name || !cnpj || !product || !address) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
            }
            if (cnpj.length !== 14) {
                return res.status(400).json({ error: 'O CNPJ deve conter exatamente 14 caracteres!' });
            }

            const newSupplier = await this.supplierService.create(name, cnpj, product, address);
            res.status(200).json(newSupplier);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao criar o fornecedor.' });
        }
    }

    // Método para buscar todos os fornecedores
    async findAllSuppliers(req, res) {
        try {
            const allSuppliers = await this.supplierService.findAll();
            res.status(200).json(allSuppliers);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao buscar todos os fornecedores.' });
        }
    }

    // Método para buscar fornecedor por ID
    async findSupplierById(req, res) {
        const { id } = req.params; // ID vindo da URL
        try {
            const supplier = await this.supplierService.findById(id);
            if (!supplier) {
                return res.status(404).json({ error: 'Fornecedor não encontrado!' });
            }
            res.status(200).json(supplier);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao buscar o fornecedor pelo ID.' });
        }
    }

    // Método para atualizar fornecedor
    async updateSupplier(req, res) {
        const { id } = req.params; // ID vindo da URL
        const data = req.body; // Dados para atualização
        try {
            const updatedSupplier = await this.supplierService.update(id, data);
            if (!updatedSupplier) {
                return res.status(404).json({ error: 'Fornecedor não encontrado!' });
            }
            res.status(200).json(updatedSupplier);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao atualizar o fornecedor.' });
        }
    }

    // Método para deletar fornecedor
    async deleteSupplier(req, res) {
        const { id } = req.params; // ID vindo da URL
        try {
            const deleted = await this.supplierService.delete(id);
            if (!deleted) {
                return res.status(404).json({ error: 'Fornecedor não encontrado!' });
            }
            res.status(200).json({ message: 'Fornecedor deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao deletar o fornecedor.' });
        }
    }
}

module.exports = SupplierController;
