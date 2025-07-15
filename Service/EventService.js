const eventModel = require('../Model/EventModel');
const model = eventModel;

async function getEventsByIdService(id){
    return await model.getEventsByIdModel(id);
}

module.exports ={getEventsByIdService};