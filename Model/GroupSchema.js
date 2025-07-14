const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Group = sequelize.define('Group', {
  group_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  group_name: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  other_details: { type: DataTypes.TEXT }
});

module.exports = Group;
