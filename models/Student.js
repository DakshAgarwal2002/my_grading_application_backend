const mongoose=require('mongoose')
const { Schema } = mongoose;

const StudentSchema = new Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    mentor:{
        type:String,
        default:"None"
    },
    Ideation:{
        type:String
    },
    Execution:{
        type:String
    },
    isChecked:{
        type:String,
        default:"No"
    },
    Viva:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
});
const StudentData=mongoose.model('studentdata',StudentSchema)
module.exports=StudentData;