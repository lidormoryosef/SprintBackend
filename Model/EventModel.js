const { Event } = require('./Connections');
const { MemberEvent } = require('./Connections');

async function getEventsByIdModel(id) {
    try{
        const events = await Event.findAll({
        include: [{
            model: MemberEvent,
             as: 'memberEvents', 
            where: { member_id: id },
            attributes: []
        }],
        attributes: ['description','subject','date']
        });
        console.log(events);
        return events;
    }catch(error){
        console.log(error);
        return null;
    }

}
async function saveEventModel(event) {
    try{
        return await MemberEvent.create(event);
    }catch(error){
        throw error;
    }

}

async function getDetailsEventModel(subjectEvent){
  try {
    const event = await Event.findOne({
      where: { subject: subjectEvent },
      attributes: ['event_id', 'date', 'description']
    });

    return event;
  } catch (error) {
    throw error;
  }
}
async function saveEventModel(event){
  try{
      return await Event.create(event);
  }catch(error){
    return null;  
  }
} 
async function saveGroupMemberModel(eventMember){
  try{
      return await MemberEvent.create(eventMember);
  }catch(error){
    throw error; 
  }
} 
module.exports = {getEventsByIdModel,saveEventModel,getDetailsEventModel,saveGroupMemberModel};