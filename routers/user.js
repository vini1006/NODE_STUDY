const express = require('express');
const router = express.Router();

const userService = require('../service/user/User');
const { asyncErrorHandle } = require('../utilities/util.js')

router.get('/signup', (req, res) => {  
    res.render('user/signup')
})

router.post('/signup', async (req, res) => {
    const {id, password, email} = req.body;
    const [ signUpUser, signUpError ] = await asyncErrorHandle(userService.signUp(id, password, email));
    if(signUpError) {
        console.log(signUpError)
        return res.status(400).send(signUpError);
    }

    res.clearCookie(process.env.COOKIE_NAME);
    res.status(200).send({ redirect: '/login'});
});

module.exports = router;
