const mongosse = require('mongoose');
const Category = mongosse.model('Category');

exports.save = async(category) => {
    let CategoryEntity = new Category(category);
    await CategoryEntity.save();
};

exports.getById = async(id) => {
    return await Category.findById(id);    
};

exports.list = async() => {
    return await Category.find().sort({'name':'asc'});
};

exports.delete = async(category) => {
    await Category.findByIdAndUpdate(category._id, {
        $set: category
    });
};