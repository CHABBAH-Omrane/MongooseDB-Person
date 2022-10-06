const express = require("express")
const { model } = require("mongoose")

const router = express.Router()

const person = require('../models/personSchema')


//Create and Save a Record of a Model
router.post("/newPerson", (req, res )=>{
    let newPerson = new person (req.body)
    newPerson.save((err,data)=>{
        if (err) throw err
        else res.send(data)
       // else res.send({"person added"})
    })
})

//Create Many Records with model.create()
router.post("/newPersons",(req,res)=>{    
    person.create({ name: "Omrane" , age: 16,favoriteFoods:["Potato Chips","Ice Cream"]},{name:"bassem",age:28,favoriteFoods:["Potato Chips","Ice Cream"]},{name:"Marwa",age:25,favoriteFoods:["Ice Cream"]},{name:"Rami",age:32,favoriteFoods:["Potato Chips"]},
    (err, person) => {
        if (err) return console.log(err);
        res.send("New Persons are added Successfully ")
      })
})

// find() to Search Your Database or findById()
router.get("/getPerson/:id",(req,res)=>{
    person.find({_id:req.params.id},
        (err,data)=>{
            if (err) throw  err
            else res.json(data)
        })
})

//0Perform Classic Updates by Running Find, Edit, then Save
router.put("/findEditThenSave/:id",(req,res)=>{
    person.findByIdAndUpdate({_id:req.params.id},{$push:{favoriteFoods:"salade"}},({new:true}),(err,data)=>{
        if (err) throw err
        else {
            res.json(data)
            
        }
    })})


     //find  by name and set 
     router.put("/findNameAndSetAge/:name",(req,res)=>{
        person.findOneAndUpdate({name:req.params.name},{$set:{age:20}},({new:true}),(err,data)=>{
            if (err) throw err
            else {
                res.json(data)
                
            }
        })})


//delete on person by its id and returns the doccument deleted in DB
router.delete("/deleteOne/:id",(req,res)=>{
    person.findByIdAndRemove({_id:req.params.id},(err,data)=>{
        if (err) throw err
        else {
            res.json(data)
        }
    })})


    //delete with name  Mary
    router.delete("/findAndDeleteMany",(req,res)=>{
        person.remove({name:"Mary"},(err,data)=>{   
            if (err) throw err
            else {
                res.json({msg:"deleted document",data})
            }  })})

//Chain Search Query Helpers to Narrow Search Results
    var queryChain = function(done) {
        var foodToSearch = "burrito";
        
        person.find({favoriteFoods:foodToSearch}).sort({name : "desc"}).limit(2).select("-age").exec((err, data) => {
           if(err)
             console.log(err)
          else console.log(data)
        })
      };
      queryChain()

module.exports=router
