const mongoose= require("mongoose");
const initdata =require("./data.js");

const listing =require("../models/listing.js");




async function main() {

await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    
};
main().then((res)=>console.log(`connection succesful to db`))
.catch((err)=>console.log(err))


const initDB=async ()=>{
  await listing.deleteMany({});
    console.log("old data clear");
   initdata.data = initdata.data.map((obj) => ({...obj,owner:'686fe02b91fa0fb245c117b3'}))
    await listing.insertMany(initdata.data);
    console.log('new data was inalished');


console.log(`data was saved`);

}
initDB();