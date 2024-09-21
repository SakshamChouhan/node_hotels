const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()) // req.body-stores
const PORT  = process.env.PORT || 3000

app.get('/',(req,res) =>{
  res.send('Welcome to Our Hotel');
})


// import router files 
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuItemRoutes');


// use the routers
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);




app.listen(PORT, function(){
  console.log('listening on port 3000');
})