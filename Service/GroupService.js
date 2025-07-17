const groupModel = require('../Model/GroupModel');
const model = groupModel;

async function getCountOfGroupsService(){
    return await model.getCountOfGroupsModel();
}
async function getTheBiggestGroupService(){
    return await model.getTheBiggestGroupModel();
}
async function getAllGroupsService(){
    return await model.getAllGroupsModel();
}
async function getAllGroupsByIdService(id){
    return await model.getAllGroupsByIdModel(id);
}
async function getAllMembersThatBelongToGroupsService(ids){
    return await model.getAllMembersThatBelongToGroups(ids);
}
async function addMemberToGroupService(groupMember){
    return await model.saveGroupMemberModel(groupMember);
}
module.exports ={getCountOfGroupsService,addMemberToGroupService,getAllGroupsService,getTheBiggestGroupService,getAllGroupsByIdService,getAllMembersThatBelongToGroupsService};