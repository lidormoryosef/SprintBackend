const memberModel = require('../Model/MemberModel');
const model = memberModel;
async function getMembersService(){
    let members = await model.getMembersModel();
    if(members == null){
        return null;
    }
    return members;
}
async function addOrUpdateMemberService(member){
    let id = await retunIdIfExistsByProfile(member.linkedInProfile);
    if(id !== id){
        return await model.updateMemberByIdModel(id,member);
    }
    return await model.addMemberModel(member);
}
async function getMemberByIdService(id){
    return await model.getMemberByIdModel(id);
}
async function updateMemberByIdService(id,member){
    return await model.updateMemberByIdModel(id,member);
}
async function deleteMemberByIdService(id){
    return await model.deleteMemberByIdModel(id);
}
async function getCountOfMembersService(){
    return await model.getCountOfMembersModel();
}
module.exports ={getMembersService,
    getMemberByIdService,
    updateMemberByIdService,
    deleteMemberByIdService,
    getCountOfMembersService,
    addOrUpdateMemberService};