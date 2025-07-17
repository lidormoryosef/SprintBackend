const memberService = require('../Service/MemberService');
const service = memberService;

async function getMembersPageController(request,response){
    const members = await service.getMembersPageService(request.params.page);
    if(members !== null ){
        response.status(200).send(members);
    }else{
        response.status(500).send();
    }
}
async function getMembersSortPageController(request,response){
    const members = await service.getMembersSortPageService(request.params.page,request.params.fieldSort);
    if(members !== null ){
        response.status(200).send(members);
    }else{
        response.status(500).send();
    }
}
async function getMembersByGroupIdPageController(request,response){
    const members = await service.getMembersByGroupIdPageService(request.params.page,request.params.groupId);
    if(members !== null ){
        response.status(200).send(members);
    }else{
        response.status(500).send();
    }
}
async function addOrUpdateMemberController(request,response){
    const member = await service.addOrUpdateMemberService(request.body);
    if(member === null ){
        response.status(500).send();
    }else if (member === "Not Exists"){
        response.status(404).send();
    }else{
        response.status(200).send(member.member_id);
    }
}
async function getMemberByIdController(request,response){
    const member = await service.getMemberByIdService(request.params.id);
    if(member === null ){
        response.status(500).send();
    }else if(member === "Not Exists"){
        response.status(404).send();
    }else{
        response.status(200).send(member);
    }
}

async function deleteMemberByIdController(request,response){
    const result = await service.deleteMemberByIdService(request.params.id);
    if(result === null ){
        response.status(500).send();
    }else if(result === "Not Exsits"){
        response.status(404).send();
    }else{
        response.status(200).send();
    }
}
async function getCountOfMembersController(request,response){
    const count = await service.getCountOfMembersService();
    if(count === null ){
        response.status(500).send();
    }else{
        response.status(200).send(count);
    }
}
async function getBiggestCityController(request,response){
    const count = await service.getBiggestCityService();
    if(count === null ){
        response.status(500).send();
    }else{
        response.status(200).send(count);
    }
}
async function saveDetailsFromLinkedInController(request,response){
    let memberId = await service.saveDetailsFromLinkedInService(request.body.linkedin_url);
    if(memberId === null ){
        response.status(400).send();
    }else{
        let member = await service.getMemberByIdService(memberId);
        response.status(200).send(member);
    }
}
async function saveMembersFromExcelController(request,response){
    try{
        const result = await service.saveMembersFromExcelService(request.body);
        if(result === null ){
            response.status(500).send();
        }else{
            response.status(200).send();
        }
    }catch (error){
        response.status(400).send();
    }
}
async function saveMembersFromExcelLinkedinController(request,response){
    try{
        const result = await service.saveMembersFromExcelLinkedinService(request.body);
        if(result === null ){
            response.status(500).send();
        }else{
            response.status(200).send();
        }
    }catch (error){
        response.status(400).send();
    }
}
async function getMemberIncludeWordController(request,response){
    try{
        const result = await service.getMemberIncludeWordService(request.params.word);
        if(result === null ){
            response.status(500).send();
        }else{
            response.status(200).send(result);
        }
    }catch (error){
        response.status(400).send();
    }
}

module.exports = {getMembersPageController,getMemberIncludeWordController,
    saveDetailsFromLinkedInController,
    getMembersSortPageController,getBiggestCityController,
    getMembersByGroupIdPageController,
    getMemberByIdController,
    deleteMemberByIdController,
    getCountOfMembersController,
    addOrUpdateMemberController,
    saveMembersFromExcelController,saveMembersFromExcelLinkedinController};