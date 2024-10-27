// importing packages
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

// setups
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// define Schema Class
import users from './routes/users.js'
import wasteManagement from './routes/wasteManagement.js'
import waterUsage from './routes/waterUsage.js'
// import carbonFootprint from './routes/carbonFootprint.js'

// Mount the router middleware at a specific path
app.use('/api', users);
app.use('/api', wasteManagement);
app.use('/api', waterUsage);
// app.use('/api', carbonFootprint);

// Connect to MongoDB
const URI = process.env.ATLAS_URI;
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start your Express server once connected to MongoDB
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

