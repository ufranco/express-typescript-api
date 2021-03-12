import { Router } from "express";
import { default as userAuth } from '../middleware/authHandler';

const routes = Router();

import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks";

routes.route('/').get(getTasks).post(createTask);

routes.route('/:id').get(getTask).put(userAuth, updateTask).delete(userAuth, deleteTask);

export default routes;
