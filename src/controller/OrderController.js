const orderRepository = require('../repository/OrderRepository');
const guid = require('guid');

exports.save = async(req, res, next) => {
    try {
        const resultSet = await orderRepository.save({
            codigo: guid.raw().substring(0, 6),
            wasVisualized: req.body.wasVisualized,
            user: req.body.user,
            table: req.body.table,
            items: req.body.items,
            increase: req.body.increase,
            creationDate: new Date(),
            endDate: req.body.endDate,
            observation: req.body.observation,
            orderValue: req.body.orderValue,
            totalValue: req.body.totalValue,
            client: req.body.client,
            street: req.body.street,
            number: req.body.number,
            district: req.body.district,
            exclusionDate: req.body.exclusionDate,
            printingDate: req.body.printingDate,
            payment: req.body.payment
        });
        res.status(201).send({
            message: "Comanda cadastrada com sucesso!",
            codigo: resultSet.codigo
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ 
            message: e.message
        });
    } 
};

exports.getById = async(req, res, next) => {
  try {
      const resultSet = await orderRepository.getById(req.params.id);
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
        const resultSet = await orderRepository.list();
        res.status(200).send(resultSet);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar a requisição.'
        })
    }
};

exports.update = async(req, res, next) =>{
    try {
        await orderRepository.update({
            _id: req.body._id,
            codigo: req.body.codigo,
            wasVisualized: req.body.wasVisualized,
            user: req.body.user,
            table: req.body.table,
            items: req.body.items,
            increase: req.body.increase,
            creationDate: req.body.creationDate,
            endDate: req.body.endDate,
            observation: req.body.observation,
            orderValue: req.body.orderValue,
            totalValue: req.body.totalValue,
            client: req.body.client,
            street: req.body.street,
            number: req.body.number,
            district: req.body.district,
            exclusionDate: req.body.exclusionDate,
            printingDate: req.body.printingDate,
            payment: req.body.payment
        });
        res.status(201).send({
            message: "Comanda atualizada com sucesso!"
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: e.message
        })
    }
};

exports.delete = async(req, res, next) => {
    try {
        await orderRepository.delete({
            _id: req.body._id,
            codigo: req.body.codigo,
            wasVisualized: req.body.wasVisualized,
            user: req.body.user,
            table: req.body.table,
            items: req.body.items,
            increase: req.body.increase,
            creationDate: req.body.creationDate,
            endDate: req.body.endDate,
            observation: req.body.observation,
            orderValue: req.body.orderValue,
            totalValue: req.body.totalValue,
            client: req.body.client,
            street: req.body.street,
            number: req.body.number,
            district: req.body.district,
            exclusionDate: req.body.exclusionDate || new Date,
            printingDate: req.body.printingDate,
            payment: req.body.payment
        });
        res.status(201).send({
            message: "Comanda cancelada com sucesso!"
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar a requisição.'
        })
    }
};

exports.finalize = async(req, res, next) => {
    try {
        await orderRepository.finalize({
            _id: req.body._id,
            codigo: req.body.codigo,
            wasVisualized: req.body.wasVisualized,
            user: req.body.user,
            table: req.body.table,
            items: req.body.items,
            increase: req.body.increase,
            creationDate: req.body.creationDate,
            endDate: req.body.endDate || new Date,
            observation: req.body.observation,
            orderValue: req.body.orderValue,
            totalValue: req.body.totalValue,
            client: req.body.client,
            street: req.body.street,
            number: req.body.number,
            district: req.body.district,
            exclusionDate: req.body.exclusionDate,
            printingDate: req.body.printingDate,
            payment: req.body.payment
        });
        res.status(201).send({
            message: "Comanda finalizada com sucesso!"
        }); 
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar a requisição.'
        })
    }
};

exports.getByLastThreeDays = async(req, res, next) => {
    try {
        const resultSet = await orderRepository.getByLastThreeDays();
        res.status(200).send(resultSet);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar a requisição.'
        })
    }
};