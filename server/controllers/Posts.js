const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const{validatePost,validateComment}=require('../models/Posts')


const getPosts=async(req,res,next)=>{
    try {
    const fields=req.query.tags
    const field=fields.split(',')
    const Posts=await prisma.Posts.findMany({
        where:{
            tags:{
                hasSome:field,
            }
        }
    })
    res.send(Posts)
    
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const addPost=async(req,res,next)=>{ 
    try {
    
    let data=req.body;
    data.userEmail=req.user.email;
    const {error}=validatePost(data);
    if(error)
     return res.status(400).send({ message: error.details[0].message });
   
    const post=await prisma.Posts.create({
      data: data,
    });
    res.send(post);
   } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
    }
}
const deletePost=async(req,res,next)=>{
  try {
    const post=await prisma.Posts.findUnique({
        where:{
            postId:req.body.postId,
        }
    })
    if(!post)
    {
     res.status(404).send({message:"Resource not found "})
    }
    else{
     const deletedPost=await prisma.Posts.delete({
        where:{
            postId:req.body.postId,
        }
     })
     console.log("delete",deletedPost)
  
     res.status(200).send({message:"Deleted Successfully",post:deletedPost})
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
const addComment=async(req,res,next)=>{
 try {
    
 } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error" });
 }
}
const getComments=async(req,res,next)=>{
    //res.send("hello")
    try {
        const Comments=await prisma.postComments.findMany({})
        res.send(Comments)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
    const Comments=await prisma.postComments.findMany({})
    res.send(Comments)
}
const deleteComment=async(req,res,next)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
}
module.exports={
    getPosts,
    addPost,
    deletePost,
    addComment,
    getComments,
    deleteComment,
}