var express = require('express');
var router = express.Router();

// Implementar as dependências para o funcionamento da classe Supplier
const db = require('../models'); // Carregando o banco de dados

// Carregando as classes service e controller do Supplier
const SupplierService = require('../services/supplierService');
const SupplierController = require('../controllers/supplierController');

// Construir os objetos a partir das classes
const supplierService = new SupplierService(db.Supplier);
const supplierController = new SupplierController(supplierService);

/* GET suppliers listing. */
router.get('/', function (req, res, next) {
    res.send('Módulo de fornecedores rodando.');
});

// Rota para criar um novo fornecedor
router.post('/createSupplier', async (req, res) => {
    supplierController.createSupplier(req, res);
});

// Rota para retornar todos os fornecedores
router.get('/allSuppliers', async (req, res) => {
    supplierController.findAllSuppliers(req, res);
});

// Rota para retornar um fornecedor pelo ID
router.get('/getSupplierById/:id', async (req, res) => {
    supplierController.findSupplierById(req, res);
});

// Rota para atualizar um fornecedor
router.put('/updateSupplier/:id', async (req, res) => {
    supplierController.updateSupplier(req, res);
});

// Rota para deletar um fornecedor
router.delete('/deleteSupplier/:id', async (req, res) => {
    supplierController.deleteSupplier(req, res);
});

module.exports = router;
