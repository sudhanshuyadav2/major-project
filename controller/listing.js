const listing =require("../models/listing");
const mbxgeocode = require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken=process.env.map_token;
const geocodingClient = mbxgeocode({ accessToken: maptoken });


module.exports.index=async(req,res)=>{
  const alllistings = await listing.find({});
  // console.log(alllistings)
 res.render("listings/index.ejs", {alllistings});
}

module.exports.new=(req,res)=>{
res.render("listings/new.ejs");

}





module.exports.createlisting= async (req,res,next)=>{
 let response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
}).send()
  //  res.send("done");
  
   const newdb = new listing(req.body.listing)
    let url=req.file.path;
    let filename =req.file.filename;
    // console.log(url,"",filename)
   console.log(req.body.listing);
      newdb.owner=req.user._id;
       newdb.image={url,filename}
       
      newdb.geometry=response.body.features[0].geometry;
             let cat=req.body.category;
        console.log(cat);
          let data=  await newdb.save();
      console.log(data);
    req.flash("sucess","new listings created!");
   res.redirect("/listing");

}


module.exports.showalisting=async (req, res) => {
  const { id } = req.params;
  const listings = await listing.findById(id)
   .populate({
    path: "review",
   populate: { path: "outher" }
  })
  .populate("owner");

  if (!listings) {
    req.flash("error", "The listing you searched for does not exist.");
    return res.redirect("/listing"); // ← return added to avoid continuing
  }
 req.flash("sucess", "show all listing.");
  res.render("listings/show.ejs", { listings });
}

module.exports.editformrender=async (req,res)=>{
const {id} =  req.params;
 const listings = await listing.findById(id);
 if(!listings){
 req.flash("errors","listing you deacrch does not exit")
  res.redirect("/listing")
 }else{
   let orignalurl=listings.image.url;
  let  newimageurl =  orignalurl.replace("/upload","/upload/h_200,w_250")
  
   res.render("listings/edit.ejs",{listings,newimageurl})
 }

}


module.exports.editupdate=async (req, res) => {

  const { id } = req.params;
 let listings = await listing.findByIdAndUpdate(id, req.body.listing);
 if(typeof req.file !=="undefined"){
     let url =req.file.path;
    let filename = req.file.filename;
  listings.image={url,filename}
  await listings.save();
 }
    req.flash("sucess", "Edit updated!");
  res.redirect(`/listing/${id}`);
}

module.exports.destroy=async(req,res)=>{
const {id}=req.params;
 await listing.findByIdAndDelete(id);
req.flash("sucess","delete sucessful!");
res.redirect("/listing");

}



module.exports.categoryFilter = async (req, res) => {
  const category = req.params.cat;
  const alllistings = await listing.find({ category });
  if (!alllistings.length) {
    req.flash("error", `No listings found for ${category}`);
    return res.redirect("/listing");
  }
  res.render("listings/index", { alllistings });
};



 module.exports.searchListings = async (req, res) => {
  const query = req.query.q;
  const search = new RegExp(query, "i");

  const alllistings = await listing.find({
    $or: [
      { title: search},
      { location:  search },
      { country: search },
      { category:  search }
    ]
  });

  if (!alllistings.length) {
    req.flash("errors", `No listings found for "${query}"`);
    return res.redirect("/listing");
  }

  res.render("listings/index.ejs", { alllistings });
};
