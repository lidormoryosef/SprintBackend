const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('dbCommunity', 'root', 'lidor123', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});
module.exports = sequelize;
const { Company, Group, CommunityMember, Event, MemberEvent, HistoryJob } = require('../Model/Connections');

(async () => {
  try {
    await sequelize.sync({ alter: true });  // or force: true if you want to drop+recreate
    console.log('Database synced.');
    process.exit(0);
  } catch (err) {
    console.error('DB sync failed:', err);
    process.exit(1);
  }
})();

