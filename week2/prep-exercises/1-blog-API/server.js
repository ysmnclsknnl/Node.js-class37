const express = require("express");
const app = express();
const fs = require("fs");
const { url } = require("inspector");

// YOUR CODE GOES IN HERE

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send("Please include a title and content");
  }
  fs.writeFileSync(title, content);
  res.status(201).send(`${title} is added`);
});

app.put("/posts/:title", (req, res) => {
  const postTitle = req.params.title;
  if (!fs.existsSync(postTitle)) {
    return res
      .status(400)
      .send(`No blog post is found with ${postTitle} title`);
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send("Please include a title and content");
  }
  fs.unlinkSync(postTitle);
  fs.writeFileSync(title, content);
  res.status(200).send("Blog post is updated");
});

app.delete("/blogs/:title", (req, res) => {
  const postTitle = req.params.title;
  console.log(postTitle);
  if (!fs.existsSync(postTitle)) {
    return res
      .status(400)
      .send(`No blog post is found with ${postTitle} title`);
  }
  fs.unlinkSync(postTitle);
  res.status(200).send("Blog post is deleted");
});

app.listen(3000);
