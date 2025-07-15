const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const { ApifyClient } = require('apify-client');
const {token} = require('../config/tokenToApify'); 
const client = new ApifyClient({
    token: token,
});
function saveBase64ToFile(base64Data, fileName = "createMembers.ods") {
  try{
      const buffer = Buffer.from(base64Data.base64, "base64");
      const filePath = path.join(__dirname, fileName);
      fs.writeFileSync(filePath, buffer);
    return filePath;
  }catch(error){
    fs.unlinkSync(fileName);
    throw error;
  }

}
function convertExcelToJson(fileName) {
  try {
    const workbook = XLSX.readFile(fileName);
    const sheetName = workbook.SheetNames[0]; 
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    fs.unlinkSync(fileName);
    return jsonData;
  } catch (error) {
    fs.unlinkSync(fileName);
    console.error(error.message);
    throw error;
  }
}
function splitToJson(members) {
  try{
    const jobs_history = members.map(user =>
        user.jobs_histroy ? user.jobs_histroy.split(",").map(s => s.trim()) : []
    );

    const groups = members.map(user =>
        user.groups ? user.groups.split(",").map(s => s.trim()) : []
    );

    const events = members.map(user =>
        user.events ? user.events.split(",").map(s => s.trim()) : []
    );

    const cleanUsers = members.map(({ jobs_histroy, groups, events, ...rest }) => rest);

    return { cleanUsers, jobs_history, groups, events };
  }catch(error){
    throw error;
  }
}
async function extractFromLinkedIn(profileslink){
  try{
    const input = {
        "profileUrls": profileslink
    };
    const run = await client.actor("2SyF0bVxmgGr8IVCZ").call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    return items ? items[0] : null;
  }catch(error){
    return null;
  }

}
function convertToCommunitySchema(person){
  return {
    full_name: person.fullName,
    english_name: person.fullName,
    phone: person.mobileNumber,
    email: person.email,
    picture: person.profilePicHighQuality || person.profilePic || null,
    city: person.addressWithoutCountry,
    role: person.jobTitle,
    current_company: person.companyName,
    years_of_experience: person.currentJobDurationInYrs || 0,
    linkedin_url: person.linkedinUrl,
    facebook_url: null, 
    community_value: null, 
    additional_info: person.headline,
    skills: person.skills.map(s => s.title).join(', '),
    wants_updates: true,
    admin_notes: null
  };
}
function parseExperienceCaptionToMonths(caption) {
  if (!caption || typeof caption !== 'string') return 0;
  const yrMatch = caption.match(/(\d+)\s*yr/);
  const moMatch = caption.match(/(\d+)\s*mo/);
  const years = yrMatch ? parseInt(yrMatch[1], 10) : 0;
  const months = moMatch ? parseInt(moMatch[1], 10) : 0;

  return (years * 12) + months;
}
function convertToJobsHistorySchema(linkedinData, member_id) {
  console.log(member_id);
  if (!Array.isArray(linkedinData.experiences)) return [];

  return linkedinData.experiences.map(exp => ({
    member_id,
    company_name: exp.title?.trim() || "Unknown",
    months_of_experience: parseExperienceCaptionToMonths(exp.caption)
  }));
}
module.exports = {convertExcelToJson,saveBase64ToFile,splitToJson,extractFromLinkedIn,convertToCommunitySchema,convertToJobsHistorySchema};
