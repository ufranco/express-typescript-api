import { Router } from "express";
import { default as userAuth } from '../middleware/authHandler';

const routes = Router();

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users";

routes.route('/').get(getUsers);

routes.route('/:id').get(getUser).put(userAuth, updateUser).delete(userAuth, deleteUser);

export default routes;
