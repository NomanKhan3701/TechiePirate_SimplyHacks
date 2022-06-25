const Joi = require("joi");

const validateEvent=(data)=>{
    const schema=Joi.object({

    })
    return schema.validate(data);
}


const validateComment=(data)=>{
     const schema=Joi.object({

    })
    return schema.validate(data);
}
module.exports={validateEvent,validateComment}