const express = require('express')
const router = express.Router()
const Person= require('./../models/person')

//post route to add person

router.post('/' ,async (req,res)=>{
   
    try{
          const Data = req.body   //req body ccontain the person data
          const newPerson= new Person(Data)

          //save the new perosn data
       const response =   await newPerson.save()
       console.log('data saved')
       res.status(200).json(response)
    
         
     

    }catch(err){
        console.log('ERROR')
        res.status(500).json({ error:'internal error'})

    }


})

//get method to get the data
router.get('/', async (req,res)=>{
    try{
        const Data = await Person.find()
        console.log('data saved')
        res.status(200).json(Data)

    }catch(err){
        console.log('ERROR')
        res.status(500).json({ error:'internal error'})
    }
})

//parameterized api change

router.get("/:workType", async(req, res)=>{
    try{
        const workType = req.params.workType // extract the work type from the URL pramater
        if(workType== "chef" || workType== "waiter" ||workType== "manager" || workType== "chef"){
            const response = await Person.find({work: workType})
            console.log("responser fetched")
            res.status(200).json(response)
        }else{
            res.status(404).json({error: 'invalid work type'})
        }
    }
    catch(err){
        console.log('ERROR')
        res.status(500).json({ error:'internal error'})
    }
})
router.put('/:id', async (req,res)=>{
    try{
        const personID= req.params.id
        const updatedPersonData=req.body

        const response= await Person.findByIdAndUpdate(personID, updatedPersonData,{
            new:true, //return the updated value
            runValidators:true //run mongoose validation
        })
        if(!response){
            return res.status(404).json({error:'person not found'})
        }
        console.log("validation done")
        res.status(200).json(response)
    }
    
    catch(err){
        console.log('ERROR')
        res.status(500).json({ error:'internal error'})

    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const personID= req.params.id
        const response= await Person.findByIdAndDelete(personID)
    
    if(!response){
        return res.status(404).json({error:'person not found'})
    }}
    catch(err){
        console.log('ERROR')
        res.status(500).json({ error:'internal error'})
    }
})




module.exports=router