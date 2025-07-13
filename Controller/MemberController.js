const memberService = require('../Service/MemberService');
const service = memberService;

async function getMembersByPageController(request,response){
    let page = request.params.page;
    if(!Number.isInteger(Number(page))){
        response.status(400).send();
    }
    const members = await service.getMembersByPageService(page);
    if(members !== null ){
        response.status(200).send(members);
    }else{
        response.status(500).send();
    }
}
async function getMemberByIdController(request,response){
    let id = request.params.id;
    if(!Number.isInteger(Number(id))){
        response.status(400).send();
    }
    const member = await service.getMemberByIdService(id);
    if(result === null ){
        response.status(500).send();
    }else if(result === "Not Exsits"){
        response.status(404).send();
    }else{
        response.status(200).send(member);
    }
}
async function updateMemberByIdController(request,response){
    let id = request.params.id;
    if(!Number.isInteger(Number(id))){
        response.status(400).send();
    }
    const result = await service.updateMemberByIdService(id,request.body.member);
    if(result === "Updated" ){
        response.status(200).send(member);
    }else if(result === "Not Exsits"){
        response.status(404).send();
    }else{
        response.status(500).send();
    }
}
async function deleteMemberByIdController(request,response){
    let id = request.params.id;
    if(!Number.isInteger(Number(id))){
        response.status(400).send();
    }
    const result = await service.deleteMemberByIdService(id);
    if(result === "Deleted" ){
        response.status(200).send(member);
    }else if(result === "Not Exsits"){
        response.status(404).send();
    }else{
        response.status(500).send();
    }
}
async function getCountOfMembersController(request,response){
    const count = await service.getCountOfMembersService();
    if(result === null ){
        response.status(500).send();
    }else{
        response.status(200).send(count);
    }
}
module.exports = {getMembersByPageController,
    getMemberByIdController,
    updateMemberByIdController,
    deleteMemberByIdController,
    getCountOfMembersController};