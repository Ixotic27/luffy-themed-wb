const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/leaderboard').then(() => {
    console.log('Connected to local MongoDB');
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}).catch(err => console.error('MongoDB connection error:', err));
