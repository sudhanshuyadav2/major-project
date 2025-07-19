const listing =require("../models/listing.js");
const review = require("../models/review.js");



module.exports.createreview=async(req,res)=>{
     let listings = await  listing.findById(req.params.id);            /////
     let newreview =  new review(req.body.review);
      // console.log("Review body:", req.body.review);
      newreview.outher=req.user._id;
      // console.log(newreview)
      listings.review.push(newreview);
    
  
     await newreview.save();
     await listings.save();

    console.log(`reviews save`);
    req.flash("sucess","new review created sucessful!");
    res.redirect(`/listing/${listings.id}`)
}


module.exports.destroy=async(req,res)=>{
let {id,reviewid}=req.params;
  await listing.findByIdAndUpdate(id, {$pull: { review:reviewid}});

  await review.findByIdAndDelete(reviewid);

req.flash("sucess","review deleted sucessful!");

res.redirect(`/listing/${id}`);
}