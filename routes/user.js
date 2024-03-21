import express  from "express";
import { createUser, getAllUsers, getUserDetails, login, getMyProfile, logout} from "../controllers/user.js";
import { ToDoUser } from "../models/user.js"
import { isAuthenticated } from './../middlewares/auth.js';
const router = express.Router();


router.get("/all", getAllUsers);

// router.get("/userid/special", specialFunction);

router.route("/userid/:id").get(getUserDetails);

router.post("/new", createUser);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);


export default router;