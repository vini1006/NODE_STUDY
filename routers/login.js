const express = require('express');
const router = express.Router();
const userService = require("../service/user/User");

const { asyncErrorHandle } = require('../utilities/util');

router.get('/', (req, res) => {
    console.log(`🚀 ~ file: login.js ~ line 8 ~ router.get ~ /login`);
    res.render('login/login');
});

router.post('/', async (req, res) => {
    const { id, password } = req.body;
    const [ serviceResult , serviceError ] = await asyncErrorHandle(userService.logIn(id, password));
    if(serviceError) {
        console.error(serviceError);
        return res.status(400).send(serviceError);
    }

    const { loginUser, token } = serviceResult;

    res.cookie(process.env.COOKIE_NAME, token, { maxAge: 86400 });
    res.status(200).send({status: "success"});
});

module.exports = router;