const { Group } = require('./Connections');
const { GroupMembers } = require('./Connections');

async function getAllGroupsModel() {
    try{
          return await Group.findAll({
            attributes: ['group_id', 'group_name'] 
        });
    }catch(error){
        return null;
    }
}
async function getAllGroupsByIdModel(id) {
    try{
        return await Group.findAll({
        include: [{
            model: GroupMembers,
            as: 'groupMembers',   
            where: { member_id: id },
            attributes: []
        }],
        attributes: ['group_name', 'description', 'other_details']
        });



    }catch(error){
        return null;
    }

}
async function getCountOfGroupsModel(id) {
    try{
        return await Group.count();
    }catch(error){
        return null;
    }

}
async function getDetailsGroupModel(nameGroup){
  try {
    const group = await Group.findOne({
      where: { group_name: nameGroup },
      attributes: ['group_id', 'group_name', 'description', 'other_details']
    });

    return group;
  } catch (error) {
    throw error;
  }
}
async function saveGroupModel(group){
  try{
      return await Group.create(group);
  }catch(error){
    throw error;  
  }
} 
async function saveGroupMemberModel(groupMember){
  try{
      return await GroupMembers.create(groupMember);
  }catch(error){
    throw error;  
  }
} 
module.exports = {getAllGroupsModel,
    getAllGroupsByIdModel,
    getCountOfGroupsModel,
    getDetailsGroupModel,
    saveGroupModel,saveGroupMemberModel};