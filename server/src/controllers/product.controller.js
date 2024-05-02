import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import Product from '../models/product.model.js';

export const createProduct = asyncHandler(async (req, res, next) => {
    const {name, description, size, price, category, stock, mainImage, otherImage, color} = req.body

    if(!name || !description || !size || !price || !category || !mainImage || !color){
        return next(new ApiError('All field are required', 400))
    }

    const product = await Product.create({
        name, description, size, price, category, stock, mainImage, otherImage, color
    })

    if(!product){
        return next(new ApiError('Product could not created, please try again', 500))
    }

    res.status(200).json(new ApiResponse(200, 'ok', product))

});

export const updateProduct = asyncHandler(async(req, res, next) => {
    const {id} = req.params
    const {name, description, size, price, category, stock, mainImage, otherImage, color} = req.body

    const product = await Product.findById(id)

    if(!product){
        return next(new ApiError('Product could not created, please try again', 500))
    }

    if(name){
        product.name = name
    }
    if(description){
        product.description = description
    }
    if(size){
        product.size = size
    }
    if(price){
        product.price = price
    }
    if(category){
        product.category = category
    }
    if(stock){
        product.stock = stock
    }
    if(mainImage){
        product.mainImage = mainImage
    }
    if(otherImage){
        product.otherImage = otherImage
    }
    if(color){
        product.color = color
    }

    await product.save()

    res.status(200).json(new ApiResponse(200, 'ok', product))


})

export const removeProduct = asyncHandler(async(req, res, next) => {
    const {id} = req.params
    const product = await Product.findById(id)

    if(!product){
        return next(new ApiError('Product could not created, please try again', 500))
    }

    await Product.findByIdAndDelete(id)

    res.status(200).json(new ApiResponse(200, 'Product deleted successfully'))

})

export const addProduct = asyncHandler(async(req, res, next) => {

})

