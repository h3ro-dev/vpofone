import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  projectId: {
    type: DataTypes.UUID,
    references: {
      model: 'Projects',
      key: 'id'
    }
  },
  assigneeId: {
    type: DataTypes.UUID,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  createdById: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  parentTaskId: {
    type: DataTypes.UUID,
    references: {
      model: 'Tasks',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('todo', 'in-progress', 'review', 'done', 'blocked'),
    defaultValue: 'todo'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium'
  },
  type: {
    type: DataTypes.ENUM('task', 'bug', 'feature', 'improvement', 'research'),
    defaultValue: 'task'
  },
  dueDate: {
    type: DataTypes.DATE
  },
  startDate: {
    type: DataTypes.DATE
  },
  completedAt: {
    type: DataTypes.DATE
  },
  estimatedHours: {
    type: DataTypes.DECIMAL(5, 2)
  },
  actualHours: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  attachments: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  checklist: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  dependencies: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    defaultValue: []
  },
  isRecurring: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  recurringPattern: {
    type: DataTypes.JSONB
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      fields: ['projectId']
    },
    {
      fields: ['assigneeId']
    },
    {
      fields: ['status']
    },
    {
      fields: ['priority']
    },
    {
      fields: ['dueDate']
    }
  ]
});

export default Task;