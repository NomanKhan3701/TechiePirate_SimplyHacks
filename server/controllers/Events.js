const { PrismaClient } = require("@prisma/client");
const e = require("express");
const prisma = new PrismaClient();
const {
  validateEvent,
  validateComment,
  validateParticicpant,
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
    const url = await axios.post("http://localhost:8000/api/image/addImage", {
      img: img,
    });
    data.image = url.data.url;
    const { error } = validateEvent(data);
    res.send("createEvents");
  } catch (error) {}
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
  } catch (error) {}
};
const createContributor = async (req, res, next) => {
  try {
  } catch (error) {}
};
const addComment = (req, res, next) => {};
const getComments = (req, res, next) => {};
const deleteComment = (req, res, next) => {};
module.exports = {
  getEvents,
  createEvent,
  deleteEvent,
  editEvent,
  addComment,
  getComments,
  deleteComment,
};
