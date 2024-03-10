const express = require("express");
const PORT = 700;
const path = require("path")
const router = require("./routes/user")
const ejs = require("ejs")
const mongoose = require("mongoose")
const CookieParser = require("cookie-parser");
const routerblog = require("./routes/blog")
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog")
const Comments = require("./models/comments")

const app = express();
mongoose.connect("mongodb://localhost:27017/blogs").then(console.log("Mongodb Connected")).catch((err)=>{console.log(err)})
app.use(express.urlencoded({ extended: false }))
app.use(CookieParser())
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")))


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.get("/",async (req,res)=>{
    const Allblogs = await Blog.find({})
    
    res.render("index",{
        user:req.user,
        blog:Allblogs

    })
})

app.use("/user",router);
app.use("/blog",routerblog)



app.listen(PORT, (err) => {
    console.log(err)

})