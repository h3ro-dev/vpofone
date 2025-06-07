import sequelize from '../config/database.js';
import User from './User.js';
import Organization from './Organization.js';
import Project from './Project.js';
import Task from './Task.js';

// Define associations
// User - Organization (Many-to-Many through UserOrganization)
User.belongsToMany(Organization, {
  through: 'UserOrganizations',
  foreignKey: 'userId',
  otherKey: 'organizationId',
  as: 'organizations'
});

Organization.belongsToMany(User, {
  through: 'UserOrganizations',
  foreignKey: 'organizationId',
  otherKey: 'userId',
  as: 'members'
});

// Organization - Project (One-to-Many)
Organization.hasMany(Project, {
  foreignKey: 'organizationId',
  as: 'projects'
});

Project.belongsTo(Organization, {
  foreignKey: 'organizationId',
  as: 'organization'
});

// User - Project (Owner relationship)
User.hasMany(Project, {
  foreignKey: 'ownerId',
  as: 'ownedProjects'
});

Project.belongsTo(User, {
  foreignKey: 'ownerId',
  as: 'owner'
});

// Project - Task (One-to-Many)
Project.hasMany(Task, {
  foreignKey: 'projectId',
  as: 'tasks'
});

Task.belongsTo(Project, {
  foreignKey: 'projectId',
  as: 'project'
});

// User - Task (Assignee relationship)
User.hasMany(Task, {
  foreignKey: 'assigneeId',
  as: 'assignedTasks'
});

Task.belongsTo(User, {
  foreignKey: 'assigneeId',
  as: 'assignee'
});

// User - Task (Creator relationship)
User.hasMany(Task, {
  foreignKey: 'createdById',
  as: 'createdTasks'
});

Task.belongsTo(User, {
  foreignKey: 'createdById',
  as: 'creator'
});

// Task - Task (Self-referencing for subtasks)
Task.hasMany(Task, {
  foreignKey: 'parentTaskId',
  as: 'subtasks'
});

Task.belongsTo(Task, {
  foreignKey: 'parentTaskId',
  as: 'parentTask'
});

// Project - User (Many-to-Many through ProjectMembers)
Project.belongsToMany(User, {
  through: 'ProjectMembers',
  foreignKey: 'projectId',
  otherKey: 'userId',
  as: 'members'
});

User.belongsToMany(Project, {
  through: 'ProjectMembers',
  foreignKey: 'userId',
  otherKey: 'projectId',
  as: 'projects'
});

export {
  sequelize,
  User,
  Organization,
  Project,
  Task
};

export default {
  sequelize,
  User,
  Organization,
  Project,
  Task
};