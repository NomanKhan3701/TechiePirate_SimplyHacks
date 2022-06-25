const Joi = require("joi");

const validateComment=(data)=>{
  const schema= Joi.object({
    comment:Joi.string().label("title"),
    userEmail:Joi.string().email().required().label("email"),
    postsPostId:Joi.number().integer().label("postId"),
  })
  return schema.validate(data)
}
const validatePost = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().label("title"),
    tags:Joi.array().items(Joi.string()).required().label("tags"),
    content: Joi.string().required().label("content"),
    image:Joi.string().label("image"),
    userEmail: Joi.string().email().required().label("email"),
  });
  return schema.validate(data);
};
module.exports = { validatePost,validateComment };
