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

module.exports.createuser = function(req,res){
    // todo later
}
