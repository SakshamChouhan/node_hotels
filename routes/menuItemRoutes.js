const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');


// Post route to add menu in db
router.post('/', async(req,res) =>{
    try {
  
      const data = req.body;
      const newMenuItem = new MenuItem(data);
      const response = await newMenuItem.save();
      console.log('Data is Saved');
      res.status(200).json(response);
  
    } catch (err) {
      console.log(err);
      res.status(400).json({error: 'Internal server Error'});
    }
})
  
  
// Get method to fetch data from db
router.get('/', async(req,res) => {
    try {
      const data = await MenuItem.find();
      console.log('Data is fetched');
      res.status(200).json(data);
  
    } catch (err) {
      console.log(err);
      res.status(500).json({error : 'internal server Error'})
    }
  
})

// to get the particular url of taste in link
router.get('/:tasteType', async(req,res) =>{
  try {
    const tasteType = req.params.tasteType;

    if(tasteType == 'spicy' || tasteType == 'sour' || tasteType == 'sweet'){
      const response  = await MenuItem.find({taste : tasteType});
      console.log('Response is fetched');
      res.status(200).json(response);

    }
    else{
      res.status(404).json({error : 'invalid taste type '});
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error : 'internal server error '});
    
  }
})

// to update data using (put) Method
router.put('/:id', async(req,res) => {
  try {
    const MenuId = req.params.id; // extract id from url paramter
    const UpdatedMenuData = req.body; // updated data from menu

    const response = await MenuItem.findByIdAndUpdate(MenuId, UpdatedMenuData ,{
      new : true,
      runValidators : true,
    })

    if(!response){
      return res.status(404).json({error : 'Menu item not found'});
    }

    console.log('Data is updated');
    res.status(200).json(response);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error : 'internal server error '});
  }
})

// to Delete data using (delete) Method
router.delete('/:id', async(req,res) => {
  try {
    const MenuId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(MenuId);

    if(!response){
      return res.status(400).json({error : 'Menu item not found'});
    }

    console.log('Data Deleted');
    res.status(200).json({message : 'Menu Item Deleted Successfully'});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error : 'internal server error '});
  }

})


module.exports = router;