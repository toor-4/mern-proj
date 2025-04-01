const express = require('express');
const path = require('path');
const connectDB = require('./config/db.js');
require('dotenv').config();

const cors = require('cors');

const workoutRoute = require('./routes/workoutRoutes.js');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors()); // allows us to make requests from backend to frontend

app.use(express.json()); // allows us to parse json in the body of a request
app.use(express.urlencoded({ extended: false })); // allows us to parse url encoded data

// setting up a route handler
app.use('/api/workouts', workoutRoute); // use workoutRoutes for any route that starts with /api/workouts

if (process.env.NODE_ENV === 'production') {
  // Serve frontend files
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
  });
}

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port: ${port}`);
});
