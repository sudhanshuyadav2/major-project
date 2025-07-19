const user =require("../models/user")


module.exports.signuprender=(req,res)=>{
 res.render("user/signup.ejs")

}

module.exports.signup=async (req, res) => {
  try{
let {username,email,password}=req.body;
  const newuser = new user ({email,username})
 let resgister = await user.register(newuser, password);
  console.log(resgister)
   req.login(resgister,(err)=>{
    if(err){
      return next(err)
    }
    req.flash("sucess", "You login  successfully");
    res.redirect("/listing");

   }) 
  }catch(err){
  req.flash("errors",err.message);
     res.redirect("/listing");
  }
  
}



module.exports.loginrender=(req,res)=>{
 res.render("user/login.ejs")

}

module.exports.login= async(req, res) => {
    req.flash("sucess", "You login successfully");

    let originalurl = res.locals.redirect || "/listing";
    res.redirect(originalurl);
  }

  module.exports.logout=(req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash("sucess", "You logged out successfully");
    res.redirect("/listing");
  });
}