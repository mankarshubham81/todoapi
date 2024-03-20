import { ToDoUser } from './../models/user.js';

export const getAllUsers = async (req,res) => {
    
    const users = await ToDoUser.find()
    
    res.json({
        success: true,
        users: users,
    })
};

export const login = async (req,res, next) => {
    const {name, email, password} = req.body

    await ToDoUser.create({
        name,
        email,
        password
    })

    res.status(201).json({
        success: true,
        message: "Rigestered Succesfully",
    })
}

// register = createUser 
export const createUser = async (req,res) => {
    const {name, email, password} = req.body

    await ToDoUser.create({
        name,
        email,
        password
    })

    res.status(201).json({
        success: true,
        message: "Rigestered Succesfully",
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

// export const specialFunction = async (req,res) => {
    
    
//     res.json({
//         success: true,
//         users: "Just special",
//     })
// }