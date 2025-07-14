const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CommunityMember = sequelize.define('CommunityMember', {
  member_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  full_name: DataTypes.STRING,
  english_name: DataTypes.STRING,
  picture: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  city: DataTypes.STRING,
  role: DataTypes.STRING,
  current_company: DataTypes.STRING,
  years_of_experience: DataTypes.INTEGER,
  linkedin_url: DataTypes.STRING,
  facebook_url: DataTypes.STRING,
  community_value: DataTypes.STRING,
  additional_info: DataTypes.TEXT,
  skills: DataTypes.STRING,
  wants_updates: DataTypes.BOOLEAN,
  admin_notes: DataTypes.TEXT
});

module.exports = CommunityMember;
