import mongoose, { Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        index:true
    },
    price: Number,
    stock: Number,
    description: String,
    category: {
        type: Types.ObjectId,
        ref: "Category"
    }
});

productSchema.pre('find', async function(){
    console.log("estoy en el pre find")
})

productSchema.index({price: 1, stock: -1})

productSchema.plugin(mongoosePaginate)

productSchema.plugin(mongooseAggregatePaginate)

const Product = mongoose.model("Product", productSchema);

export default Product;