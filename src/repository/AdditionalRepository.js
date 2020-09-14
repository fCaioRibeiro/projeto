const mongosse = require('mongoose');
const Additional = mongosse.model('Additional');

exports.save = async(additional) => {
    let AdditionalEntity = new Additional(additional);
    await AdditionalEntity.save();
};

exports.getById = async(id) => {
    return await Additional.findById(id);    
};

exports.list = async() => {
    return await Additional.find().sort({'name':'asc'});
};

exports.delete = async(additional) => {
    await Additional.findByIdAndUpdate(additional._id, {
        $set: additional
    });
};