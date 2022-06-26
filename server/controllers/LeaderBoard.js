const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const leaderboard = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        image: true,
        resourcePts: true,
        workPts: true,
      },
    });

    res.status(200).send(users);
  } catch (error) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = leaderboard;
