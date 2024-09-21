const mongoose = require('mongoose');

// Defining mongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

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