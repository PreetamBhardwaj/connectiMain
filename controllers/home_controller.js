const passport = require('passport');

module.exports.home = function(req,res){
    let user = req.cookies.connecti;
    // console.log('user HC : ',user);
    return res.render('home',{
        title : "Home"
    });
}