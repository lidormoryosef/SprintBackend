const eventService = require('../Service/EventService');
const service = eventService;

async function getEventsByIdController(request,response){
    const events = await service.getEventsByIdService(request.params.id);
    if(events === null ){
        response.status(500).send();
    }else{
        response.status(200).send(events);
    }
}

module.exports = {getEventsByIdController};