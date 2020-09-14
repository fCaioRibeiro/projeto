const message = require('../exception/ErrorMessage');
const UserException = require('../exception/UserException');

exports.userValidation = (user) => {
    if(user.name.length <= 7 ){
        throw new UserException(message.messageInvalidUserName());
    }
    if(user.username.length <= 5 ){
        throw new UserException(message.messageInvalidUserUsername());
    }
    if(user.password.length <= 6 ){
        throw new UserException(message.messageInvalidUserPassword());
    }
};

exports.isUniqueUsername = (userFromBD) => {
    if(userFromBD){
        throw new UserException(message.messageIsUniqueUsername())
    };
};

exports.authorizationValidate = (user) => {
    if(!user){
        throw new UserException(message.messageInvalidUser());
    };
    // if(user.isLoggedIn){
    //     throw new UserException(message.messageLoggedId());
    // }
};