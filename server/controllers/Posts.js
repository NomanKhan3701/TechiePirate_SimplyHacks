const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const{validatePost}=require('../models/Posts')
const getPosts=async(req,res,next)=>{
    try {
    const fields=req.params
    const Posts=await prisma.Posts.findMany({})
    const result=Posts.filter((Post)=>{
        return 
    })
    {

    }
    res.send(results)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
}
const addPost=(req,res,next)=>{

}
const deletePost=(req,res,next)=>{
  
}


module.exports={
    getPosts,
    addPost,
    deletePost,
}