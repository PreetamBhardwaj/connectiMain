const Post = require('../models/post');

module.exports.create = async function(req,res){
    console.log("in posts_controller");
    const post = await Post.create({ content : req.body.content, user : req.user._id });
    console.log('post : ',post);
    return res.redirect('/');
};
