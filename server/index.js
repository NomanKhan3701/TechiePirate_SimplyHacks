const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const useImageRoute = require("./routes/image");
const auth = require("./routes/Authentication");
const posts = require("./routes/Posts");
const events = require("./routes/Events");
const payment = require("./routes/payment");
const news = require("./routes/news");
const leaderboard = require("./routes/LeaderBoard");

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
app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/events", events);
app.use("/api/payment", payment);
app.use("/api/news", news);
app.use("/api/leaderboard", leaderboard);

app.listen(PORT, async () => {
  try {
    console.log(`Server running on ${PORT}`);
  } catch (e) {
    console.log(e);
  }
});
