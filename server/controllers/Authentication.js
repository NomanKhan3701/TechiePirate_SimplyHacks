const { PrismaClient } = require("@prisma/client");
const {
  generateAuthToken,
  validateSignup,
  validateLogin,
} = require("../models/User");
const prisma = new PrismaClient();
const argon2 = require("argon2");
const signup = async (req, res, next) => {
  try {
    if(req.body.google==false)
    {
      delete req.body.google;
      const{error}  = validateSignup(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given Email already exists!" });

    const hashPassword = await argon2.hash(req.body.password);
    const data = req.body;
    data.password = hashPassword;
    delete data.google
    await prisma.user.create({
      data: data,
    });
    res.status(201).send({ message: "User Created successfully" });
  }
  catch (e) {
    console.log(e)
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const login = async (req, res, next) => {
  try {
    if(!req.body.google)
    {
    delete req.body.google;
     const { error } = validateLogin(req.body);
     if (error)
       return res.status(400).send({ message: error.details[0].message });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) return res.status(401).send({ message: "Invalid Email" });

    if (await argon2.verify(user.password, req.body.password)) {
      const token = generateAuthToken(user);

      res.status(200).send({ token: "Bearer " + token, message: "Logged In Successfully" });
    } else {
      return res.status(401).send({ message: "Invalid Password" }); // password did not match
    }
  } catch (e) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};


module.exports = { signup, login };
