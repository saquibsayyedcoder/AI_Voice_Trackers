import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './src/config/db.js';
import taskRoutes from './src/routes/taskRoutes.js';
import voiceRoutes from './src/routes/voiceRoutes.js';
import errorHandler from './src/middleware/errorHandler.js';

// Get current directory (ES6 modules fix)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from root of backend directory
dotenv.config({ path: path.join(__dirname, '.env') });

// Log environment variables (hide API key)
console.log('\n=== Server Configuration ===');
console.log('Environment:');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('- PORT:', process.env.PORT || 5000);
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? '✓ Set' : '✗ Missing');
console.log('- OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✓ Set (length: ' + process.env.OPENAI_API_KEY.length + ')' : '✗ Missing');
console.log('- FRONTEND_URL:', process.env.FRONTEND_URL || 'http://localhost:3000 (default)');
console.log('===========================\n');

// Connect to database
await connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/voice', voiceRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    openai: process.env.OPENAI_API_KEY ? 'available' : 'mock',
    database: 'connected'
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📝 API available at http://localhost:${PORT}/api`);
});