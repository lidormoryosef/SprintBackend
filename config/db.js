const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('dbCommunity6', 'root', 'lidor123', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});
module.exports = sequelize;

// const { Group, CommunityMember, Event, MemberEvent, HistoryJob } = require('../Model/Connections');
// (async () => {
//   try {
//     await sequelize.sync({ alter: true });
//     console.log('Database synced.');
//     process.exit(0);
//   } catch (err) {
//     console.error('DB sync failed:', err);
//     process.exit(1);
//   }
// })();

