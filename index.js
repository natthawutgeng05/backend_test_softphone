const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Import the cors package
const recentCallsRouter = require('./routes/recentCalls');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());  // Enable CORS for all routes
// app.use(cors({
//     origin: 'http://localhost:3000',
// }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/recentCalls', recentCallsRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
