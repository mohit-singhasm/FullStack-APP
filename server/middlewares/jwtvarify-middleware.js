import jwt from 'jsonwebtoken'
import User from '../models/user-model.js'

const jwtvarifyMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim();
        // if (!token) {
        //     return res.status(401).json({ msg: "Unauthorized Token, Token not provided" })
        // }


        const isVarified = await jwt.verify(token, process.env.JWT_SECRET_KEY)

        const userData = await User.findOne({ email: isVarified.email }, { password: 0 })
        // console.log(userData)

        req.user = userData;
        req.token = token
        req.id = userData._id

        next()
    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized Token, Token not provided" })
    }
}

export default jwtvarifyMiddleware