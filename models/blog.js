const {Schema , model} = require("mongoose")
const blogschema = new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:false,
    },
    CoverImageURL:{
        type:String,
        required:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
    subject:{
        type:String,
        enum: ["DSA", "E.Maths","Physics","DSD"],
    }
},
    {timestamps:true,strictPopulate:false}
)
const blog = model("blogimages",blogschema)
module.exports = blog