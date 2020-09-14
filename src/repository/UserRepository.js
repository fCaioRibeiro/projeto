const mongoose = require('mongoose');
const User = mongoose.model('User');
const UserService = require('../services/UserService');

exports.save = async(user) => {

    await UserService.userValidation(user);

    const userFromBD = await User.findOne({
        username: user.username
    });
    
    await UserService.isUniqueUsername(userFromBD);
    
    let userEntity = new User(user);
    await userEntity.save();

};

exports.getByUsernameAndPassword = async(user) => {
    const resultSet = await User.findOne({
        username: user.username,
        password: user.password
    });

    await UserService.authorizationValidate(resultSet);
    
    return resultSet;
};

exports.getById = async(id) => {
    return await User.findById(id);
};

exports.update = async(user) => {
    await User.findByIdAndUpdate(user._id, {
        $set: user
    });
};
