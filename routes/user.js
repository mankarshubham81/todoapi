import express  from "express";
import { createUser, getAllUsers, getUserDetails} from "../controllers/user.js";
import { ToDoUser } from "../models/user.js"
const router = express.Router();


router.get("/all", getAllUsers);

// router.get("/userid/special", specialFunction);

router.route("/userid/:id").get(getUserDetails);

router.post("/new", createUser);
router.post("/login", createUser);

export default router;