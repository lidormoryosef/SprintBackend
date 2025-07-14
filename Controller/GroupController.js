const groupService = require('../Service/GroupService');
const service = groupService;

async function getCountOfGroupsController(request,response){
    const count = await service.getCountOfGroupsService();
    if(result === null ){
        response.status(500).send();
    }else{
        response.status(200).send(count);
    }
}
module.exports = {getCountOfGroupsController};