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

//POST new Post

PostRouter.post("/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  posts.insert(req.body).then(post => {
    res
      .status(201)
      .json(post)
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  });
});

//POST new comment

PostRouter.post("/posts/:id/comments", (req, res) => {
  if (!req.params.id) {
    res.status(404).json({
      message: "The post with the specified ID does not exist."
    });
  } else {
    if (!req.body.text) {
      res.status(400).json({
        errorMessage: "Please provide text for the comment."
      });
    } else {
      posts
        .insertComment({ ...req.body, post_id: req.params.id })
        .then(comment => {
          res.status(201).json(comment);
        })
        .catch(error => {
          res.status(500).json({
            error: "Cannot save comment"
          });
        });
    }
  }
});

//Delete Post

PostRouter.delete("/posts/:id", (req, res) => {
  posts
    .remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: "The post has been deleted"
        });
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed"
      });
    });
});

// Update Post

PostRouter.put("/posts/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  posts
    .update(req.params.id, req.body)
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
        error: "The post information could not be modified."
      });
    });
});

module.exports = PostRouter;
