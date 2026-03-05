require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5001;

// CORS — allow requests from configured origins (supports comma-separated list)
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map(o => o.trim());

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}).catch(err => console.error('MongoDB connection error:', err));
