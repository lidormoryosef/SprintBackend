const { HistoryJob } = require('./Connections');

async function getHistoryJobByIdModel(id) {
    try{
        const jobs = await HistoryJob.findAll({
        where: { member_id: id },
        attributes: ['months_of_experience', 'company_name']
        });
        return jobs;
    }catch(error){
        return null;
    }

}

module.exports = {getHistoryJobByIdModel};