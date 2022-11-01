const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("5dad1d2da1ac42e5bf6dc26c0274ab7b");

class News{
    getNews = async (req, res) => {
        newsapi.v2
          .everything({
            q: "climate change",
            from: "2022-06-01",
            to: "2022-06-05",
            language: "en",
          })
          .then((response) => {
            res.json({ data: response });
          });
      };
}

module.exports = { News };
