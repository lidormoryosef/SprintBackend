const memberModel = require('../Model/MemberModel');
const model = memberModel;
async function getAllMembersService(){
    try{
        return await model.getAllMembersModel();
    }catch(error){
        return null;
    }
}
async function getMemberByIdService(id){
    try{
        return await model.getMemberByIdModel(id);
    }catch(error){
        return null;
    }
}
async function updateMemberByIdService(id,member){
    try{
        return await model.updateMemberByIdModel(id,member);
    }catch(error){
        return null;
    }
}
module.exports ={getAllMembersService,getMemberByIdService,updateMemberByIdService};