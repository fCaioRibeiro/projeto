const message = require('../exception/ErrorMessage');
const ItemException = require('../exception/ItemException');
const CategoryRepository = require('../repository/CategoryRepository');
const fs = require('fs');

exports.itemValidation = (item) => {
    if (item.name.length <= 3) {
        throw new ItemException(message.messageInvalidItemName());
    }
};

exports.invalidValue = (item) => {
    let hasVariation = false;
    item.sizes.forEach(element => {
        if (element.hasVariation === 'true') {
            if (element.price) {
                element.price = parseFloat(element.price.replace(',', '.'));
            } else {
                element.price = NaN;
            }
            if (isNaN(element.price)) {
                throw new ItemException(message.messageInvalidValue());
            }
            hasVariation = true
        }
    });


    if (!hasVariation) {
        if (item.price) {
            item.price = parseFloat(item.price.replace(',', '.'));
        } else {
            item.price = NaN;
        }
        if (isNaN(item.price)) {
            throw new ItemException(message.messageInvalidValue());
        }
    }
};

exports.isUniqueItem = (itemFromBD, newItem) => {
    itemFromBD.forEach(element => {
        if (itemFromBD.length > 0 && element.category.toString() === newItem.category.toString()) {
            throw new ItemException(message.messageIsUniqueItem());
        };
    });
};

exports.isUniqueItemUpdate = (itemFromBD, updateItem) => {
    itemFromBD.forEach(element => {
        if (itemFromBD.length > 0) {
            let verify = false;
            itemFromBD.some(element => {
                if (element._id.toString() !== updateItem._id.toString() && element.category._id.toString() === updateItem.category._id.toString()) {
                    verify = true;
                    return;
                };
            });
            if (verify) {
                throw new ItemException(message.messageIsUniqueItem());
            }
        }
    });
};

exports.emptyCategory = async (item) => {
    let category = null;
    if (item.category.length === 12 || item.category.length === 24) {
        category = await CategoryRepository.getById(item.category);
    }

    if (!category) {
        throw new ItemException(message.messageInvalidCategory());
    }
};

exports.emptyCategoryUpdate = async (item) => {
    let category = null;
    if (item.category._id.length === 12 || item.category._id.length === 24) {
        category = await CategoryRepository.getById(item.category);
    }

    if (!category) {
        throw new ItemException(message.messageInvalidCategory());
    }
};

exports.invalidImage = async (file) => {
    if (file && !file.isValid) {
        fs.unlink(file.path, () => { });
        throw new ItemException(message.messageInvalidImage());
    }
};

exports.imageRename = async (item) => {
    if (item.image.path) {
        const raiz = __dirname.replace('/src/services','');
        const oldPath = `${raiz}${item.image.path}`;
        const newPath = `${raiz}${item.image.path.replace(`${item.image.key}-${item.image.originalname}` , `${item.image.key}-${item.name}.jpg`)}`;
        fs.rename(oldPath, newPath, (error) => {
            if (error) {
                throw new ItemException('Error ou renomear arquivo.');
            }
        });
        item.image.path = newPath.replace(`${raiz}`,``);
        item.image.originalname = item.name+'.jpg';
        item.image.filename = item.image.key + '-' + item.image.originalname;
    }
    return item.image
};

exports.deleteImage = async(item) => {
    if(item.image.path.length > 0){
        const raiz = __dirname.replace('/src/services','');
        fs.unlink(`${raiz}${item.image.path}`, (error) => {  });
    }
}