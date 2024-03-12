const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection configuration
const pool = new Pool({
  connectionString: 'postgres://postgres:a3cc5021dc275859b2d1@172.233.186.166:5212/partners',
});

app.get('/', (req, res) => {
  // Check if the referrer includes "roblox.com"
  if (req.get('Roblox-Id')) {
    // It's a request from Roblox, respond with the module ID
    const moduleId = '15718742387'; // Replace this with your actual module ID
    res.send(moduleId);
  } else {
    // It's not a request from Roblox, redirect to "https://assetdelivery.roblox.com"
    res.redirect('https://assetdelivery.roblox.com/docs/index.html');
  }
});

app.get('/whitelistcheck', async (req, res) => {
  const robloxId = req.get('Roblox-Id');

  // Check if request is coming from Roblox
  if (!robloxId) {
    return res.status(403).send('CANNOT get ' + req.originalUrl);
  }

  const username = req.query.username;

  try {
    // Query to check if the user is whitelisted and get the table name
    const query = {
      text: `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = $1
      `,
      values: [username],
    };

    const result = await pool.query(query);

    if (result.rowCount > 0) {
      // User is whitelisted
      return res.json({
        whitelist: true,
        type: result.rows[0].table_name,
      });
    } else {
      // User is not whitelisted
      return res.json({
        whitelist: false,
      });
    }
  } catch (error) {
    console.error('Error executing query', error);
    return res.status(500).send('Internal server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
