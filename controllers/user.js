import { ToDoUser } from './../models/user.js';
import bcrypt from 'bcrypt';
// import jwt from "jsonwebtoken"
import { sendCookie } from '../utils/features.js';
import CustomErrorHandler from '../middlewares/error.js'

export const getAllUsers = async (req,res) => {
    
    const users = await ToDoUser.find()
    
    res.json({
        success: true,
        users: users,
    })
};

// register = createUser 
export const createUser = async (req,res, next) => {
    try {
        const {name, email, password} = req.body

    let user = await ToDoUser.findOne({email});

    // if(user) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "User Already Exist",
    //     })
    // }
    if(user) return next(new CustomErrorHandler("User Already Exist", 404));


    const hashedPassword = await bcrypt.hash(password, 11)

    user = await ToDoUser.create({
        name,
        email,
        password: hashedPassword
    })

    sendCookie(user, res, "Rigestered Succesfully", 201);
    } catch (error) {
        next(error);
    }
    
}

export const login = async (req, res, next) => {
    try {
        const { email, password} = req.body;
    let user = await ToDoUser.findOne({email}).select("+password");


    // await ToDoUser.create({
    //     email,
    //     password
    // })

//    if(!user){ 
//         return res.status(404).json({
//             success: false,
//             message: "Invalid Email or Password",
//         });
//     }
    if(!user) return next(new CustomErrorHandler("Invalid Email or Password", 404));

    const isMatch = await bcrypt.compare(password, user.password);

    // if (!isMatch) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Invalid Email or Password",
    //     });
    // }
    if(!isMatch) return next(new CustomErrorHandler("Invalid Email or Password", 404));

    sendCookie(user, res, `Welcome Back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }


}

export const logout = async (req,res, next) => {

    try {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Developement" ? "lax" :  "none",
            secure: process.env.NODE_ENV === "Developement" ? false :  true,
        }).json({
            success: true,
            message: `You have Logout Succesfully`,
        });
    } catch (error) {
        next(error);
    }

}


export const getUserDetails = async (req,res, next) => {
    try {
        const { id } = req.params;
        const users = await ToDoUser.findById(id);
        
        res.json({
            success: true,
            users: "Just special",
        })
    } catch (error) {
        next(error);
    }
}

export const getMyProfile = async (req,res, next) => {
    
    try {
        const { id } = req.params;
        // console.log("token91", token);
        res.json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        next(error)
    }
}

// export const specialFunction = async (req,res) => {
    
    
//     res.json({
//         success: true,
//         users: "Just special",
//     })
// }