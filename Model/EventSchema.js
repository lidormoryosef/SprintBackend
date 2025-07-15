const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Event = sequelize.define('Event', {
  event_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: DataTypes.DATE,
  subject: DataTypes.STRING,
  description: DataTypes.TEXT
});

module.exports = Event;
