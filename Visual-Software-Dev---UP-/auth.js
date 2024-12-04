const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || '123'; // Use variável de ambiente para maior segurança

// Método para gerar o token JWT com apenas o userId
async function generateToken(user) {
    const id = user.id;
    const token = jwt.sign({ id }, secret, { expiresIn: '1h' });
    return token;
}

// Middleware para verificar a validade do token JWT
async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não informado' });
    }

    const token = authHeader.split(' ')[1]; // Separar pelo espaço para ignorar a palavra 'Bearer'
    if (!token) {
        return res.status(401).json({ message: 'Token não informado' });
    }

    // Verificar a validade do token
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.userId = decoded.id; // Salva o userId no objeto da requisição
        next();
    });
}

module.exports = { generateToken, verifyToken };


