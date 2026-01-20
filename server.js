const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const workflowRoutes = require('./routes/workflowRoutes');
const gtmRoutes = require('./routes/gtmRoutes');
// const promptRoutes = require('./routes/promptRoutes');
const tipRoutes = require('./routes/tipRoutes');
// ✅ Import Tool Routes
// const toolRoutes = require('./routes/toolRoutes');
// ✅ Automation
const cron = require('node-cron');
const { runEngine } = require('./scripts/run-gtm-engine');

// 🕒 Schedule GTM Engine to run every day at midnight (00:00)
cron.schedule('0 0 * * *', () => {
  console.log('⏰ CRON JOB STARTED: Running GTM Engine...');
  runEngine(false); // false = logic only, no process.exit()
});

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Outmate API is running...');
});

app.use('/api/gtm-tweets', gtmRoutes);
app.use('/api/workflows', workflowRoutes);
// app.use('/api/prompts', promptRoutes);
app.use('/api/tips', tipRoutes);
// ✅ Register Tool Routes
// app.use('/api/tools', toolRoutes);

app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});