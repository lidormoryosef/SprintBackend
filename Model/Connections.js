const sequelize = require('../config/db');

const CommunityMember = require('./CommunityMemberSchema');
const Company = require('./CompanySchema');
const Event = require('./EventSchema');
const Group = require('./GroupSchema');
const GroupMembers = require('./GroupsMembersSchema');
const HistoryJob = require('./HistoryJobSchema');
const MemberEvent = require('./MemberEventSchema');



CommunityMember.belongsToMany(Group, {
  through: GroupMembers,
  foreignKey: 'member_id',
  otherKey: 'group_id',
  as: 'groups'
});
Group.belongsToMany(CommunityMember, {
  through: GroupMembers,
  foreignKey: 'group_id',
  otherKey: 'member_id',
  as: 'members'
});

CommunityMember.belongsToMany(Event, {
  through: MemberEvent,
  foreignKey: 'member_id',
  otherKey: 'event_id',
  as: 'events'
});
Event.belongsToMany(CommunityMember, {
  through: MemberEvent,
  foreignKey: 'event_id',
  otherKey: 'member_id',
  as: 'attendees'
});
CommunityMember.belongsToMany(Company, {
  through: HistoryJob,
  foreignKey: 'member_id',
  otherKey: 'company_id',
  as: 'historyJobs'
});

Company.belongsToMany(CommunityMember, {
  through: HistoryJob,
  foreignKey: 'company_id',
  otherKey: 'member_id',
  as: 'employees'
});
module.exports = {
  sequelize,
  Company,
  Group,
  CommunityMember,
  Event,
  MemberEvent,
  HistoryJob
};
