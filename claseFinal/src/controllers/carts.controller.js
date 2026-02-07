import Cart from "../models/cart.model.js";

export const getAllCarts = async (req, res) => {
    const carts = await Cart.find();
    res.json(carts);
}

export const updateCart = async (req, res) => {

    const {uid, pid,quantity} = req.params;

    if(!uid || !pid || !quantity){
        return res.status(400).json({message: "All fields are required"});
    }

    if(quantity <= 0){
        return res.status(400).json({message: "Quantity must be positive"});
    }

    const userExists = await User.findById(uid);
    if(!userExists){
        return res.status(400).json({message: "User does not exist"});
    }
    const productExists = await Product.findOne({_id: pid, stock: {$gte: quantity}});
    if(!productExists){
        return res.status(400).json({message: "Product does not exist or insufficient stock"});
    }
    const result = await Cart.updateOne(
    { user: uid, "products.product": pid },
    { $inc: { "products.$.quantity": quantity } }
    );

    if(result.modifiedCount === 0){
        const cart = await Cart.updateOne({user: uid}, {$push: {products: {product: pid, quantity: quantity}}}, { upsert: true });
        res.json(cart);
    }
    await Product.updateOne({_id: pid}, {$inc: {stock: -quantity}});
    res.json(result);
}

export const deleteProductFromCart = async (req, res) => {
    const {uid, pid} = req.params;
    if(!uid || !pid){
        return res.status(400).json({message: "All fields are required"});
    }
    const userExists = await User.findById(uid);
    if(!userExists){
        return res.status(400).json({message: "User does not exist"});
    }
    const productExists = await Product.findById(pid);
    if(!productExists){
        return res.status(400).json({message: "Product does not exist"});
    }
    const result = await Cart.updateOne({user: uid}, {$pull: {products: {product: pid}}});
    res.json(result);
}

export const deleteCart = async (req, res) => {
    const {uid} = req.params;
    if(!uid){
        return res.status(400).json({message: "User ID is required"});
    }
    const userExists = await User.findById(uid);
    if(!userExists){
        return res.status(400).json({message: "User does not exist"});
    }
    const result = await Cart.deleteOne({user: uid});
    res.json(result);
}