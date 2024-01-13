import { z } from 'zod'

//creating object scheama
const loginSchema = z.object({

    email: z
    .string({ required_error: "email is required" })
    .trim().email({ message: "Invalid Email Address" })
    .min(3, { message: 'email Should be atleast 3 charaters' })
    .max(255, { message: "email should not be more than 255 chars" }),

    password: z
    .string({ required_error: "password is required" })
    .trim().min(7, { message: 'password Should be atleast 7 charaters' })
    .max(1024, { message: "password should not be more than 1024 chars" }),
})

const signupSchema = loginSchema.extend({
    username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: 'Name Should be atleast 3 charaters' })
    .max(255, { message: "Name should not be more than 255 chars" }),
    phone: z
    .string({ required_error: "phone is required" })
    .trim()
    .min(10, { message: 'phone Should be atleast 10 charaters' })
    .max(20, { message: "phone should not be more than 255 chars" }),
})




export {signupSchema, loginSchema};