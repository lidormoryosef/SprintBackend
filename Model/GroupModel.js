const { Group ,GroupMembers,CommunityMember,sequelize} = require('./Connections');
const { Op ,fn, col, literal} = require('sequelize');
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
async function getMembersIdByGroupIdModel(page,groupId) {
  try {
    const pageSize = 7;
    const offset = page * pageSize;
    return await GroupMembers.findAll({
      where: { group_id: groupId },
      attributes: ['member_id'],
      limit: pageSize,
      offset: offset
    });
  } catch (error) {
    console.error(error);
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
async function getTheBiggestGroupModel() {
  try {
    const [topGroup] = await GroupMembers.findAll({
      attributes: [
        'group_id',
        [sequelize.fn('COUNT', sequelize.col('member_id')), 'memberCount']
      ],
      group: ['group_id'],
      order: [[sequelize.literal('memberCount'), 'DESC']],
      limit: 1,
      raw: true
    });

    if (!topGroup) return null;

    const group = await Group.findOne({
      where: { group_id: topGroup.group_id },
      attributes: ['group_id', 'group_name'],
      raw: true
    });

    return {
      group_id: group.group_id,
      group_name: group.group_name,
      memberCount: topGroup.memberCount
    };
  } catch (error) {
    console.error('Error finding biggest group:', error);
    throw error;
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
async function getAllMembersThatBelongToGroups(groupIds){
  try{
      console.log(groupIds);
      const members = await CommunityMember.findAll({
      attributes: ['member_id', 'english_name', 'phone', 'email', 'city', 'role', 'years_of_experience'],
      include: [{
        model: Group,
        as: 'groups',
        where: {
          group_id: { [Op.in]: groupIds }
        },
        attributes: []
        }]
        });
    return members;
  }catch(error){
    return null;
  }
} 
module.exports = {getAllGroupsModel,getAllMembersThatBelongToGroups,
    getMembersIdByGroupIdModel,
    getAllGroupsByIdModel,
    getCountOfGroupsModel,
    getDetailsGroupModel,
    saveGroupModel,saveGroupMemberModel,getTheBiggestGroupModel};