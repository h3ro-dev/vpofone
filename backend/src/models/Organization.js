import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Organization = sequelize.define('Organization', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT
  },
  logo: {
    type: DataTypes.STRING
  },
  website: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  },
  industry: {
    type: DataTypes.STRING
  },
  size: {
    type: DataTypes.ENUM('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'),
  },
  founded: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1800,
      max: new Date().getFullYear()
    }
  },
  settings: {
    type: DataTypes.JSONB,
    defaultValue: {
      features: {
        projects: true,
        tasks: true,
        goals: true,
        documents: true,
        analytics: true
      },
      permissions: {
        inviteMembers: ['admin', 'executive'],
        createProjects: ['admin', 'executive', 'manager'],
        viewAnalytics: ['admin', 'executive']
      }
    }
  },
  subscription: {
    type: DataTypes.JSONB,
    defaultValue: {
      plan: 'free',
      status: 'active',
      trialEndsAt: null,
      features: []
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
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
      fields: ['slug']
    }
  ]
});

export default Organization;