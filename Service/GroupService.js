const groupModel = require('../Model/GroupModel');
const model = groupModel;

async function getCountOfGroupsService(){
    return await model.getCountOfGroupsModel();
}

module.exports ={getCountOfGroupsService};