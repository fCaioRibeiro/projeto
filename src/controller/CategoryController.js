const categoryRepository = require('../repository/CategoryRepository');

exports.save = async(req, res, next) => {
    try{
        await categoryRepository.save({
            name: req.body.name
        });

        res.status(201).send({
            message: "Categoria cadastrada com sucesso!"
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
        const resultSet = await  categoryRepository.getById(req.params.id);
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
        const resultSet = await categoryRepository.list();
        res.status(200).send(resultSet);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar a requisição.'
        })
    }
};