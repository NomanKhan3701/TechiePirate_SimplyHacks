const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "techiepirateship@gmail.com",
    pass: "qyeatqudhekdzgpw",
  },
});
const {
  validateEvent,
  validateComment,
  validateParticipant,
  validateContributor,
} = require("../models/Events");

const getEvents = async (req, res, next) => {
  try {
    if (!req.query.tags) {
      const events = await prisma.Events.findMany({})
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
    console.log(error)
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const createEvent = async (req, res, next) => {
  try {
    let data = req.body;
    const img = req.body.image;
    let url;
    if (img) {
      url = await axios.post("http://localhost:8000/api/image/addImage", {
        img: img,
      });
      data.image = url.data.url;
    } else {
      data.image = undefined;
    }
    data.organizerEmail = req.user.email;
    const { error } = validateEvent(data);
    if (error) {
      console.log(error)
      return res
        .status(400)
        .send({ error, message: error.details[0].message, hi: "hello" });
    }

    const event = await prisma.Events.create({
      data: data,
    });
    // const events = await prisma.Events.findMany({});
    res.status(201).send({ message: "created event successfully", event });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server error" });
  }
};
const deleteEvent = async (req, res, next) => {
  try {
    res.send("deleteEvents");
  } catch (error) { }
};
const editEvent = async (req, res, next) => {
  try {
    res.send("editEvents");
  } catch (error) { }
};
const createParticipant = async (req, res, next) => {
  try {
    let data = req.body;
    data.userEmail = req.user.email;
    const { error } = validateParticipant;
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const participant = await prisma.Participant.create({
      data: data,
    });
    // const events = await prisma.Events.findMany({});
    res.status(201).send({ message: "created event successfully", participant });
    // send email to participant
    var mailOptions = {
      from: "techiepirateship@gmail.com",
      to: req.user.email,
      subject: "WeChange",
      text: "Congratulations You are a participant",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res
      .status(201)
      .send({ message: "created participant successfully", participant });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server error" });
  }
};
const createContributor = async (req, res, next) => {
  try {
    const { error } = validateContributor(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const contributor = await prisma.Contributor.create({
      data: req.body,
    });
    res
      .status(201)
      .send({ message: "created contributor successfully", contributor });
    // add increase in score patch request for contributions
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server error" });
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
    const comment = await prisma.eventComments.create({
      data: data,
    });
    const Comments = await prisma.eventComments.findMany({
      where: {
        eventsEventId: Number(req.body.eventsEventId),
      },
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
  try {
    const Comments = await prisma.eventComments.findMany({
      where: {
        eventsEventId: Number(req.query.eventsEventId),
      },
    });
    res.status(200).send(Comments);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
const deleteComment = (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
const getEvent = async (req, res, next) => {
  try {
    const id = Number(req.params.eventId);
    console.log(id);
    const event = await prisma.Events.findUnique({
      where: {
        eventId: Number(id),
      },
      include: {
        organizer: true,
        contributors: true,
        participants: true,
        comments: true,
      },
    });
    if (event) res.status(200).send(event);
    else res.status(404).send({ message: "Resource not Found" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
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
