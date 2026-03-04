const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const csvParser = require('csv-parser');
const fastCsv = require('fast-csv');

const Team = require('../models/Team');
const Settings = require('../models/Settings');

// Setup Multer for CSV uploads
const upload = multer({ dest: 'uploads/' });

// GET all teams mapped for Leaderboard UI (sorted by points)
router.get('/leaderboard', async (req, res) => {
    try {
        const teams = await Team.find().sort({ points: -1 });
        res.json(teams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update team points
router.put('/teams/:id', async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, { points: req.body.points }, { new: true });
        res.json(team);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET visibility setting
router.get('/settings/visibility', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({ visibility: true });
        }
        res.json({ visibility: settings.visibility });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST update visibility setting
router.post('/settings/visibility', async (req, res) => {
    try {
        const { visibility } = req.body;
        let settings = await Settings.findOne();
        if (settings) {
            settings.visibility = visibility;
            await settings.save();
        } else {
            settings = await Settings.create({ visibility });
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST parse CSV and overwrite DB
router.post('/csv/upload', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on('data', (data) => {
            // Expected format: Team Name, Leader Name, Participant Names
            if (data['Team Name'] && data['Leader Name']) {
                results.push({
                    name: data['Team Name'],
                    leader: data['Leader Name'],
                    members: data['Participant Names'] ? data['Participant Names'].split(',').map(n => n.trim()) : [],
                    points: 0 // New teams default to 0
                });
            }
        })
        .on('end', async () => {
            try {
                for (const row of results) {
                    const existingTeam = await Team.findOne({ name: row.name });
                    if (!existingTeam) {
                        await Team.create(row);
                    } else {
                        existingTeam.leader = row.leader;
                        existingTeam.members = row.members;
                        await existingTeam.save();
                    }
                }

                fs.unlinkSync(req.file.path); // Clean up temp file
                res.json({ message: 'CSV Import successful!' });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
});

// GET export CSV
router.get('/csv/export', async (req, res) => {
    try {
        const teams = await Team.find();

        // Convert to CSV row objects
        const data = teams.map(t => ({
            'Team Name': t.name,
            'Leader Name': t.leader,
            'Participant Names': t.members.join(','),
            'Points': t.points
        }));

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="leaderboard_export.csv"');

        fastCsv.write(data, { headers: true }).pipe(res);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
