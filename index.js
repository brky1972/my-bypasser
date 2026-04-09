const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send(`
        <body style="background:#121212;color:#00ff00;font-family:monospace;text-align:center;padding-top:100px;">
            <h1>Bypass API</h1>
            <p style="color:white;">Status: Online</p>
            <div style="border:1px solid #333;display:inline-block;padding:20px;">
                <code>Endpoint: /api/bypass?url=[LINK]</code>
            </div>
        </body>
    `);
});

app.get('/api/bypass', async (req, res) => {
    const target = req.query.url;
    if (!target) return res.status(400).send("Missing URL parameter");

    const engines = [
        `https://api.bypass.vip/bypass?url=${encodeURIComponent(target)}`,
        `https://api.bypass.city/bypass?url=${encodeURIComponent(target)}`
    ];

    for (let url of engines) {
        try {
            console.log("Trying:", url);
            const response = await axios.get(url, { timeout: 8000 });
            
            if (response.data && response.data.destination) {
                console.log("Success!");
                return res.redirect(response.data.destination);
            }
        } catch (err) {
            console.error("Engine failed.");
        }
    }

    res.status(500).send("<h1>All bypass engines failed.</h1><p>Linkvertise may have updated their security.</p>");
});

module.exports = app;

