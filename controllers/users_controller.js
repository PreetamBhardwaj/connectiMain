const User = require('../models/user')
const express = require("express");

module.exports.profile = function(req,res){
    res.render('user_profile',{
        title : "user profile"
    });
}

module.exports.sign_up = function(req,res){
    res.render('sign_up',{
        title : 'Sign Up'
    });
}

module.exports.sign_in = function(req,res){
    res.render('sign_in',{
        title : 'Sign In'
    });
}

module.exports.createuser =async function(req,res){

    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }

    try{
        let user = await User.findOne({email : req.body.email}); 

        if(!user)
        {
            try{
                let create = await User.create(req.body);
                return res.redirect('/users/sign-in');
            }
            catch(err)
            {
                console.log('error in creating user while signing up'); 
                return;
            }
        }
        else{
            console.log('Already Signed up');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('error in finding user in signing up');
        return;
    }
}
