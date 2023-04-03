const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create =async function(req,res){
    let post = await Post.findById(req.body.post);

    if(post)
    {
        try{
            let comment = await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            })

            post.comments.push(comment);
            post.save();

            return res.redirect('/');
        }
        catch(err)
        {
            console.log('error in creating comment',err);
            res.redirect('back');
        }
    }
    else
    {
        console.log('Post not found in the DB');
        return res.redirect('back');
    }

}