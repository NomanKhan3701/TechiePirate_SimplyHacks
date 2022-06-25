const Joi = require("joi");

const validatePost=(data)=>{
    const schema=Joi.object({
        postId:Joi.number().required().label("postId"),
        
    })
     return schema.validate(data);
}
module.exports={validatePost}