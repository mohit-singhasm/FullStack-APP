import Contact from "../models/contactForm-model.js"
import User from "../models/user-model.js"



// *-------------------------
// Getting All Users logic
// *-------------------------
const getAllUsers = async (req, res) => {

    const allUsers = await User.find({}, { password: 0 })
    try {
        if (!allUsers || allUsers.length === 0) {
            return res.status(404).json({ message: "No Users Found" })
        }

        return res.status(200).json({ allUsers })
    } catch (error) {
        console.log(error)
    }
}

// *-------------------------
// Getting Single Users logic
// *-------------------------
const getSingleUser = async (req, res) => {

    const id = req.params.id

    try {
        const user = await User.findOne({ _id: id }, { password: 0 })
        if (!user) {
            return res.status(404).json({ message: "No User Found" })
        }

        return res.status(200).json({ user })
    } catch (error) {
        console.log(error)
    }
}

// *-------------------------
// Delete User logic
// *-------------------------

const deleteUser = async (req, res) => {
    try {
        let id = req.params.id
        const deletedUser = await User.deleteOne({ _id: id })
        if (!deletedUser) {
            return res.status(404).json({ message: "No Users Found" })
        }
        // console.log(id, 'User deleted succssfully')
        return res.status(200).json({ message: "User is deleted successfully" })
    } catch (error) {
        console.log(error)
    }
}

// *-------------------------
// Delete User logic
// *-------------------------

const deleteContact = async (req, res) => {
    try {
        let id = req.params.id
        const deletedContact = await Contact.deleteOne({ _id: id })
        if (!deletedContact) {
            return res.status(404).json({ message: "No Users Found" })
        }
        // console.log(id, 'User deleted succssfully')
        return res.status(200).json({ message: "Contact is deleted successfully" })
    } catch (error) {
        console.log(error)
    }
}

// *-------------------------
// Update Single User logic
// *-------------------------

const updateSingleUser = async (req, res) => {
    const id = req.params.id
    const updateduser = req.body
    try {
        // console.log(updateduser)
        const updatedData = await User.updateOne({ _id: id }, { $set: updateduser })
        if(!updatedData){
            return res.status(404).json({ message: "No Users Found" })
        }
        return res.status(201).json({ updatedData })
    } catch (error) {
        console.log(error)
    }
}

// *-------------------------
// Getting All Contacts logic
// *-------------------------

const getAllContacts = async (req, res) => {

    const allContacts = await Contact.find({})

    try {
        if (!allContacts || allContacts.length === 0) {
            return res.status(404).json({ message: "No Contacts Found" })
        }

        return res.status(200).json({ allContacts })
    } catch (error) {
        console.log(error)
    }
}












export { getAllUsers, getAllContacts, deleteUser, getSingleUser, updateSingleUser, deleteContact }