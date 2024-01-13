import {Router} from 'express'
import {home, register, login, user} from '../controlers/auth-controller.js';
import validate from '../middlewares/validate-middleware.js';
import {signupSchema, loginSchema} from "../validators/auth-validator.js"
import jwtvarifyMiddleware from '../middlewares/jwtvarify-middleware.js';

const router = Router();

router.route('/').get(home);
router.route('/register').post(validate(signupSchema), register);
router.route('/login').post(validate(loginSchema), login);
router.route('/user').get(jwtvarifyMiddleware, user)


export default router;