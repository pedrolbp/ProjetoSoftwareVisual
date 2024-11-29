var express = require('express');//Para as rotas
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Importando o pacote CORS

// Importando o Sequelize e o modelo User
var sequelize = require('./models').sequelize;
// var User = require('./models/user')(sequelize);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/product');
var cartsRouter = require('./routes/carts');
var paymentRouter = require('./routes/payment');

var app = express();//Ativa a API com o Express

// Configuração do CORS
app.use(cors({
    origin: 'http://localhost:5173', // Permite requisições do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true // Permite envio de cookies e credenciais
}));

app.use(logger('dev'));
app.use(express.json()); //Permite o uso de JSon
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);//Cria a rota app/
app.use('/users', usersRouter);//Cria a rota app/users
app.use('/product', productsRouter);
app.use('/carts', cartsRouter);
app.use('/payment', paymentRouter);

// Sincronizando o Sequelize (em dev)
//Instanciar o banco de dados

const db = require('./models');

async function applyDataStructure(){
    await db.sequelize.sync({alter: true});
}

db.sequelize.sync({ alter: true }).then(() => {
  console.log('Banco de dados sincronizado');
}).catch((err) => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});

// Iniciar o servidor com o app.js na porta 3000
var port = 3000;
app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;

