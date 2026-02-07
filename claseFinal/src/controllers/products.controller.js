import { Types } from "mongoose";
import Product from "../models/product.model.js";


export const getAllProducts = async (req, res) => {
    const products = await Product.find().populate("category")
    res.json(products);
}

export const getProductsByPriceAndStock = async (req, res) => {
    const products = await Product.find().sort({price: 1, stock: -1})
    res.json(products);
}

export const getProductsPaginate = async (req, res) => {
    const {page,limit,sort} = req.params;
    if(isNaN(page)){
        return res.status(400).json({message: "Page must be a number"});
    }

    if(isNaN(limit)){
        return res.status(400).json({message: "Limit must be a number"});
    }

    if(sort !== "true" && sort !== "false"){
        return res.status(400).json({message: "Sort must be a boolean"});
    }
    const products = await Product.paginate({}, {
        limit: Number(limit) || 10, 
        page: Number(page) || 1,
        sort: sort ? {price: 1, stock: -1} : null,
        populate: "category"
    })
    res.json(products);
}

export const getProductsAggregate = async (req, res) => {
    const products = await Product.aggregate([
       { $group:{
            _id:null,
            totalStock: {$sum: "$stock"},
            totalProducts: {$sum: 1},
            avgPrice: {$avg: "$price"},
            maxPrice: {$max: "$price"},
            minPrice: {$min: "$price"}
        }}
    ])
    res.json(products);
}

export const getProductsAggregatePaginate = async (req, res) => {
    const {page} = req.params;
    if(isNaN(page)){
        return res.status(400).json({message: "Page must be a number"});
    }
    const filter = Product.aggregate([

       { $match: { price: { $gt: 30 } } },
       { $sort: {price:-1}}
 
    ])

    const products = await Product.aggregatePaginate(filter, {
        limit: 10, 
        page: Number(page) || 1,
        populate: "category"
    })


    res.json(products);
}

export const createProduct = async (req, res) => {
    const {name, price, stock, description, category} = req.body;
    if(!name || !price || !stock || !description || !category){
        return res.status(400).json({message: "All fields are required"});
    }
    if(category !== Types.ObjectId){
        return res.status(400).json({message: "Category must be an ObjectId"});
    }
    if(price < 0 || stock < 0){
        return res.status(400).json({message: "Price and stock must be positive"});
    }
    const categoryExists = await Category.findById(category);
    if(!categoryExists){
        return res.status(400).json({message: "Category does not exist"});
    }
    const product = await Product.create({name, price, stock, description, category});
    res.json(product);
}
