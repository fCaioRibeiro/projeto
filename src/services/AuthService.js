const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return await jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
};

exports.decodeToken = async (token) => {
    const data = await jwt.verify(token, global.SALT_KEY);
    return data;
};

exports.authorize = (req, res, next) => {
    
    const token = req.headers['x-access-token'];
    if(!token){
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    }else{
        jwt.verify(token, global.SALT_KEY, (error, decoded) => {
            if(error){
                res.status(401).json({
                    message: 'Token Inválido'
                });
            }else{
                next();
            }
        });
    }
};

exports.isAdmin = function (req, res, next){
    
    const token = req.headers['x-access-token'];
    if(!token){
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    }else{
        jwt.verify(token, global.SALT_KEY, (error, decoded) => {
            if(error){
                res.status(401).json({
                    message: 'Token Inválido'
                });
            }else{
                if(decoded.roles.includes('ADMIN')){
                    next();
                }else{
                    res.status(403).json({
                        message: 'Acesso apenas para administrador.'
                    });
                }
            }
        });
    }
};