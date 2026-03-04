const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    visibility: { type: Boolean, default: true }
});

module.exports = mongoose.model('Settings', settingsSchema);
