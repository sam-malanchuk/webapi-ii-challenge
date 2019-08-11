const express = require('express');

const Posts = require('./data/db.js');

const router = express.Router();

router.post('/', async (req, res) => {
    const postData = req.body;
    if (postData.title && postData.contents) {
        try {
            const post = await Posts.insert(postData);
            res.status(201).json(post);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the post to the database"
            });
        };
    } else {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        });
    }
});

router.post('/:id/comments', async (req, res) => {
    const commentData = {...req.body, post_id: req.params.id };
    if (commentData.text) {
        try {
            const comment = await Posts.insertComment(commentData);
            res.status(201).json(comment);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the comment to the database"
            });
        }
    } else {
        res.status(400).json({
            errorMessage: "Please provide text for the comment."
        });
    }
});

module.exports = router;