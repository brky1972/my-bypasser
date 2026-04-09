const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// The main bypass route
app.get('/api/bypass', async (req, res) => {
    const target = req.query.url;
    if (!target) return res.status(400).send("No URL provided");

    try {
        // We use a professional solver API as the engine
        const response = await axios.get(`https://api.bypass.city/bypass?url=${encodeURIComponent(target)}`);
        
        if (response.data && response.data.destination) {
            // This sends you straight to the final link
            res.redirect(response.data.destination);
        } else {
            res.status(500).send("Bypass failed - link not found.");
        }
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

module.exports = app;

