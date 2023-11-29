
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

router.get('/:title', async (req, res) => {
  try {
    const comments = await Comment.find({ movieTitle: req.params.title });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:title', async (req, res) => {
  const comment = new Comment({
    movieTitle: req.params.title,
    name: req.body.name,
    comment: req.body.comment,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
