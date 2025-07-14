const companyService = require('../Service/CompanyService');
const service = companyService;

async function getHistoryJobByIdController(request,response){
    const history = await service.getHistoryJobByIdService(request.params.id);
    if(history === null ){
        response.status(500).send();
    }else{
        response.status(200).send(history);
    }
}

module.exports = {getHistoryJobByIdController};