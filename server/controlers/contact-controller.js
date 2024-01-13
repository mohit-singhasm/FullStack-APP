import Contact from "../models/contactForm-model.js"

// *-----------------
// Contact Form logic
// *-----------------

const contact = async (req,res) => {
    const {username, email, message} = req.body

    const contactExist = await Contact.findOne({email})
    console.log(contactExist)

    if(contactExist){
        console.log('contact hai bhai')
    }

    const contactCreated = await Contact.create({username, email, message})

    try {
        res.status(200).json({message: contactCreated, id: contactCreated._id.toString()})
    } catch (error) {
        console.log(err)
    }
}

export { contact }