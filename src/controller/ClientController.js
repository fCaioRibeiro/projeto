const clientRepository = require('../repository/ClientRepository');

exports.getByCellphone = async(req, res, next) => {
    try {
        const resultSet = await  clientRepository.getByCellphone(req.params.cellphone);
        res.status(200).send(resultSet);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar a requisição.'
        })
    }  
};