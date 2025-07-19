const listing=require("./models/listing");
const review = require("./models/review");
const expresserr = require("./extra/expresserr.js");
const {joischema,reviewschema}=require("./schema.js");



module.exports.isloggedin = (req,res,next)=>{
  console.log(req.path ,"..",req.originalUrl)
if (!req.isAuthenticated()) {
   req.session.redirect = req.originalUrl;
  //  console.log(req.session.redirect)
  req.flash("errors", "please login to create new listing");
  return res.redirect("/login"); // ← return here!
}
next();
}



module.exports.isoriginalurl = (req, res, next) => {
  if (req.session.redirect) {
    // If it's a DELETE route via method-override, fallback to listing page
    if (req.session.redirect.includes("_method=delete")) {
      const listingId = req.session.redirect.split("/")[2];
      res.locals.redirect = `/listing/${listingId}`;
    } else {
      res.locals.redirect = req.session.redirect;
    }
    delete req.session.redirect;
  }
  next();
};




// After login
module.exports.isowner = async(req,res,next)=>{
let {id}=req.params;
 let listings = await listing.findById(id);
    // console.log(listings);
  if (!listings.owner._id.equals(res.locals.currentUser._id)) {
    req.flash("errors", "You don't have permission to update");
    return res.redirect(`/listing/${id}`);
  }
    next()
}



module.exports.validatelisting=(req,res,next)=>{
 let{error}=joischema.validate(req.body);
  
   if(error){
    throw new expresserr(404,error);
   }else{
    next();
   }
   
}


module.exports.isreview = async(req,res,next)=>{
let {id,reviewid}=req.params;
 let reviews = await review.findById(reviewid);
    // console.log(listings);
  if (!reviews.outher.equals(res.locals.currentUser._id)) {
    req.flash("errors", "You don't have permission to delete  outhor review");
    return res.redirect(`/listing/${id}`);
  }
    next()
}

module.exports.validatereviews = (req, res, next) => {
  let { error } = reviewschema.validate(req.body);
  if (error) throw new expresserr(404, error);
  next();
};