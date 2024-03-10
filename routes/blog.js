const {Router} = require("express")
const Blog = require("../models/blog.js")
const Comment = require("../models/comments.js")
const multer  = require("multer")
const path = require("path")
const { log } = require("console")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`
      cb(null,filename)
    }
  })
  
const upload = multer({ storage: storage })
const router = Router();
router.get("/add-blog",(req,res)=>{
  console.log(`this is req.user ${req.user}`)

    res.render("./partials/addblog",{
        user:req.user
    })

})
router.get("/:id",async (req,res)=>{
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const Allcomments = await Comment.find({blogId:req.params.id}).populate("createdBy")
  console.log(blog.CoverImageURL)
  res.render("./partials/blog",{
    blog:blog,
    comment:Allcomments
  })


})
router.get("/subject/:id",async(req,res)=>{
  const Allblogs = await Blog.find({subject:req.params.id}).sort({like:-1})
    
    res.render("index",{
        user:req.user,
        blog:Allblogs

    })


})


router.post("/comment/:id",upload.single("filename"),async(req,res)=>{

  
  {const url = path.resolve(`./uploads/${req.file.filename}`)}
  const url = "none"
  console.log(url);

    
  const pointercomment = await Comment.create(
    {
      content:req.body.comment,
      blogId:req.params.id,
      createdBy:req.user._id,
      CommentURL:`/uploads/${req.file.filename}`,

    }
  )
  return res.redirect(`/blog/${req.params.id}`)
})
router.post("/",upload.single("filename"),async (req,res)=>{
    const {title,blogbody,selectedOption} = req.body;
    

    const url = path.resolve(`./uploads/${req.file.filename}`)
    console.log(url);
    

    await Blog.create(
        {
            title,
            blogbody,
            CoverImageURL:`/uploads/${req.file.filename}`,
            author:req.user._id,
            subject:selectedOption,
        }
    )
    res.redirect("/");

})
router.post("/like/:id",async(req,res)=>{
  let ptr = await Blog.findById(req.params.id)
  console.log("thisiptr",ptr)
  ptr.like++;
  ptr.save()
  res.redirect("/")
  console.log("thisiptr",ptr)

})
router.post("/dislike/:id",async(req,res)=>{
  let ptr = await Blog.findById(req.params.id)
  console.log("thisiptr",ptr)
  ptr.like--;
  ptr.save()
  res.redirect("/")
  console.log("thisiptr",ptr)

})
module.exports = router;
