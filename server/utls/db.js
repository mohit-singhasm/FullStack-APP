import mongoose from "mongoose";
import 'dotenv/config'

// const uri = 'mongodb+srv://360globalseo11:global321@cluster0.j4c5hzr.mongodb.net/mernAdmin?retryWrites=true&w=majority'

const uri = process.env.MONGO_URI
// console.log(uri)


const connectDb = async ()=>{
    try {
        await mongoose.connect(uri)
        console.log('connection successfull to the database')
    } catch (error) {
        console.error('database connection failed', error)
        process.exit(0)
    }
}


export default connectDb;