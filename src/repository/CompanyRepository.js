const mongosse = require('mongoose');
const Company = mongosse.model('Company');

exports.save = async(company) => {
    let CompanyEntity = new Company(company);
    await CompanyEntity.save();
};

exports.findOne = async() => {
    return await Company.findOne();
};