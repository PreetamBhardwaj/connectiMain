const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    console.log("in posts_controller");
    try{
        const post = await Post.create({ content : req.body.content, user : req.user._id });
        console.log('post : ',post);
        return res.redirect('/');
    }
    catch(err){
        console.log('error in creating post PC',err);
        return res.redirect('/');
    }
};

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id)
        {
            console.log('billu : ');
            // post.remove();
            post.deleteOne();
            console.log('Post is Deleted');

            await Comment.deleteMany({post : req.params.id});
            console.log('Comments on post are Deleted');
            res.redirect('back');
        }
    }
    catch(err){
        console.log('error in finding posts : ',err);
        res.redirect('back');
    }
}
