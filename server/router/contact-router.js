import { Router } from "express";
import { contact } from "../controlers/contact-controller.js"

const contact_router = Router();

contact_router.route('/contact').post(contact)


export default contact_router;




