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

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "The posts information could not be retrieved."
        });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Posts.findById(id);
        if (post.length > 0) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "The post information could not be retrieved." 
        });
    }
});

module.exports = router;