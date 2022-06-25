const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios=require("axios")
const {
  validateEvent,
  validateComment,
  validateParticipant,
  validateContributor,
} = require("../models/Events");

const getEvents = async (req, res, next) => {
  try {
    //console.log("hello")
    if (!req.query.tags) {
      const events = await prisma.Events.findMany({});
      res.send(events);
    } else {
      const fields = req.query.tags;
      const field = fields.split(",");
      const events = await prisma.Events.findMany({
        where: {
          eventTags: {
            hasSome: field,
          },
        },
      });
      res.send(events);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const createEvent = async (req, res, next) => {
  try {
    let data = req.body;
    const img = req.body.image;
    let url;
    if(img){
     url = await axios.post("http://localhost:8000/api/image/addImage", {
      img: img,
    });
     data.image = url.data.url;
    }
    else
    {
        data.image=undefined
    }
    data.organizerEmail = req.user.email;
    const { error } = validateEvent(data);
    if (error)
      return res.status(400).send({error,
        message: error.details[0].message,"hi":"hello"
      });
    const event = await prisma.Events.create({
      data: data,
    });
    // const events = await prisma.Events.findMany({});
    res.status(201).send({message:"created event successfully",event});
  } catch (error) {
    console.log(error)
    res.status(500).send({message:"Internal Server error"})
  }
};
const deleteEvent = async (req, res, next) => {
  try {
    res.send("deleteEvents");
  } catch (error) {
  }
};
const editEvent = async (req, res, next) => {
  try {

    res.send("editEvents");
  } catch (error) {}
};
const createParticipant = async (req, res, next) => {
  try {
    let data=req.body;
    data.userEmail=req.user.email;
    const{error}=validateParticipant;
    if (error)
      return res
        .status(400)
        .send({ error, message: error.details[0].message, hi: "hello" });

    const participant = await prisma.Participant.create({
      data: data,
    });
    // const events = await prisma.Events.findMany({});
    res.status(201).send({ message: "created event successfully", participant});
    // send email to participant
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server error" });
  }
};
const createContributor = async (req, res, next) => {
  try {
    const {error}=validateContributor(req.body);
    
  } catch (error) {}
};
const addComment = (req, res, next) => {};
const getComments = (req, res, next) => {};
const deleteComment = (req, res, next) => {};
const getEvent = (req, res, next) => {};
module.exports = {
  getEvents,
  createEvent,
  deleteEvent,
  editEvent,
  addComment,
  getComments,
  deleteComment,
  createParticipant,
  createContributor,
  getEvent,
};
