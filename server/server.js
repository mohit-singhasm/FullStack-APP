import express from "express";
import auth_router from "./router/auth-router.js";
import contact_router from "./router/contact-router.js";
import service_routher from "./router/service-router.js"
import admin_router from './router/admin-router.js'
import connectDb from "./utls/db.js";
import dotenv from 'dotenv/config.js'
import errorMiddleware from "./middlewares/error-middleware.js";
import cors from 'cors'

// dotenv.config()

const Port = process.env.PORT
// const Port = 300
console.log(Port)
const app = express();

const corsOptions = {
    origin:"http://localhost:5173",
    methods: "GET, POST, PATCH, HEAD, DELETE, PUT",
    credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/auth', auth_router)
app.use('/api/form', contact_router)
app.use('/api/data', service_routher)
app.use('/api/admin', admin_router)

app.use(errorMiddleware)

connectDb().then(() => {
    app.listen(Port, () => {
        console.log(`Your port is running on ${Port}!!`)
    })
})

// app.listen(Port, () => {
//     console.log(`Your port is running on ${Port}!!`)
// })
