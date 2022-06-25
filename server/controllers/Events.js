const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {validateEvent,validateComment}=require("../models/Events")

const getEvents=async(req,res,next)=>{
    try {
        res.send("getEvents")
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



