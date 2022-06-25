const Joi = require("joi");

const validateEvent = (data) => {
  const schema = Joi.object({
    image: Joi.string().label("image"),
    title: Joi.string().required().label("title"),
    description: Joi.string().required().label("description"),
    time: Joi.date().required().label("Date/Time"),
    city: Joi.string().required().label("City"),
    address: Joi.string().required().label("Address"),
    eventTags: Joi.array().items(Joi.string()).label("Tags"),
    organizerEmail: Joi.string().email().required().label("Email"),
  });
  return schema.validate(data);
};
const validateParticipant = (data) => {
  const schema = Joi.object({
    eventsEventId:Joi.number().label("eventId"),
    userEmail:Joi.string().email().required().label("userEmail"),
  });
  return schema.validate(data);
};
const validateContributor = (data) => {
  const schema = Joi.object({
    userEmail:Joi.string().email().required().label("email"),
    eventsEventId:Joi.number().label("eventid"),
    monetary:Joi.number().label("Monetary amount")
  });
  return schema.validate(data);
};
const validateComment = (data) => {
  const schema = Joi.object({});
  return schema.validate(data);
};
module.exports = {
  validateEvent,
  validateComment,
  validateParticipant,
  validateContributor,
};
