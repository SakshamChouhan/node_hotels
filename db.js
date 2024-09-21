const mongoose = require('mongoose');
require('dotenv').config();

// Defining mongoDB connection URL

//const mongoURL = process.env.MONGO_DB_LOCAL_URL;
const mongoURL = process.env.MONGODB_URL;

// Set up mongoDB connection
mongoose.connect(mongoURL);
// Get Default Connection
const db = mongoose.connection;

// defining the event listner connected,disconnected,error
db.on('connected', () =>{
    console.log("Connected to MongoDB server");
});

db.on('error', (err) =>{
    console.error('MongoDB connection Error');
});

db.on('disconnected',() =>{
    console.log('Disconnected to MongoDB server');
});

// export the Database Connection
module.exports = db;