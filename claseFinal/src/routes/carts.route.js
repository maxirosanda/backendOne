import { Router } from "express";
import { getAllCarts, updateCart, deleteProductFromCart, deleteCart } from "../controllers/carts.controller.js";

const router = Router();

router.get("/", getAllCarts);

router.patch("/:uid/:pid/:quantity", updateCart);

router.delete("/:uid/:pid", deleteProductFromCart);

router.delete("/:uid", deleteCart);

export default router;