const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const useImageRoute = require("./routes/image");
const  auth=require("./routes/Authentication")
var passport = require('passport');


dotenv.config();
const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: "*",
};

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

// {* All the routes here *}
app.use(passport.initialize());
app.use("/api/image", useImageRoute);
app.use("/api/auth", auth);


app.listen(PORT, async () => {
  try {
    console.log(`Server running on ${PORT}`)
  } catch (e) {
    console.log(e);
  }
});

