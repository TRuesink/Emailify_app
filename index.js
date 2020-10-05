const express = require('express');
const app = express();

//route handler
app.get('/', (req, res) => {
  res.send('hi there');
});

// logic for PORT choice
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server running on port 5000');
});