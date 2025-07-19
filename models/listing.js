const mongoose = require("mongoose");
const review = require("./review");
const { ref } = require("joi");
const schema = mongoose.Schema;

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
   url:String,
   filename:String
  },
  price: {
    type: Number,
    required: true
  },
   location: String,
  country: String,
  review:[{
  type:schema.Types.ObjectId,
  ref:"review",
  }],
  owner:{
    type:schema.Types.ObjectId,
    ref:"user"
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      // required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  category: {
  type: String,
  enum: ["Trending", "Iconic City", "Castle", "Mountains", "Amazing Pools", "Farms", "Snow Flake", "Eye Slash"],
  required: true
}

});

listSchema.post("findOneAndDelete",async(listing)=>{
if(listing.review.length){
await review.deleteMany({_id:{$in:listing.review}})
}  

})

const listing = mongoose.model("listing", listSchema);
module.exports = listing;