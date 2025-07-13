const db = require('./db');

// Create a new community member
async function createMember(member) {
  try {
    const [result] = await db.execute(
      `INSERT INTO Community_members (full_name, email, city, company_id, \`group\`)
       VALUES (?, ?, ?, ?, ?)`,
      [member.full_name, member.email, member.city, member.company_id, member.group]
    );
    return result.insertId;
  } catch (err) {
    throw new Error('Error creating member: ' + err.message);
  }
}

// Retrieve up to 50 community members
async function getFiftyMembers() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        cm.member_id,
        cm.full_name,
        c.company_name,
        g.group_name
      FROM Community_members cm
      LEFT JOIN Companies c ON cm.company_id = c.company_id
      LEFT JOIN Groups g ON cm.group = g.group_id
      LIMIT 50
    `);
    return rows;
  } catch (err) {
    throw new Error('Error retrieving 50 members: ' + err.message);
  }
}

// Retrieve a single member by ID
async function getMemberById(member_id) {
  try {
    const [rows] = await db.execute(`
      SELECT * FROM Community_members WHERE member_id = ?
    `, [member_id]);
    return rows[0];
  } catch (err) {
    throw new Error('Error retrieving member by ID: ' + err.message);
  }
}

// Retrieve all members including company and group names
async function getAllMembers() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        cm.member_id,
        cm.full_name,
        c.company_name,
        g.group_name
      FROM Community_members cm
      LEFT JOIN Companies c ON cm.company_id = c.company_id
      LEFT JOIN Groups g ON cm.group = g.group_id
    `);
    return rows;
  } catch (err) {
    throw new Error('Error retrieving all members: ' + err.message);
  }
}

// Update a community member by ID
async function updateMember(member_id, member) {
  try {
    const [result] = await db.execute(
      `UPDATE Community_members SET full_name = ?, email = ?, city = ?, company_id = ?, \`group\` = ?
       WHERE member_id = ?`,
      [member.full_name, member.email, member.city, member.company_id, member.group, member_id]
    );
    return result.affectedRows;
  } catch (err) {
    throw new Error('Error updating member: ' + err.message);
  }
}

// Delete a community member by ID
async function deleteMember(member_id) {
  try {
    await db.execute(`DELETE FROM Community_members WHERE member_id = ?`, [member_id]);
  } catch (err) {
    throw new Error('Error deleting member: ' + err.message);
  }
}

// Add work experience for a member
async function addExperience(member_id, company_id, months) {
  try {
    await db.execute(
      `INSERT INTO Experience_of_member (member_id, company_id, months_of_experience)
       VALUES (?, ?, ?)`,
      [member_id, company_id, months]
    );
  } catch (err) {
    throw new Error('Error adding experience: ' + err.message);
  }
}

// Retrieve work experience for a specific member
async function getExperience(member_id) {
  try {
    const [rows] = await db.execute(`
      SELECT 
        c.company_name,
        eom.months_of_experience
      FROM Experience_of_member eom
      JOIN Companies c ON eom.company_id = c.company_id
      WHERE eom.member_id = ?
    `, [member_id]);
    return rows;
  } catch (err) {
    throw new Error('Error retrieving experience: ' + err.message);
  }
}

// Retrieve all events a member participated in
async function getMemberEvents(member_id) {
  try {
    const [rows] = await db.execute(`
      SELECT e.event_id, e.subject, e.date
      FROM Members_events me
      JOIN Events e ON me.event_id = e.event_id
      WHERE me.member_id = ?
    `, [member_id]);
    return rows;
  } catch (err) {
    throw new Error('Error retrieving member events: ' + err.message);
  }
}

module.exports = {
  createMember,
  getFiftyMembers,
  getMemberById,
  getAllMembers,
  updateMember,
  deleteMember,
  addExperience,
  getExperience,
  getMemberEvents
};
