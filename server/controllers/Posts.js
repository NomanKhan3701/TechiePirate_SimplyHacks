const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validatePost, validateComment } = require("../models/Posts");
const { getImages, addImage, deleteImage } = require("../controllers/image");
const axios = require("axios");

const getPost = async (req, res, next) => {
  try {
    const id = req.query.id;
    const Post = await prisma.Posts.findUnique({
      where: {
        postId: Number(id),
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            workPts: true,
            resourcePts: true,
            image: true,
          },
        },
      },
    });
    res.send(Post);
  } catch (e) {
    console.log(e);
  }
};

const getPosts = async (req, res, next) => {
  try {
    if (!req.query.tags) {
      const Posts = await prisma.Posts.findMany({
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              workPts: true,
              resourcePts: true,
              image: true,
            },
          },
        },
      });
      res.status(200).send(Posts);
    } else {
      const fields = req.query.tags;
      const field = fields.split(",");
      const Posts = await prisma.Posts.findMany({
        where: {
          tags: {
            hasSome: field,
          },
        },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              workPts: true,
              resourcePts: true,
              image: true,
            },
          },
        },
      });
      res.send(Posts);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const addPost = async (req, res, next) => {
  try {
    let data = req.body;
    const img = req.body.image;
    const url = await axios.post("http://localhost:8000/api/image/addImage", {
      img: img,
    });
    // console.log(url.data)
    data.userEmail = req.user.email;
    data.image = url.data.url;
    const { error } = validatePost(data);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });

    const post = await prisma.Posts.create({
      data: data,
    });
    res.send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
const deletePost = async (req, res, next) => {
  try {
    const post = await prisma.Posts.findUnique({
      where: {
        postId: req.body.postId,
      },
    });
    if (!post) {
      res.status(404).send({
        message: "Resource not found ",
      });
    } else {
      const deletedPost = await prisma.Posts.delete({
        where: {
          postId: req.body.postId,
        },
      });
      console.log("delete", deletedPost);

      res.status(200).send({
        message: "Deleted Successfully",
        post: deletedPost,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
const addComment = async (req, res, next) => {
  try {
    const data = req.body;
    data.userEmail = req.user.email;
    const { error } = validateComment(data);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });
    const comment = await prisma.postComments.create({
      data: data,
    });
    const Comments = await prisma.postComments.findMany({
      where: {
        postsPostId: Number(req.body.postsPostId),
      },
      include:{
        author:true,
      }
    });
    res.status(201).send(Comments);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
const getComments = async (req, res, next) => {
  //res.send("hello")
  try {
    const Comments = await prisma.postComments.findMany({
      where: {
        postsPostId: Number(req.query.postId),
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            workPts: true,
            resourcePts: true,
            image: true,
          },
        },
      },
    });
    res.send(Comments);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
const deleteComment = async (req, res, next) => {
  try {
    const comment = await prisma.postComments.findUnique({
      where: {
        commentId: req.body.commentId,
      },
    });
    if (comment) {
      const deletedComment = await prisma.postComments.delete({
        where: {
          commentId: req.body.commentId,
        },
      });
      console.log("delete", deletedComment);
      res.status(200).send({
        message: "Deleted Successfully",
        comment: deletedComment,
      });
    } else {
      res.status(404).send({
        message: "Resource not found ",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  getPost,
  getPosts,
  addPost,
  deletePost,
  addComment,
  getComments,
  deleteComment,
};
