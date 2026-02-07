import Category from "../models/category.model.js";

export const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
}

export const createCategory = async (req, res) => {
    const {name, description} = req.body;
    if(!name || !description){
        return res.status(400).json({message: "All fields are required"});
    }
    const category = await Category.create({name, description});
    res.json(category);
}

