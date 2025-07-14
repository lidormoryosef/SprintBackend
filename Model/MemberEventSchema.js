const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MemberEvent = sequelize.define('MemberEvent', {
  member_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  event_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  timestamps: false
});

module.exports = MemberEvent;
