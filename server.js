const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`assetdelivery server is running on port ${PORT}`);
});
