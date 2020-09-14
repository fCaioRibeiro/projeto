const edgesRepository = require('../repository/EdgesRepository');

exports.save = async(req, res, next) => {
    try{
        await edgesRepository.save({
            name: req.body.name,
            sizes: req.body.sizes
        });

        res.status(201).send({
            message: "Borda cadastrada com sucesso!"
        });
    }catch(e){
        console.log(e);
        res.status(500).send({ 
            message: 'Falha ao processar a requisição.'
        });
    }
};

exports.getById = async(req, res, next) => {
    try {
        const resultSet = await  edgesRepository.getById(req.params.id);
        res.status(200).send(resultSet);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar a requisição.'
        })
    }  
};

exports.list = async(req, res, next) => {
    try {
        const resultSet = await edgesRepository.list();
        res.status(200).send(resultSet);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar a requisição.'
        })
    }
};