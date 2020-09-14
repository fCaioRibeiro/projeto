const mongosse = require('mongoose');
const Edges = mongosse.model('Edges');

exports.save = async(edges) => {
    let EdgesEntity = new Edges(edges);
    await EdgesEntity.save();
};

exports.getById = async(id) => {
    return await Edges.findById(id);    
};

exports.list = async() => {
    return await Edges.find().sort({'name':'asc'});
};

exports.delete = async(edges) => {
    await Edges.findByIdAndUpdate(edges._id, {
        $set: edges
    });
};