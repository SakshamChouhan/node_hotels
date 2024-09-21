const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json()) // req.body-stores

app.get('/',(req,res) =>{
  res.send('Welcome to Our Hotel');
})


// import router files 
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuItemRoutes');


// use the routers
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);


app.listen(3000, function(){
  console.log('listening on port 3000');
})