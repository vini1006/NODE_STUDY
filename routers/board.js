const express = require('express');
const router = express.Router();
const postService = require("../service/post/Post");

const { asyncErrorHandle } = require('../utilities/util');

router.get('/', async (req, res) => {
    try {
        const postList = await postService.getAllPost();
        console.log(`🚀 ~ file: board.js ~ line 10 ~ router.get ~ postList`, postList)
        res.render('board/boardList', {
            user: req.user
            , post: postList
        });
    } catch (error) {
        console.log(`🚀 ~ file: board.js ~ line 15 ~ router.get ~ error`, error)
        res.render('board/boardList', {
            user: req.user
            , post: []
        });
    }
});

router.post('/create', async (req, res) => {
    const user = req.user;
    console.log(`🚀 ~ file: board.js ~ line 16 ~ router.post ~ user`, user)
    if(!user) return res.status(400).send("Please login again ^^;;")

    const { title, text } = req.body;
    try {
        const newPost = await postService.createNewPost({
            creatorId: user.id
            , title
            , text
        })

        res.status(200).send("success");
    } catch (error) {
        console.error(error)
        res.status(400).send(error)
    }
});

module.exports = router;