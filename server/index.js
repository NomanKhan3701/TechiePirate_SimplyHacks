const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const useImageRoute = require("./routes/image");

dotenv.config();
const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: "*",
};

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

// {* All the routes here *}
app.use("/api/image", useImageRoute);


app.get("/", (req, res) => {
  res.send("Hallaluya");
});

app.listen(PORT, async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL, // Mongo url required in .env file
      { useNewUrlParser: true },
      () => console.log(`Server running at port ${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
});
