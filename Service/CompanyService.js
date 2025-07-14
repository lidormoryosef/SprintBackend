const CompanyModel = require('../Model/CompanyModel');
const model = CompanyModel;

async function getHistoryJobByIdService(id){
    return await model.getHistoryJobByIdModel(id);
}

module.exports ={getHistoryJobByIdService};