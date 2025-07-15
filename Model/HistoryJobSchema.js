const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const HistoryJob = sequelize.define('HistoryJob', {
  id: {  
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'CommunityMembers',
      key: 'member_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  months_of_experience: DataTypes.INTEGER,
  company_name: DataTypes.STRING
}, {
  timestamps: false
});



module.exports = HistoryJob;
