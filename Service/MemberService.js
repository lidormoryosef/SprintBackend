const memberModel = require('../Model/MemberModel');
const companyModel = require('../Model/CompanyModel');
const u = require('../Utils/Utils');
const groupModel = require('../Model/GroupModel');
const eventModel = require('../Model/EventModel');
const utils = u;
const model = memberModel;
const cModel = companyModel;
const gModel = groupModel;
const eModel = eventModel;

async function getMembersPageService(page){
    return await model.getMembersPageModel(page);
}
async function getMembersSortPageService(page,field){
    return await model.getMembersSortPageModel(page,field);
}
async function getMembersByGroupIdPageService(page,groupId){
    let members =  await gModel.getMembersIdByGroupIdModel(page,groupId);
    if(members === null){
      return null;
    }
    const memberIds = members.map(gm => gm.member_id);
    return model.getMembersByListOfIdModel(memberIds);
    
}
async function addOrUpdateMemberService(member){
    let id = await model.retunIdIfExistsByProfileModel(member.linkedin_url);
    if(id === null){
        return await model.addMemberModel(member);
    }
    if(id === "Error in Db"){
        return null;
    }
    return await model.updateMemberByIdModel(id,member);
}
async function getMemberByIdService(id){
    return await model.getMemberByIdModel(id);
}
async function deleteMemberByIdService(id){
    return await model.deleteMemberByIdModel(id);
}
async function getCountOfMembersService(){
    return await model.getCountOfMembersModel();
}
async function saveDetailsFromLinkedInService(link){
    let memberId = await model.retunIdIfExistsByProfileModel(link);
    if(memberId === null){
      let person = await utils.extractFromLinkedIn([link]);
      if(person == null){
        return null;
      }
      let member = utils.convertToCommunitySchema(person);
      let result = await model.addMemberModel(member);
      memberId = result.member_id;
      experiences = utils.convertToJobsHistorySchema(person,memberId);
      if(experiences.length > 0){
        cModel.saveHistoryJobsModel(experiences,memberId);
      }
    }
    console.log(memberId);
    return memberId;
}
async function saveDetailsFromArrayLinkedInService(links){
  for(let link of links){
    saveDetailsFromLinkedInService(link);
  }
}
async function saveMembersFromExcelLinkedinService(base64){
  let filePath = utils.saveBase64ToFile(base64);
  let object = utils.convertExcelToJson(filePath);
  const links = object.map(item => Object.values(item)[0]);
  saveDetailsFromArrayLinkedInService(links);
}
async function saveMembersFromExcelService(base64File) {
  const filename = utils.saveBase64ToFile(base64File);
  const fullMembers = utils.convertExcelToJson(filename);
  const { cleanUsers: members, jobs_history, events, groups } = utils.splitToJson(fullMembers);
  for (let i = 0; i < members.length; i++) {
    const m = await model.addMemberModel(members[i]);
    for (const company_name of jobs_history[i] || []) {
      await cModel.saveHistoryJobModel({ company_name, member_id: m.member_id });
    }
    for (const eventName of events[i] || []) {
      let event = await eModel.getDetailsEventModel(eventName);
      if (!event) {
        event = await eModel.saveEventModel({ subject: eventName });
      }
      await eModel.saveGroupMemberModel({ event_id: event.event_id, member_id: m.member_id });
    }
    for (const groupName of groups[i] || []) {
      let group = await gModel.getDetailsGroupModel(groupName);
      if (!group) {
        group = await gModel.saveGroupModel({ group_name: groupName });
      }
      await gModel.saveGroupMemberModel({ group_id: group.group_id, member_id: m.member_id });
    }
  }
  return "Success";
}

module.exports ={getMembersPageService,getMembersSortPageService,saveDetailsFromLinkedInService,saveMembersFromExcelLinkedinService,
    getMembersByGroupIdPageService,
    getMemberByIdService,
    deleteMemberByIdService,
    getCountOfMembersService,
    addOrUpdateMemberService,
    saveMembersFromExcelService,saveDetailsFromArrayLinkedInService};