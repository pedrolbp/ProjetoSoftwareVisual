const auth = require('../auth'); // Certifique-se de que existe a função `generateToken` no auth.js
const CartService = require('../services/cartService'); // Importa o serviço de carrinho
const db = require('../models'); // Importa o banco de dados

const cartService = new CartService(db.Cart); // Inicializa o serviço de carrinho

class UserController {
    constructor(UserService) {
        this.userService = UserService;
    }

    async createUser(req, res) {
        const { email, data_nasc, password } = req.body;
        try {
            if (password.length < 3) {
                return res.status(400).json({ error: 'A senha não pode ter menos 3 caracteres!' });
            }

            // Criar o usuário
            const newUser = await this.userService.create(email, data_nasc, password);

            // Criar automaticamente um carrinho para o novo usuário
            await cartService.create(newUser.id);

            return res.status(200).json({
                message: 'Usuário criado com sucesso!',
                user: newUser,
            });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ error: 'Erro ao gravar o novo usuário.' });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await this.userService.login(email, password);

            if (!user) {
                return res.status(401).json({ error: 'Usuário ou senha incorretos' });
            }

            // Gera um token (exemplo usando JWT)
            const token = auth.generateToken(user.id);

            // Retorna o token e o ID do usuário
            res.status(200).json({
                token, // JWT Token
                user: {
                    id: user.id, // ID do usuário
                    email: user.email, // Email do usuário
                },
            });
        } catch (error) {
            console.error('Erro ao logar o usuário:', error);
            res.status(500).json({ error: 'Erro ao logar o usuário.' });
        }
    }

    async findAllUsers(req, res) {
        try {
            const allUsers = await this.userService.findAll();
            res.status(200).json(allUsers);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar todos os usuários.' });
        }
    }

    async findUserById(req, res) {
        const { id } = req.query;
        try {
            const user = await this.userService.findById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuário pelo ID.' });
        }
    }
}

module.exports = UserController;
