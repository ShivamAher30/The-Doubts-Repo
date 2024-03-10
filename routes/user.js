const { Router } = require("express")
const User = require("../models/user.js")

const router = Router();


router.get("/signin", (req, res) => {
  res.render('signin')
// 


})
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const token = await User.matchPassword(email, password)
    console.log(token)
    return res.cookie("token", token).redirect("/")

  } catch (error) {
    return res.render("signin",{error:"Incorrect Email or Password"})

  }

})
router.get("/signup", (req, res) => {
  return res.render('signup')
})

router.post("/signup", async (req, res) => {
  const { fullname, email, password,role } = req.body;
  console.log(fullname, email, password)
  await User.create({
    fullname,
    email,
    password,
    role,

  });
  return res.render('signin')
});
router.get("/logout",(req,res)=>{
  res.clearCookie("token").redirect("/");
})
module.exports = router;


