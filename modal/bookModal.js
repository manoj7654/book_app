
const mongoose=require("mongoose");

const bookSchema=mongoose.Schema({
    title:{type:String,require:true},
    author:{type:String,require:true},
    publication_year:{type:String,require:true},
    userId: {type: "ObjectId",ref: 'users',required: true}
})

const BookModal=mongoose.model("books",bookSchema);
module.exports={BookModal}