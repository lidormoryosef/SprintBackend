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
async function addOrUpdateMemberController(request,response){
    const member = await service.addOrUpdateMemberService(request.body);
    if(member === null ){
        response.status(500).send();
    }else if (member === "Not Exists"){
        response.status(404).send();
    }else{
        response.status(200).send();
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

module.exports = {getMembersController,
    getMemberByIdController,
    deleteMemberByIdController,
    getCountOfMembersController,
    addOrUpdateMemberController};