const JWT = require("jsonwebtoken")
const secret = "JackieChan"
function CreateUsertoken(user)
{
    const payload = {
        _id : user._id,
        email:user.email,
        fullname:user.fullname,
        profileImageURl : user.profileImageURl,
        role:user.role
    };
    const token = JWT.sign(payload,secret);
    return token;
}
function ValidateToken(token)
{
    const payload = JWT.verify(token,secret);
    return payload;
}
module.exports = {CreateUsertoken,ValidateToken}