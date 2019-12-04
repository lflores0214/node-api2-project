const express = require("express");
const Posts = require("../Posts/db");
const router = express.Router();

router.use(express.json());

// GET REQUESTS

//Get Posts
router.get("/", (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error retrieving posts"
      });
    });
});

//Get Post by id
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error fetching this post"
      });
    });
});

// Find comment by id
router.get("/:id/comments/:id", (req, res) => {
  const id = req.params.id
  Posts.findCommentById(id)
    .then(comment => {
      res.status(201).json(comment);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error fetching comments"
      });
    });
});

//Find post comments
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  Posts.findPostComments(id)
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "problem fetching comments"
      });
    });
});

// POST REQUESTS
// Create new post
router.post("/", (req, res) => {
  const body = req.body;
  !body.title || !body.contents
    ? res.status(400).json({
        errorMessage: "please provide a title and contents for the post"
      })
    : Posts.insert(body)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(error => {
          console.log(error, "error adding post");
          res.status(500).json({
            errorMessage: "error adding post"
          });
        });
});

// create new post comments
router.post("/:id/comments", (req, res) => {
  const comment = req.body;
  const id = req.params.id;
  Posts.insertComment(comment)
    .then(comment => {
      res.status(200).json({
        message: "Comment was posted",
        comment,
        id
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error adding comment"
      });
    });
});

//PUT REQUESTS
//edit posts
router.put("/:id", (req, res) => {
  const updates = req.body;
  const id = req.params.id;
  Posts.update(id, updates)
    .then(post => {
      post
        ? res.status(200).json(post)
        : res.status(404).json({
            message: "the post does not exist"
          });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error updating post"
      });
    });
});

//Delete REQUEST
router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then(removed => {
      if (removed) {
        res.status(200).json({
          message: "post was deleted"
        });
      } else {
        res.status(500).json({
          message: "post not found"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error deleting post"
      });
    });
});
module.exports = router;
