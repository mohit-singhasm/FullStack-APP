import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
})

// Securing the password with bcrypt with pre middleware
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        next()
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error)
    }
})

// Comparing the password

userSchema.methods.comparePass = async function(password) {
   return bcrypt.compare(password, this.password)
// return false
}

// Jason web Token
userSchema.methods.generateToken = async function() {
    return jwt.sign({
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d'
    })
};

const User = new model("User", userSchema)
export default User
