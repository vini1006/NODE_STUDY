const postModel = require("../../model/Post");

class Post {
    constructor() {}

    async getAllPost () {
        try {
            const posts = await postModel.getAllPost();
            return posts;
        } catch (error) {
            throw error;
        }
    }

    async createNewPost ({creatorId, title, text}) {
        try {
            const newPost = await postModel.createPost({creatorId, title, text});
            return newPost;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Post();