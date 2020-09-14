const sizesRepository = require('../repository/SizesRepository');

exports.save = async(req, res, next) => {
    try {
        await sizesRepository.save({
            size: req.body.size,
            description: req.body.description
        });

        res.status(201).send({
            message: "Tamanho cadastrado com sucesso!"
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ 
            message: 'Falha ao processar a requisição.'
        });
    }
};

exports.list = async(req, res, next) => {
    try {
        const resultSet = await sizesRepository.list();
        res.status(200).send(resultSet);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar a requisição.'
        })
    }
};