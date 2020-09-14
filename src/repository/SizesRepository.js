const mongosse = require('mongoose');
const Sizes = mongosse.model('Sizes');

exports.save = async(sizes) => {
    let SizesEntity = new Sizes(sizes);
    await SizesEntity.save();
};

exports.list = async() => {
    return await Sizes.find().sort({ 'size': 'asc' });
};