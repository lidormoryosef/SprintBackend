const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GroupMembers = sequelize.define('GroupMembers', {
  member_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  group_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  timestamps: false
});

module.exports = GroupMembers;
