const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {validateEvent,validateComment}=require("../models/Events")

const getEvents=async(req,res,next)=>{
    try {
         //console.log("hello")
        const fields=req.query.tags
        const field=fields.split(',')
        const events=await prisma.Events.findMany({
        where:{
            eventTags:{
                hasSome:field,
            }
        }
    })
    res.send(events)
        
    } catch (error) {
        
    }
}
const createEvent=async(req,res,next)=>{
    try {
        
        res.send("createEvents")
    } catch (error) {
        
    }
}
const deleteEvent=async(req,res,next)=>{
    try {
         res.send("deleteEvents")
    } catch (error) {
        
    }
}
const editEvent=async(req,res,next)=>{
    try {
         res.send("editEvents")
    } catch (error) {

    }
}
const participate=async(req,res,next)=>{

}
const contribute=async(req,res,next)=>[

]
const addComment=(req,res,next)=>{

}
const getComments=(req,res,next)=>{

}
const deleteComment=(req,res,next)=>{
    
}
module.exports={
    getEvents,
    createEvent,
    deleteEvent,
    editEvent,
    addComment,
    getComments,
    deleteComment,
};



