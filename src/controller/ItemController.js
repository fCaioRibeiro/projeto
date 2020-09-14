const itemRepository = require('../repository/ItemRepository');

exports.save = async (req, res, next) => {
    try {
        await itemRepository.save({
            name: req.body.name,
            dataSheet: req.body.dataSheet,
            price: req.body.price,
            category: req.body.category,
            sizes: req.body.sizes,
            hasAdditional: req.body.hasAdditional,
            hasEdges: req.body.hasEdges,
            image: req.body.image
        });
        res.status(201).send({
            message: "Item cadastrado com sucesso!"
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: e.message
        });
    }
};

exports.getById = async (req, res, next) => {
    try {
        const resultSet = await itemRepository.getById(req.params.id);
        res.status(200).send(resultSet);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar a requisição.'
        })
    }
};

exports.list = async (req, res, next) => {
    try {
        const resultSet = await itemRepository.list();
        res.status(200).send(resultSet);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar a requisição.'
        })
    }
};

exports.update = async (req, res, next) => {
    try {
        await itemRepository.update({
            _id: req.body._id,
            name: req.body.name,
            dataSheet: req.body.dataSheet,
            price: req.body.price,
            category: req.body.category,
            sizes: req.body.sizes,
            hasAdditional: req.body.hasAdditional,
            hasEdges: req.body.hasEdges,
            image: req.body.image
        });
        res.status(201).send({
            message: "Item atualizado com sucesso!"
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: e.message
        })
    }
};

exports.delete = async (req, res, next) => {
    try {
        await itemRepository.delete({
            _id: req.body._id,
            image: req.body.image
        });
        res.status(201).send({
            message: "Item deletado com sucesso!"
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar a requisição.'
        })
    }
};

exports.upload = async (req, res, next) => {
    try {
        await itemRepository.upload(req.file);
        const image = {
            path: req.file ? req.file.path.replace('/usr/src/app', '') : null,
            filename: req.file ? req.file.filename : null,
            originalname: req.file ? req.file.originalname : null,
            key: req.file ? req.file.filename.replace(`-${req.file.originalname}`, '' ) : null
        };
        res.status(201).send({
            message: image
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: e.message
        })
    }
};