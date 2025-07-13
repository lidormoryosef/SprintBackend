const memberService = require('../Service/MemberService');
const service = memberService;

async function getAllMembersController(request,response){
    const members = await service.getAllMembersService();
    if(members !== null ){
        response.status(200).send(members);
    }else{
        response.status(500).send();
    }
}
async function getMemberByIdController(request,response){
    const member = await service.getMemberByIdService(request.params.id);
    if(member !== null ){
        response.status(200).send(member);
    }else{
        response.status(500).send();
    }
}
async function updateMemberByIdController(request,response){
    const result = await service.updateMemberByIdService(request.params.id,request.body.member);
    if(result !== null ){
        response.status(200).send();
    }else{
        response.status(500).send();
    }
}
module.exports = {getAllMembersController,getMemberByIdController,updateMemberByIdController};