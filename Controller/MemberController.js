const memberService = require('../Service/MemberService');
const service = memberService;

async function getMembersController(request,response){
    const members = await service.getMembersService();
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
    if(member === null ){
        response.status(500).send();
    }else if(member === "Not Exsits"){
        response.status(404).send();
    }else{
        response.status(200).send(member);
    }
}
async function addOrUpdateMemberController(request,response){
    const member = await service.addOrUpdateMemberService(request.body.member);
    if(member === null ){
        response.status(500).send();
    }else if(member === "Bad Request"){
        response.status(404).send();
    }else{
        response.status(200).send();
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
    if(count === null ){
        response.status(500).send();
    }else{
        response.status(200).send(count);
    }
}

module.exports = {getMembersController,
    getMemberByIdController,
    updateMemberByIdController,
    deleteMemberByIdController,
    getCountOfMembersController,
    addOrUpdateMemberController};