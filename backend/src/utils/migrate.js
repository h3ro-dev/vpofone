import sequelize from '../config/database.js';
import '../models/index.js'; // Import all models to register them
import logger from './logger.js';

const migrate = async () => {
  try {
    logger.info('Starting database migration...');

    // Test connection
    await sequelize.authenticate();
    logger.info('Database connection established');

    // Sync all models
    await sequelize.sync({ force: false, alter: true });
    logger.info('Database migration completed successfully');

    process.exit(0);
  } catch (error) {
    logger.error('Migration failed:', error);
    process.exit(1);
  }
};

migrate();