const express = require('express');
const router = express.Router();
const Person = require('../models/person');

// Post route to add a person in db
router.post('/', async (req,res) => {

    try {
      const data = req.body // assuming that req.body contains person data
    
      // Creating a new Model from Person Model Mongoose
      const newPerson = new Person(data);
  
      const response = await newPerson.save();
      console.log('Data  Saved');
      res.status(200).json(response);
  
      
    } catch (err) {
      console.log(err);
      res.status(500).json({error : 'internal server Error'})
    }
  
})

// Get method to get the person to fetch data from db
router.get('/', async (req,res) => {

    try {
      const data = await Person.find();
      console.log('Data  is Fetched');
      res.status(200).json(data);
  
      
    } catch (err) {
      console.log(err);
      res.status(500).json({error : 'internal server Error'})
      
    }
})

// getting particular worktype in url parameter
router.get('/:workType',  async(req,res) => {
    try {
      const workType = req.params.workType; // Extract the worktype from url parameter
  
      if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
        const response = await Person.find({work : workType});
        console.log('response Fetched');
        res.status(200).json(response);
      }
      else{
        res.status(404).json({error : 'Invalid work Type'});
      }
  
      
    } catch (err) {
  
      console.log(err);
      res.status(500).json({error :' internal server error '});
      
    }
})

// to Update anything using (put) method
router.put('/:id', async(req, res) =>{
    try {
        const personId = req.params.id; // extract id from url parameter
        const UpdatedPersonData = req.body; //updated data from the person

        const response = await Person.findByIdAndUpdate(personId, UpdatedPersonData, {
            new: true,
            runValidators : true,
        })

        if(!response){
            return res.status(404).json({error : 'Person not found'});
        }

        console.log('Data Updated');
        res.status(200).json(response);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({error : 'internal server error'});
        
    }
})

// to delete anything using (delete) Method
router.delete('/:id', async(req,res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error : 'Person not found'});
        }

        console.log('Data Deleted');
        res.status(200).json({ message : 'Person Deleted Successfully'});
    } catch (error) {
        console.log(err);
        res.status(500).json({error : 'internal server error'});
    }
})


module.exports = router;