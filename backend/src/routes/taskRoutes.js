import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  bulkUpdateStatus
} from "../controller/taskController.js"
import { validateTask } from "../middleware/validateRequest.js";

const router = express.Router();

// Task routes
router.route('/')
  .get(getTasks)
  .post(validateTask, createTask);

router.route('/bulk/status')
  .put(bulkUpdateStatus);

router.route('/:id')
  .get(getTask)
  .put(validateTask, updateTask)
  .delete(deleteTask);

export default router;