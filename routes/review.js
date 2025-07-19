const express=require("express");
const router = express.Router({mergeParams:true});
const wrapasync = require("../extra/wrapasync");
const expresserr = require("../extra/expresserr.js");

const review = require("../models/review.js");
const listing =require("../models/listing.js");
const {validatereviews, isloggedin,isreview,isoriginalurl}=require("../middlewer.js")
const reviewcontroller=require("../controller/review.js")

///create review route
 router.post("/",
  isloggedin,
  validatereviews,
  wrapasync(reviewcontroller.createreview)
 )

 //delte review raute

router.delete("/:reviewid",
  isloggedin,
   isoriginalurl,
  isreview,
  wrapasync(reviewcontroller.destroy)

)

module.exports= router;

