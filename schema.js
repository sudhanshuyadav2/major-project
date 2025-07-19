const joi = require('joi');

const joischema =joi.object({
listing:joi.object({
 title:joi.string().required(),
 description:joi.string().required(),
 location:joi.string().required(),
 country:joi.string().required(),
 image:joi.string().allow("",null),
 price:joi.number().required().min(0),
 category: joi.string().valid(
      "Trending",
      "Iconic City",
      "Castle",
      "Mountains",
      "Amazing Pools",
      "Farms",
      "Snow Flake",
      "Eye Slash"
    ).required(),
}).required()

})






const reviewschema= joi.object({
 review:joi.object({
  comment: joi.string().required(),

  rating:joi.number().required().min(1).max(5),
 

 }).required()

});



module.exports = { joischema, reviewschema };
