import express  from "express";
import { deleteMytask, getMytask, newTask, updateMytask } from './../controllers/task.js';
import { isAuthenticated } from './../middlewares/auth.js';


const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/my", isAuthenticated, getMytask);


router.route("/:id").put(isAuthenticated, updateMytask).delete(isAuthenticated, deleteMytask)


export default router;