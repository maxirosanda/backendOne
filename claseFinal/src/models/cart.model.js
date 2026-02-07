import mongoose,{Types} from "mongoose";

const cartSchema = new mongoose.Schema({
    user:{
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    products:[
        {
            product: {
                type: Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: Number
        }
    ]
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;