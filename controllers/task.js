
import CustomErrorHandler from '../middlewares/error.js';
import { Task } from './../models/task.js';

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

    // simple way to save task
    await Task.create({
        title,
        description,
        user: req.user,
    
    });


    // complex way to save task
    // const task = await Task({title});
    // await task.save();
    res.status(201).json({
        success: true,
        message: "Task Added Succesfully"
    });
    } catch (error) {
       next(error);
        // console.log(`new Task error: ${error}`);
    }

}

export const getMytask  = async (req, res, next) => {
    try {
        const userId = req.user._id;

    const tasks = await Task.find({user: userId});

    res.status(200).json({
        success: true,
        tasks
    });
    } catch (error) {
       next(error);
    }
} 

export const updateMytask  = async (req, res, next) => {

    try {
        const {id} = req.params;
    const task = await Task.findById(id);
    // if(!task){
    //     return res.status(404).json({
    //         success: false,
    //         message: "Task Not Found i.e. nvalid Id"
    //     });
    // }
    // OR 
    if(!task) return next(new CustomErrorHandler("Task Not Found i.e. nvalid Id", 404));
    // if(!task) return next(new Error("Task Not Found i.e. nvalid Id"));
    task.isCompleted = !task.isCompleted;
    await task.save()

    res.status(200).json({
        success: true,
        message: "Task Updated"
    });
    } catch (error) {
       next(error);
    }
}

export const deleteMytask  = async (req, res, next) => {
    try {
        const {id} = req.params;
    const task = await Task.findById(id);
    // if(!task){
    //     return res.status(404).json({
    //         success: false,
    //         message: "Task Not Found i.e. nvalid Id"
    //     });
    // }
    // OR 
    if(!task) return next(new Error("Task Not Found i.e. nvalid Id"));

    await task.deleteOne()


    // const tasks = await Task.deleteOne({ _id: id })

    res.status(200).json({
        success: true,
        message: "Task Deleted"
    });
    } catch (error) {
       next(error);
    }
}