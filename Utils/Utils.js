const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

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
function convertXlToJson(fileName) {
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

module.exports = {convertXlToJson,saveBase64ToFile,splitToJson};
