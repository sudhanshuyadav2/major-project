
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const passportlocalmongoose=require("passport-local-mongoose");

const userschema = new schema({
 email:{

    type:String,
    require:true
 }

})

userschema.plugin(passportlocalmongoose);
module.exports = mongoose.model('user', userschema);