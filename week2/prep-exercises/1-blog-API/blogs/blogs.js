const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.use(express.json());

//Add a New Blog Post

router.post("/", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ msg: "Please include a title and content" });
  }

  fs.writeFileSync(path.join(__dirname, title), content, (err) => {
    return res.statusCode(501).json({ msg: "The blog can not be created" });
  });
  res.status(201).send(`Blog Post with the ${title} is added`);
});

//Update A Blog Post

router.put("/:title", (req, res) => {
  const title = req.params.title;
  if (!fs.existsSync(path.join(__dirname, title))) {
    return res
      .status(400)
      .send(`No blog post is found with  title of ${title}`);
  }

  const content = req.body.content;

  if (!content) {
    return res.status(400).json({ msg: "Please include a content" });
  }

  fs.writeFileSync(path.join(__dirname, title), content, (err) => {
    return res.statusCode(501).json({ msg: "The blog can not be updated" });
  });
  res.status(200).send("Blog post is updated");
});

//Delete A Blog Post

router.delete("/:title", (req, res) => {
  const title = req.params.title;
  if (!fs.existsSync(path.join(__dirname, title))) {
    return res.status(400).send(`No blog post is found with title of ${title}`);
  }
  fs.unlinkSync(path.join(__dirname, title));
  res.status(200).send(`Blog post with title of ${title} is deleted`);
});

//Read a Blog Post
router.get("/:title", (req, res) => {
  const title = req.params.title;
  if (!fs.existsSync(path.join(__dirname, title))) {
    return res.status(400).send(`No blog post with ${title} title`);
  }
  const post = fs.readFileSync(path.join(__dirname, title), (err) => {
    return res.status(500).json({
      msg: "Sorry something unexpected happened we can not display the blog",
    });
  });

  res.status(200).sendFile(path.join(__dirname, title));
});

//Read all blogs
router.get("/", (req, res) => {
  fs.readdir(__dirname, (err, files) => {
    if (err) {
      return res.status(500).json({
        msg: "Sorry something unexpected happened we can not display the blogs",
      });
    }
    res.status(200).json(files);
  });
});

module.exports = router;
