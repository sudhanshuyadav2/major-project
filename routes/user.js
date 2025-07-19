const express=require("express");
const router = express.Router();
const wrapasync = require("../extra/wrapasync");
const user=require("../models/user");
const passport = require("passport");
const {isoriginalurl}=require("../middlewer.js")
const usercontoroller=require("../controller/user.js")



////creting signup raute
router
.route("/signup")
.get(usercontoroller.signuprender)
.post(wrapasync(usercontoroller.signup ));

///creating login raute

router
.route("/login")
.get(usercontoroller.loginrender)
.post(
  isoriginalurl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
   usercontoroller.login
);

///connecting raute req.isAuthentication() method  it was eritr in middlewere.js
router.get("/logout",
  usercontoroller.logout );

module.exports = router;
