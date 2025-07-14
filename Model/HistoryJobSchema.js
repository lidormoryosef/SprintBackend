const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const HistoryJob = sequelize.define('HistoryJob', {
  member_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  company_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  months_of_experience: DataTypes.INTEGER
}, {
  timestamps: false
});

module.exports = HistoryJob;
