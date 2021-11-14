const userSchema = require('../schema/UserSchema');

class User {
    constructor(){}

    async createUser (userId, password, email) {
        try {
            const newUser = new userSchema({
                userId
                , password
                , email
            });
    
            const savedUser = await newUser.save();
    
            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    async findUserByLoginInfo (userId, password) {
        try {
            const foundUser = await userSchema.findOne({
                userId
                , password
            })
    
            return foundUser;
        } catch (error) {
            throw error;
        }
    }

    async finUserByEmail (email) {
        try {
            const foundUser = await userSchema.findOne({ email });
    
            return foundUser;
        } catch (error) {
            throw error;
        }
    }

    async verifyWithJWTPayload (payload) {
        const {userId, _id} = payload;

        const foundUser = await userSchema.findOne({ userId, _id });
        
        return foundUser;
    }
}

module.exports = new User();