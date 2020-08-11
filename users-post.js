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

  //GET posts by ID

  PostRouter.get("/posts/:id", (req, res) => {
    posts
      .findById(req.params.id)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "The post information could not be retrieved."
        });
      });
  });

//GET Comments from Post ID

  PostRouter.get("/posts/:id/comments", (req, res) => {
    posts
      .findById(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        } else {
          return posts.findPostComments(req.params.id);
        }
      })
      .then(comments => {
        res.json(comments);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "The comments information could not be retrieved."
        });
      });
  });

  PostRouter.post("/posts", (req, res) => {
    if (!req.body.title || !req.body.contents) {
      return res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }
  
    posts
      .insert(req.body)
      .then(post => {
        res.status(201).json(post)
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  });
});

module.exports = PostRouter;