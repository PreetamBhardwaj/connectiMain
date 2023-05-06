const passport = require('passport');
const Post = require('../models/post');
const User = require('../models/user'); 

module.exports.home =function(req,res){
    Post.find({}).populate('user').populate({path:'comments',populate:{path:'user'}}).exec().then(
        async function(posts){
            let users = await User.find({})

            return res.render('home',{
                title:"Home",
                posts : posts,
                all_users : users
            });
        }).catch(function(err){
            console.log('posts not find',err);
            return res.redirect('back');
        })
}