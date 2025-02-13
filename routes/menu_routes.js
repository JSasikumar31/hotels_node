const express= require('express')
const router = express.Router()
const MenuItem= require("./../models/MenuItem")


//menu post itms
router.post('/' ,async (req,res)=>{
   
    try{
          const Data = req.body   //req body ccontain the person data
          const newItem= new MenuItem(Data)

          //save the new perosn data
       const response =   await newItem.save()
       console.log('data saved')
       res.status(200).json(response)
    
         
     

    }catch(err){
        console.log('ERROR')
        res.status(500).json({ error:'internal error'})

    }


})
//menu items
router.get('/', async (req,res)=>{
    try{
        const Data = await MenuItem.find()
        console.log('data saved')
        res.status(200).json(Data)

    }catch(err){
        console.log('ERROR')
        res.status(500).json({ error:'internal error'})
    }
})//parameterized api change

router.get("/:tasteType", async(req, res)=>{
    try{
        const tasteType = req.params.tasteType // extract the work type from the URL pramater
        if(tasteType== "sweet" || tasteType== "sour" ||tasteType== "spicy" ){
            const response = await MenuItem.find({taste: tasteType})
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
//put and patch
router.put('/:id', async(req, res)=>{
    try{
        const menuID=req.params.id
        const updateMenuData=req.body

        const response= await MenuItem.findByIdAndUpdate(menuID, updateMenuData,{
        new: true,
        runValidators:true
        })
        if(!response){
            return res.status(404).json({error: "item not found"})
        }
        console.log("validation done")
        res.status(200).json(response)
    
    }
    catch(err){
        console.log("error")
        res.status(500).json({error:"internal error"})
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const menuID= req.params.id
        const response= await Person.findByIdAndDelete(menuID)
    
    if(!response){
        return res.status(404).json({error:'item not found'})
    }}
    catch(err){
        console.log('ERROR')
        res.status(500).json({ error:'internal error'})
    }
})



module.exports=router