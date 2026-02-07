import { Router } from "express"; 
import { getAllProducts,
    getProductsByPriceAndStock, 
    getProductsPaginate, 
    getProductsAggregate, 
    getProductsAggregatePaginate,
    createProduct
 } from "../controllers/products.controller.js";

const router = Router();

router.get("/", getAllProducts);

router.get('/find-by-price-stock',getProductsByPriceAndStock)

router.get('/paginate/:page/:limit/:sort', getProductsPaginate)

router.get('/aggregate', getProductsAggregate)

router.get('/aggregate-paginate/:page', getProductsAggregatePaginate)

router.post("/", createProduct);

export default router;
