const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ msg: "Please include a title and content" });
  }
  fs.writeFileSync(title, content, (err) => {
    return res.statusCode(500).json({ msg: "the file can not be written" });
  });
  res.status(201).send(`Blog Post with the ${title} is added`);
});

router.put("/:title", (req, res) => {
  if (!fs.existsSync(req.params.title)) {
    return res
      .status(400)
      .send(`No blog post is found with  title of ${req.params.title}`);
  }
  fs.unlinkSync(req.params.title);

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ msg: "Please include a title and content" });
  }

  fs.writeFileSync(title, content);
  res.status(200).send("Blog post is updated");
});

router.delete("/:title", (req, res) => {
  const title = req.params.title;
  if (!fs.existsSync(title)) {
    return res.status(400).send(`No blog post is found with ${title} title`);
  }
  fs.unlinkSync(title);
  res.status(200).send(`Blog post with title of ${title} is deleted`);
});

router.get("/:title", (req, res) => {
  const title = req.params.title;
  if (!fs.existsSync(title)) {
    return res.status(400).send(`No blog post with ${title} title`);
  }
  const post = fs.readFileSync(title, (err) => {
    throw err;
  });

  const options = {
    root: "./",
  };
  res.status(200).sendFile(title, options, (err) => {});
});

module.exports = router;
