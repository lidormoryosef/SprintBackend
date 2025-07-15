const groupService = require('../Service/GroupService');
const service = groupService;

async function getCountOfGroupsController(request,response){
    const count = await service.getCountOfGroupsService();
    if(count === null ){
        response.status(500).send();
    }else{
        response.status(200).send(count);
    }
}
async function getAllGroupsController(request,response){
    const groups = await service.getAllGroupsService();
    if(groups === null ){
        response.status(500).send();
    }else{
        response.status(200).send(groups);
    }
}
async function getAllGroupsByIdController(request,response){
    const groups = await service.getAllGroupsByIdService(request.params.id);
    if(groups === null ){
        response.status(500).send();
    }else{
        response.status(200).send(groups);
    }
}
module.exports = {getCountOfGroupsController,getAllGroupsController,getAllGroupsByIdController};