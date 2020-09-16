const companyRepository = require('../repository/CompanyRepository');

exports.save = async(req, res, next) => {
    try {
        await companyRepository.save({
            name: req.body.name,
            address: req.body.address,
            openingHours: req.body.openingHours,
            link: req.body.link,
            expirationData: req.body.expirationData
        });

        res.status(201).send({
            message: "Empresa cadastrada com sucesso!"
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ 
            message: 'Falha ao processar a requisição.'
        });
    }
};

exports.findOne = async(req, res, next) => {
    try {
        const resultSet = await companyRepository.findOne();
        res.status(200).send(resultSet);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar a requisição.'
        })
    }
};