const { Schema, model } = require("mongoose")
const { CreateHmac, randomBytes, createHmac } = require("crypto")
const { CreateUsertoken } = require("../services/authentication");
const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        profileImageURL: {
            type: String,
            default: "uploads/9440461.jpg",
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
    },
    { timestamps: true,strictPopulate:false}
);

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});
userSchema.static('matchPassword', async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) return false;
    const salt = user.salt;



    const userhashedpassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
    if (userhashedpassword !== user.password) {
        throw new Error('Incorrect Password');

    }
    const token = CreateUsertoken(user);
    
    return token;



});

const User = model("user", userSchema)
module.exports = User;
