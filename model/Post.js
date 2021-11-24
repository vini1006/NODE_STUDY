const postSchema = require('../schema/PostSchema');

class Post {
    constructor(){}

    async getAllPost() {
        try {
            const foundPosts = await postSchema.find({});
            return foundPosts;
        } catch (error) {
            throw error;
        }
    }

    async createPost ({creatorId, title, text}) {
        try {
            const newPost = new userSchema({
                creator: creatorId
                , title
                , text
            });
    
            const savedPost = await newPost.save();
    
            return savedPost;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Post();