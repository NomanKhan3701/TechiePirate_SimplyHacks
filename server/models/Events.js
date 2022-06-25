const Joi = require("joi");

const validateEvent = (data) => {
  const schema = Joi.object({});
  return schema.validate(data);
};
const validateParticicpant = (data) => {
  const schema = Joi.object({
    Image:Joi.string().label("Image")
  });
  return schema.validate(data);
};
const validateContributor = (data) => {
  const schema = Joi.object({});
  return schema.validate(data);
};
const validateComment = (data) => {
  const schema = Joi.object({});
  return schema.validate(data);
};
module.exports = {
  validateEvent,
  validateComment,
  validateParticicpant,
  validateContributor,
};
