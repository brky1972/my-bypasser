const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send(`
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h1>Bypass API</h1>
            <p>Status: <span style="color: green;">Online</span></p>
            <p>Usage: <code>/api/bypass?url=YOUR_LINK</code></p>
        </body>
    `);
});

app.get('/api/bypass', async (req, res) => {
    const target = req.query.url;
    if (!target) return res.status(400).send("No URL provided");
    try {
        const response = await axios.get(`https://api.bypass.city/bypass?url=${encodeURIComponent(target)}`);
        if (response.data && response.data.destination) {
            res.redirect(response.data.destination);
        } else {
            res.status(500).send("Bypass failed.");
        }
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

module.exports = app;

