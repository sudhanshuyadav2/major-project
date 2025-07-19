const express=require("express");
const router = express.Router();
const wrapasync=require("../extra/wrapasync.js");
const {isloggedin,isowner,validatelisting}=require("../middlewer.js")
const listingcontroller=require("../controller/listing.js")
const multer  = require('multer')
const {storage} =require("../cloudconfig.js");
const upload = multer({ storage })


///index route//add route means create route
router
.route("/")
.get(listingcontroller.index)
.post(isloggedin,
  upload.single('listing[image]'),validatelisting,
   wrapasync(listingcontroller.createlisting),
     
 )

//new route//and after add route
router.get("/new",isloggedin,listingcontroller.new);

router.get("/search", listingcontroller.searchListings);  ////////search barrrrrr

////upadte edit form//delete route/////show route

router
.route("/:id")
.put (isloggedin,isowner,upload.single('listing[image]'),validatelisting,
   wrapasync(listingcontroller.editupdate))
.delete(isloggedin,isowner,
  wrapasync(listingcontroller.destroy))
.get( wrapasync(listingcontroller.showalisting))



//edit raute

router.get("/:id/edit",isloggedin,isowner,validatelisting,
  wrapasync(listingcontroller.editformrender))

 module.exports=router;


 
 router.get("/category/:cat",listingcontroller.categoryFilter);


