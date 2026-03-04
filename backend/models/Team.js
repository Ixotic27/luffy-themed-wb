const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    leader: { type: String, required: true },
    members: [{ type: String }],
    points: { type: Number, default: 0 }
});

module.exports = mongoose.model('Team', teamSchema);
