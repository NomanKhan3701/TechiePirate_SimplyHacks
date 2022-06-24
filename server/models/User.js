const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");

generateAuthToken = (signatureObject) => {
  const token = jwt.sign(
    { _id: signatureObject._id },
    process.env.JWTPRIVATEKEY,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

const validateSignup = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("firstName"),
    lastName: Joi.string().required().label("lastName"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
  });
  return schema.validate(data);
};

module.exports = { generateAuthToken, validateSignup, validateLogin };
