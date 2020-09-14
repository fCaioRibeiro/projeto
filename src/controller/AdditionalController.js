const additionalRepository = require('../repository/AdditionalRepository');

exports.save = async(req, res, next) => {
    try{
        await additionalRepository.save({
            name: req.body.name,
            price: req.body.price
        });

        res.status(201).send({
            message: "Adicional cadastrada com sucesso!"
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
        const resultSet = await  additionalRepository.getById(req.params.id);
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
        const resultSet = await additionalRepository.list();
        res.status(200).send(resultSet);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar a requisição.'
        })
    }
};