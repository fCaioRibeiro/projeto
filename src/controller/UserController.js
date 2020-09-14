const userRepository = require('../repository/UserRepository');
const md5 = require('md5');
const authService = require('../services/AuthService');

exports.save = async (req, res, next) => {
    try {
        await userRepository.save({
            name: req.body.name,
            username: req.body.username,
            password: md5(req.body.password + global.SALT_KEY),
            roles: req.body.roles,
            isLoggedIn: req.body.isLoggedIn
        });

        res.status(201).send({
            message: "Usuário cadastrado com sucesso!"
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: e.message
        });
    }
};

exports.update = async (req, res, next) => {
    try{
        await userRepository.update({
            _id: req.body._id,
            name: req.body.name,
            username: req.body.username,
            password: md5(req.body.password + global.SALT_KEY),
            roles: req.body.roles,
            isLoggedIn: req.body.isLoggedIn
        });
        res.status(201).send({
            message: "Usuário atualizado com sucesso!"
        });
    }catch (e){
        console.log(e);
        res.status(500).send({
            message: e.message
        });
    }
    
};

exports.getByUsernameAndPassword = async (req, res, next) => {
    try {
        const user = await userRepository.getByUsernameAndPassword({
            username: req.body.username,
            password: md5(req.body.password + global.SALT_KEY)
        });

        const token = await authService.generateToken({
            id: user._id,
            name: user.name,
            username: user.username,
            roles: user.roles
        });

        await userRepository.update({
            _id: user._id,
            name: user.name,
            username: user.username,
            password: user.password,
            roles: user.roles,
            isLoggedIn: token
        });

        res.status(201).send({
            token: token,
            data: {
                id: user._id,
                name: user.name,
                username: user.username,
                roles: user.roles
            },
            message: 'Logado com sucesso.'
        });

    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: e.message
        });
    }
};

exports.logout = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        const user = await userRepository.getById(data.id);

        await userRepository.update({
            _id: user._id,
            name: user.name,
            username: user.username,
            password: user.password,
            roles: user.roles,
            isLoggedIn: ''
        });

        res.status(200).send({
            message: 'Deslogado com sucesso.'
        });
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: e.message
        });
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        res.status(200).send({
            message: "Usuário com permissão!"
        });
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: e.message
        });
    }
};