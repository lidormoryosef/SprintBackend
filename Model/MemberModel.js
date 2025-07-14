const { CommunityMember } = require('./Connections');

async function getAllMembers() {
    try{
          return await CommunityMember.findAll({
            attributes: ['member_id', 'english_name', 'role', 'current_company','city'] 
        });
    }catch(error){
        return null;
    }


}
async function getMemberById(id) {
  return await CommunityMember.findByPk(id);
}

// Example: Create new member
async function createMember(data) {
  return await CommunityMember.create(data);
}

// Example: Update member
async function updateMember(id, data) {
  const member = await CommunityMember.findByPk(id);
  if (!member) return null;
  return await member.update(data);
}

// Example: Delete member
async function deleteMember(id) {
  const member = await CommunityMember.findByPk(id);
  if (!member) return null;
  return await member.destroy();
}

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember
};
