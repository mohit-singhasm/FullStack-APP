import Service from "../models/service-model.js"

const service = async (req,res)=> {
    try {
        const servicesAll = await Service.find({})
    // console.log(servicesAll)
    if(!servicesAll){
        res.status(404).json({msg: "No document is found"})
        return;
    }
    return res.status(200).json({servicesAll})
    } catch (error) {
        console.log(`service ${error}`)
    }


}

export {service};