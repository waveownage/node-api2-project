const express = require("express");
const posts = require("./data/db");
const PostRouter = express.Router();

//Get all Posts

PostRouter.get("/posts", (req, res) => {
    console.log(req.query);
    posts
      .find({})
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "The posts information could not be retrieved."
        });
      });
  });

module.exports = PostRouter;