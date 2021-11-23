const userModel = require("../../model/User");
const authorization = require('../../utilities/auth.js')

class User {
    constructor() {}

    async signUp (id, pass, email) {
        try {
            const signUpUser = await userModel.createUser(id, pass, email);
            return signUpUser;
        } catch (error) {
            if(error.code == 11000) throw "DUPLICATED";
            else throw error;
        }
    }
    
    async logIn (id, pass) {
        try {
            const loginUser = await userModel.findUserByLoginInfo(id, pass);
            const token = authorization.signJWT(loginUser);

            return { loginUser, token };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new User();