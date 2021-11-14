const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const path = require('path');

require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); //favicon 별도처리

const setReqUser = (req, res, next) => {
    const { cookies } = req;
    console.log(`🚀 ~ file: index.js ~ line 25 ~ setReqUser ~ cookies`, cookies)
    const token = cookies[process.env.COOKIE_NAME];
    console.log(`🚀 ~ file: index.js ~ line 27 ~ setReqUser ~ token`, token)
    if(!token) return next();

    const { verifyJWT } = require('./utilities/auth');

    verifyJWT(token).then((foundUser) => {
        req.user = foundUser;
        next();
    }).catch((error) => { next(); });
}

app.use(setReqUser);

app.get('/', (req, res) => {
    console.log('GOT HOME');
    const user = req.user;
    if(user) console.log("USER잇음", user._id);
    if(!user) res.redirect('/login');
    else res.redirect('/login');

    //   res.cookie('test', "vini", {
    //     maxAge: 60*60*1000,
    //     httpOnly: true,
    // })
    
});

app.use('/login', require('./routers/login')) //login router
app.use('/user', require('./routers/user.js'))

app.use((req, res, next) => { //404 error 처리
    res.status(400).send('404!');
});


app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});