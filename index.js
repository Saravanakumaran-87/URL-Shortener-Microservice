require("dotenv").config();

const express = require("express");

const cors = require("cors");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: req.session.venom });
});

originalurl = [];
shorturl = [];

app.post("/api/shorturl", (req, res) => {
  const url = req.body.url;
  const foundUrlindex = originalurl.indexOf(url);

  if (!url.includes("https://") && !url.includes("http://")) {
    return res.json({ error: "invalid url" });
  }
  if (foundUrlindex < 0) {
    originalurl.push(url);
    shorturl.push(shorturl.length);

    return res.json({ original_url: url, short_url: shorturl.length - 1 });
  }

  res.json({ original_url: url, short_url: shorturl[foundUrlindex] });
});
app.get("/api/shorturl/:short_url", (req, res) => {
  const shorturlid = parseInt(req.params.short_url);
  const foundUrlindex = shorturl.indexOf(shorturlid);

  if (foundUrlindex < 0) {
    res.json({ error: "no short url found for that input" });
  }

  res.redirect(originalurl[foundUrlindex]);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
