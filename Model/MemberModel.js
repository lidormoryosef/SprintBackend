const { CommunityMember } = require('./Connections');

async function getMembersModel() {
    try{
          return await CommunityMember.findAll({
            attributes: ['member_id', 'english_name', 'role', 'current_company','city'] 
        });
    }catch(error){
        return null;
    }


}
async function retunIdIfExistsByProfileModel(link) {
  try{
      const member = await CommunityMember.findOne({
      where: { linkedin_url: link },
      attributes: ['member_id'] });
      return member ? member.member_id : null;
  }catch(error){
    return "Error in Db";
  }
}
async function updateMemberByIdModel(id, data) {
  try{
    const member = await CommunityMember.findByPk(id);
      if (!member){
        return "Not Exists";
      } 
    return await member.update(data);
  }catch(error){
    return null;
  }

}
async function addMemberModel(data) {
  try{
      return await CommunityMember.create(data);
  }catch(error){
    console.log(error);
    return null;  
  }
}
async function getMemberByIdModel(id) {
  try{
    let res = await CommunityMember.findByPk(id);
    if(res === null){
      return "Not Exists";
    }
    return res;
  }catch(error){
    return null;
  }
  
}

async function deleteMemberByIdModel(id) {
  try{
      const member = await CommunityMember.findByPk(id);
      if (!member) {
        return "Not Exists";
      }
      return await member.destroy();
  }catch(error){
      return null;
  }
  
}
async function getCountOfMembersModel() {
  try{
    return await CommunityMember.count();
  }catch(error){
      return null;
  }
  
}

module.exports = {getMembersModel,
  retunIdIfExistsByProfileModel,
  updateMemberByIdModel,
  addMemberModel,
  getMemberByIdModel,
  deleteMemberByIdModel,
  getCountOfMembersModel};
