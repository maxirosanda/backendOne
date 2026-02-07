import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

export const createUser = async (req, res) => {
    const {firstName, lastName, email} = req.body;
    if(!firstName || !lastName || !email){
        return res.status(400).json({message: "All fields are required"});
    }
    const user = await User.create({firstName, lastName, email});
    res.json(user);
}