const passport = require('passport');
const Post = require('../models/post');

 

module.exports.home =function(req,res){
    Post.find({}).populate('user').populate({path:'comments',populate:{path:'user'}}).exec().then(function(posts){
        return res.render('home',{
            title:"Home",
            posts : posts
        })
    }).catch(function(err){
        console.log('posts not find',err);
        return res.redirect('back');
    })
}