const Joi = require("joi");

const validateComment=(data)=>{
  const schema= Joi.object({

  })
}
const validatePost = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().label("title"),
    tags:Joi.array().items(Joi.string()).required().label("tags"),
    content: Joi.string().required().label("content"),
    userEmail: Joi.string().email().required().label("email"),
  });
  return schema.validate(data);
};
module.exports = { validatePost,validateComment };
