if(process.env.NODE_ENV !="production"){
require('dotenv').config()
}
const express=require("express");
const app = express();
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));
const expresserr = require("./extra/expresserr.js");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require("connect-mongo");
const passport = require("passport");
const localstrategy = require("passport-local")
const user =require("./models/user.js")
const flash = require('connect-flash');


///express router
const listingRouter = require("./routes/listing.js");
const reviewsrouter= require("./routes/review.js");
const userouter=require("./routes/user.js");
const { error } = require('console');

const dburl=process.env.atlas_db;

async function main() {
await mongoose.connect(dburl);
    
};
main().then((res)=>console.log(`connection succesful to db`))
.catch((err)=>console.log(err))




const store = MongoStore.create({
  mongoUrl: dburl, 
  crypto: {
    secret: process.env.secret
  },
  touchAfter: 24 * 3600
});


store.on("error", (err) => {
  console.error("Session store error:", err);
});
//express session
const sessionoption={secret:process.env.secret,
store:store,
 resave:false,
saveUninitialized:true,
cookie:{
expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
maxAge: 7 * 24 * 60 * 60 * 1000,
httpOnly:true,

}
}
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Session and Passport config
app.use(session(sessionoption));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());






// Flash messages and locals
app.use(flash());
app.use((req, res, next) => {
  res.locals.sucess = req.flash("sucess");
  res.locals.errors = req.flash("errors");
  res.locals.currentUser = req.user;
  next();
});


//  THEN Mount your routers
app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewsrouter);
app.use("/", userouter);





app.all(/.*/, (req, res, next) => {
  next(new expresserr(404, "err was send from route"));
});




////express error handling route

app.use((err,req,res,next)=>{
  let {statusCode=404,message="page not found"}=err;

  // res.status(statusCode).send(message);
   res.status(statusCode).render("err.ejs",{message});
})

app.listen(8080,()=>{
console.log(`app is listnung:${8080}`)

})

