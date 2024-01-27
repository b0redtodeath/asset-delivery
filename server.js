// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  // Check if the referrer includes "roblox.com"
  if (req.get('Referer') && req.get('Referer').includes('roblox.com')) {
    // It's a request from Roblox, respond with the module ID
    const moduleId = '15718742387'; // Replace this with your actual module ID
    res.send(moduleId);
  } else {
    // It's not a request from Roblox, redirect to "https://assetdelivery.roblox.com"
    res.redirect('https://assetdelivery.roblox.com');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
