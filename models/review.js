const mongoose = require("mongoose");
const schema = mongoose.Schema;

const reviewschema = new schema({
  comment:String,
  rating:{
   type :Number,
   min:1,
   max:5
  },
  createdat:{
  type:Date,
  default:Date.now()
   },
outher:{
type:schema.Types.ObjectId,
ref:"user",
}

});

module.exports = mongoose.model("review",reviewschema);