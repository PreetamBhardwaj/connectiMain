const User = require('../models/user');

module.exports.profile =async function(req,res){
    if(req.cookies.user_id)
    {
        let user = await User.findById(req.cookies.user_id);

        if(user)
        {
            return res.render('user_profile',{
                title : "user profile",
                user : user
            });
        }
        else
        {
            return res.redirect('/users/sign-in');
        }
    }
    else{
        return res.redirect('/users/sign-in');
    }
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
    console.log('email : ',req.body.email);
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

module.exports.createsession = async function(req,res){
        console.log('email : ',req.body.email);

        let user = await User.findOne({email : req.body.email});

        // handle user found
        if(user)
        {
            // handle password if doesn't match
            if(user.password != req.body.password)
            {
                return res.redirect('back');
            }

            // handle session creation
            console.log('user_id : ',user.id);
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');

        }   // handle user not found
        else{
            console.log('user not found');
            return res.redirect('back');
        }
}

module.exports.signout = function(req,res){
    res.cookie('user_id',56);
    console.log('sign-out done');
    return res.redirect('/users/sign-in');
}
