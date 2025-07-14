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

module.exports = {getEventsByIdModel};