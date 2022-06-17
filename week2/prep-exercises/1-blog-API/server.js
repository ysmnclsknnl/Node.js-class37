const express = require("express");
const path = require("path");
const router = require("./blogs/blogs");

const app = express();

// YOUR CODE GOES IN HERE

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/blogs", router);

app.listen(3000);
