const mongoose= require('mongoose')
const mongoURI= 'mongodb+srv://dakshagarwal:27June2002@cluster0.lcljta6.mongodb.net/test'
const connectToMongo=async ()=>{
await mongoose.connect(mongoURI)
console.log("Connected to mongoose successfully");
}

module.exports=connectToMongo