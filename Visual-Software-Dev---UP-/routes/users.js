const express = require('express');
const router = express.Router();
const auth = require('../auth'); // Carregar os objetos do auth.js

// Importar dependências para o funcionamento da classe User
const db = require('../models'); // Carregando o banco de dados
const UserService = require('../services/userService');
const UserController = require('../controllers/userController');

// Inicializar serviços e controladores
const userService = new UserService(db.User);
const userController = new UserController(userService);

/* GET users listing. */
router.get('/', (req, res) => {
    res.send('Módulo de usuários rodando.');
});

// Rota para login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.login(email, password);

        if (!user) {
            return res.status(401).json({ error: 'Usuário ou senha incorretos' });
        }

        // Gerar token JWT
        const token = await auth.generateToken(user);

        // Retornar o token e o ID do usuário
        res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro ao realizar login.' });
    }
});

// Rota para registrar novo usuário
router.post('/createuser', async (req, res) => {
    userController.createUser(req, res);
});

// Rota para retornar todos os usuários (protegida)
router.get('/allusers', auth.verifyToken, async (req, res) => {
    userController.findAllUsers(req, res);
});

// Rota para retornar um usuário pelo ID
router.get('/getUserById', async (req, res) => {
    userController.findUserById(req, res);
});

module.exports = router;
