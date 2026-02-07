import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productsRouter from "./routes/products.route.js";
import categoriesRouter from "./routes/categories.route.js";
import cartsRouter from "./routes/carts.route.js";
import usersRouter from "./routes/users.route.js";

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});