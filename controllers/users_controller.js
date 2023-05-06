const User = require('../models/user')
const express = require("express");

module.exports.profile =async function(req,res){
    let user = await User.findById(req.params.id);
    console.log("U_C : ",user);
    res.render('user_profile',{
        title : "user profile",
        profile_user : user
    });
}

module.exports.sign_up = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    res.render('sign_up',{
        title : 'Sign Up'
    });
}

module.exports.sign_in = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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

// sign in and create a session for the user
module.exports.createsession = function(req,res){
    return res.redirect('/');
}

module.exports.signout = function(req,res){
    req.logout(function(err) {
        if (err) { return err; }
        return res.redirect('/');
      });
}

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id)
    {
        let user = await User.findByIdAndUpdate(req.params.id, req.body);
        return res.redirect('/');
    }
    else{
        res.status(401).send('Unautorized');
    }
}
