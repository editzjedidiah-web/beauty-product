import app from './app';
import { db, setupAssociations } from './models';
import dontenv from 'dontenv';

dontenv.config();

const PORT = process.env.PORT || 5000;

// Initialize Database and Start Server 
const startServer = async () => {
  try {
    //1. Setup Relationships
    setupAssociations();

    //2. Sync Database (SQLite file-based persistence)
    await db.sync({ force: false });
    console.log('✅ SQLite Database connected and synced.');

    //3. Listen
    app.listen(PORT, () => {
      console.log('🚀 Server Engine running at http://localhost:${PORT}');
    }); 
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1); 
  } 
};

startServer();
