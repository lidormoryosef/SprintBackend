const memberModel = require('../Model/MemberModel');
const model = memberModel;
async function getMembersService(){
    return await model.getMembersModel();
}
async function addOrUpdateMemberService(member){
    
    let id = await model.retunIdIfExistsByProfileModel(member.linkedin_url);
    if(id === null){
        return await model.addMemberModel(member);
    }
    if(id === "Error in Db"){
        return null;
    }
    return await model.updateMemberByIdModel(id,member);
}
async function getMemberByIdService(id){
    return await model.getMemberByIdModel(id);
}
async function deleteMemberByIdService(id){
    return await model.deleteMemberByIdModel(id);
}
async function getCountOfMembersService(){
    return await model.getCountOfMembersModel();
}
module.exports ={getMembersService,
    getMemberByIdService,
    deleteMemberByIdService,
    getCountOfMembersService,
    addOrUpdateMemberService};