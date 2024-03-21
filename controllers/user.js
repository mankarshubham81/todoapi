import { ToDoUser } from './../models/user.js';
import bcrypt from 'bcrypt';
// import jwt from "jsonwebtoken"
import { sendCookie } from '../utils/features.js';

export const getAllUsers = async (req,res) => {
    
    const users = await ToDoUser.find()
    
    res.json({
        success: true,
        users: users,
    })
};

// register = createUser 
export const createUser = async (req,res, next) => {
    const {name, email, password} = req.body

    let user = await ToDoUser.findOne({email});

    if(user) {
        return res.status(404).json({
            success: false,
            message: "User Already Exist",
        })
    }

    const hashedPassword = await bcrypt.hash(password, 11)

    user = await ToDoUser.create({
        name,
        email,
        password: hashedPassword
    })

    sendCookie(user, res, "Rigestered Succesfully", 201);
    
}

export const login = async (req,res) => {
    const { email, password} = req.body;

    let user = await ToDoUser.findOne({email}).select("+password");


    // await ToDoUser.create({
    //     email,
    //     password
    // })

   if(!user){ 
        return res.status(404).json({
            success: false,
            message: "Invalid Email or Password",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(404).json({
            success: false,
            message: "Invalid Email or Password",
        });
    }

    sendCookie(user, res, `Welcome Back, ${user.name}`, 200);


}

export const logout = async (req,res) => {

    res.status(200).cookie("token", "", {
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: `Hey ${req.user},You have Logout Succesfully`,
    }) 

}


export const getUserDetails = async (req,res) => {
    
    const { id } = req.params;
    const users = await ToDoUser.findById(id);
    
    res.json({
        success: true,
        users: "Just special",
    })
}

export const getMyProfile = async (req,res) => {
    
    const { id } = req.params;

    
    // console.log("token91", token);

    
    res.json({
        success: true,
        user: req.user,
    })
}

// export const specialFunction = async (req,res) => {
    
    
//     res.json({
//         success: true,
//         users: "Just special",
//     })
// }