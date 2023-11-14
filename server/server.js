// server.js
const express = require('express');
const app = express();
const port = 3001; // Choose your desired port
const cors = require('cors');
const bodyParser = require('body-parser');

// Use CORS middleware
app.use(cors());
// Use bodyParser middleware
app.use(bodyParser.json());

let webMessage = 'No Message received from Website'; // Declare outside the route handlers
let appMessage = 'No Message received from Mobile App'; // Declare outside the route handlers

app.get('/', (req, res) => {
  res.send('Server is connected!');
});

app.post('/api/sentToApp', (req, res) => {
  webMessage = req.body.message; // Update the shared variable

  console.log('Received message:', webMessage);

  res.status(200).json({ status: 'success', message: 'Message sent to Mobile' });
});

app.get('/api/getToApp', (req, res) => {
  res.send(webMessage);
});

app.post('/api/sentToWeb', (req, res) => {
  appMessage = req.body.message; // Update the shared variable

  console.log('Received message:', appMessage);

  res.status(200).json({ status: 'success', message: 'Message sent to Website' });
});

app.get('/api/getToWeb', (req, res) => {
  res.send(appMessage);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
