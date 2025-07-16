const { CommunityMember ,sequelize} = require('./Connections');
const { Op ,QueryTypes } = require('sequelize');
const pageSize = 7;
async function getMembersPageModel(page) {
  
  const offset = page * pageSize;
  try {
    return await CommunityMember.findAll({
      attributes: ['member_id', 'english_name', 'phone', 'email', 'city', 'role', 'years_of_experience'],
      limit: pageSize,
      offset: offset
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
async function getMembersSortPageModel(page, field) {
  const offset = page * pageSize;

  try {
    return await CommunityMember.findAll({
      attributes: ['member_id', 'english_name', 'phone', 'email', 'city', 'role', 'years_of_experience'],
      order: [[field, 'ASC']],
      limit: pageSize,
      offset: offset
    });
  } catch (error) {
    console.error(error);
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
async function getBiggestCityModel() {
  try {
    // Step 1: Get the city with the highest count
    const [biggest] = await sequelize.query(
      `SELECT city, COUNT(*) as count 
       FROM CommunityMembers 
       WHERE city IS NOT NULL AND city != ''
       GROUP BY city 
       ORDER BY count DESC 
       LIMIT 1`,
      { type: QueryTypes.SELECT }
    );

    if (!biggest) return null;

    // Step 2: Get the exact count again if needed (optional — already have it above)
    const count = await CommunityMember.count({
      where: { city: biggest.city }
    });

    return {
      city: biggest.city,
      count
    };
  } catch (error) {
    console.error("Error finding biggest city:", error);
    throw error;
  }
}
async function getMemberIncludeWordModel(word) {
  console.log(word);
  const likeWord = `%${word}%`;

  try {
    const results = await CommunityMember.findAll({
      where: {
        [Op.or]: [
          { full_name: { [Op.like]: likeWord } },
          { english_name: { [Op.like]: likeWord } },
          { picture: { [Op.like]: likeWord } },
          { phone: { [Op.like]: likeWord } },
          { email: { [Op.like]: likeWord } },
          { city: { [Op.like]: likeWord } },
          { role: { [Op.like]: likeWord } },
          { current_company: { [Op.like]: likeWord } },
          { linkedin_url: { [Op.like]: likeWord } },
          { facebook_url: { [Op.like]: likeWord } },
          { community_value: { [Op.like]: likeWord } },
          { additional_info: { [Op.like]: likeWord } },
          { skills: { [Op.like]: likeWord } },
          { admin_notes: { [Op.like]: likeWord } }
        ]
      }
    });

    return results;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
}

async function getMembersByListOfIdModel(memberIds) {
  try{
        return await CommunityMember.findAll({
          where: { member_id: memberIds },
      attributes: ['member_id', 'english_name', 'phone', 'email', 'city', 'role', 'years_of_experience']
    });
  }catch(error){
      return null;
  }
}

module.exports = {getMembersPageModel,
  getBiggestCityModel,
  getMemberIncludeWordModel,
  getMembersByListOfIdModel,
  getMembersSortPageModel,
  retunIdIfExistsByProfileModel,
  updateMemberByIdModel,
  addMemberModel,
  getMemberByIdModel,
  deleteMemberByIdModel,
  getCountOfMembersModel};
