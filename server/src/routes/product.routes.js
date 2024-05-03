import { Router } from "express";
import { createProduct, updateProduct, removeProduct, addProduct } from "../controllers/product.controller.js";

const router = Router()

router.route('/')
            .post(createProduct)

router.route('/:id')
            .put(updateProduct)
            .delete(removeProduct)
            .post(addProduct)

export default router