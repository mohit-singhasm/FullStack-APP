import {Router} from 'express'
import { getAllContacts, getAllUsers, deleteUser, getSingleUser, updateSingleUser, deleteContact } from '../controlers/admin-controller.js';
import jwtvarifyMiddleware from '../middlewares/jwtvarify-middleware.js';
import admin_middleware from '../middlewares/admin-middleware.js';

const Admin_Router = Router();

Admin_Router.route('/users').get(jwtvarifyMiddleware, admin_middleware, getAllUsers);
Admin_Router.route('/contacts').get(jwtvarifyMiddleware,admin_middleware, getAllContacts);
Admin_Router.route('/users/:id').get(jwtvarifyMiddleware,admin_middleware, getSingleUser);
Admin_Router.route('/users/update/:id').patch(jwtvarifyMiddleware,admin_middleware, updateSingleUser);
Admin_Router.route('/users/delete/:id').delete(jwtvarifyMiddleware,admin_middleware, deleteUser);
Admin_Router.route('/contacts/delete/:id').delete(jwtvarifyMiddleware,admin_middleware, deleteContact);

export default Admin_Router;