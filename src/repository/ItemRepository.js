const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const ItemService = require('../services/ItemService');

exports.save = async (item) => {
    await ItemService.itemValidation(item);
    await ItemService.emptyCategory(item);
    await ItemService.invalidValue(item);
    const itemFromBD = await Item.find({ name: item.name });
    await ItemService.isUniqueItem(itemFromBD, item);
    item.image = await ItemService.imageRename(item);

    let ItemEntity = new Item(item);
    await ItemEntity.save()
};

exports.getById = async (id) => {
    return await Item.findById(id).populate('category');
};

exports.list = async () => {
    return await Item.find().sort({ 'name': 'asc' }).populate('category');
};

exports.update = async (item) => {

    await ItemService.itemValidation(item);
    await ItemService.emptyCategoryUpdate(item);
    await ItemService.invalidValue(item);
    const itemFromBD = await Item.find({ name: item.name });
    await ItemService.isUniqueItemUpdate(itemFromBD, item);
    item.image = await ItemService.imageRename(item);

    await Item.findByIdAndUpdate(item._id, {
        $set: item
    });
};

exports.delete = async (item) => {
    await Item.findOneAndDelete({
        _id: item._id
    });
    ItemService.deleteImage(item);
};

exports.upload = async (file) => {
    await ItemService.invalidImage(file);
};
