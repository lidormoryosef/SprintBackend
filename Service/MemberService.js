const memberModel = require('../Model/MemberModel');
const model = memberModel;
async function getMembersByPageService(page){
    let members = await model.getMembersByPageModel(page);
    if(members == null){
        return null;
    }
    const filteredMembers = members.map(member => ({
    id: member.id,
    name: member.name,
    }));
    return filteredMembers;
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
module.exports ={getMembersByPageService,
    getMemberByIdService,
    updateMemberByIdService,
    deleteMemberByIdService,
    getCountOfMembersService};