const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./bin/config');
const io = require('socket.io')();
const cors = require('cors');
require('./bin/socket_io')(io);
const app = express();
const request = require('request');
const morgan = require('morgan');

//Conexão com o banco
mongoose.connection.on("open", function (ref) {
    console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function (err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
});

mongoose.connect(config.connectionStringBD, {
    useNewUrlParser: true,
    poolSize: 1,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000   // Close sockets after 45 seconds of inactivity
});

//Carregar os modelos
const Order = require('./src/models/Order');
const Item = require('./src/models/Item');
const User = require('./src/models/User');
const Category = require('./src/models/Category');
const Additional = require('./src/models/Additional');
const Edges = require('./src/models/Edges');
const Client = require('./src/models/Client');
const Company = require('./src/models/Company');
const Sizes = require('./src/models/Sizes');

//Carregar as rotas
const OrderRoutes = require('./src/routes/OrderRoutes');
const ItemRoutes = require('./src/routes/ItemRoutes');
const UserRoutes = require('./src/routes/UserRoutes');
const CategoryRoutes = require('./src/routes/CategoryRoutes');
const AdditionalRoutes = require('./src/routes/AdditionalRoutes');
const EdgesRoutes = require('./src/routes/EdgesRoutes');
const ClientRoutes = require('./src/routes/ClientRoutes');
const CompanyRoutes = require('./src/routes/CompanyRoutes');
const SizesRoutes = require('./src/routes/SizesRoutes');

app.io = io;
app.use(bodyParser.json({
    limit: '15mb'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname));
app.use(morgan('dev'));

// Habilita o CORS
app.use(cors());

// Define as Rotas
app.get('/', (req, res, next) => {
    res.status(200).send("API Ligada.");   
});
app.get('/api/distanceMatrix/:cep', async (req, res, next) => {
    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=%2263011072%22&destinations=%22'+req.params.cep+'%22&mode=driving&language=pt-BR&sensor=false&key='+config.connectionStringDistanceMatrixKey;
    await request.get(url, (error, response) => {
        res.status(200).send({
            message: JSON.parse(response.body)
        });
    });
});
app.get('/api/viaCep/:cep', async (req, res, next) => {
    const url = `https://viacep.com.br/ws/${req.params.cep}/json/`;
    await request.get(url, (error, response) => {
        res.status(200).send({
            message: JSON.parse(response.body)
        });
    });
});
app.use('/order', OrderRoutes);
app.use('/item', ItemRoutes);
app.use('/user', UserRoutes);
app.use('/category', CategoryRoutes);
app.use('/additional', AdditionalRoutes);
app.use('/edges', EdgesRoutes);
app.use('/client', ClientRoutes);
app.use('/company', CompanyRoutes);
app.use('/sizes', SizesRoutes);

module.exports = app;