const jwt = require('jsonwebtoken');
const userModel = require('../model/User');
const secretKey = process.env.JWT_SECRET;

module.exports = {
    signJWT : (user) => {
        const { userId, _id } = user;

        const payload = { userId, _id };
        const tokenOption = { expiresIn: '1d' };

        const token = jwt.sign(payload, secretKey, tokenOption);
        return token;
    },
    
    verifyJWT : async (token) => {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        //verified의 shape은 jwt.sign할때의 payload를 따라감
        if(!payload) throw "INVALID";

        const foundUser = await userModel.verifyWithJWTPayload(payload);
        return foundUser;
    }
}
