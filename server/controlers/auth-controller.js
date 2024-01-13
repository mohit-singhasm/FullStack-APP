import User from '../models/user-model.js'
// import bcrypt from 'bcrypt'






// *-----------------
// Home page logic
// *-----------------

const home = async (req, res) => {
    try {
        res.status(200).send('Welcome to your backend bhai!')
    } catch (error) {
        console.log(error);
    }
}


// *-----------------
// Registeration logic
// *-----------------

const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body

        const userExist = await User.findOne({ email })

        let userCreated

        if (userExist) {
            // console.log(userExist)
            // console.log('user hai bhai')
            userCreated = userExist
            return res.status(404).json({ message: "User Already Exist" })
        } else {
            userCreated = await User.create({ username, email, phone, password })
        }

        return res.status(200).json({ message: "registeration succesfull!!", token: await userCreated.generateToken(), id: userCreated._id.toString() })
    } catch (error) {
        console.log(error);
    }
}

// *-----------------
// Login logic
// *-----------------

const login = async (req, res) => {

    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email })
        // console.log(userExist)
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isPasswordValid = await userExist.comparePass(password)
        if (isPasswordValid) {
            // console.log('hello love')
            res.status(200).json({ message: "login succesfull!!", token: await userExist.generateToken(), id: userExist._id.toString() })
        } else {
            res.status(401).json({ message: "Invalid Id or Password" })
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid Id or Password" })
    }
}


// *-----------------------------------
// To send user data - User info logic
// *-----------------------------------

const user = async (req, res) => {
    try {
        const userData = req.user;
        // console.log(userData)
        return res.status(200).json({ userData })
    } catch (error) {
        res.status(401).json({ message: "Invalid token" })
    }
}


export { home, register, login, user }