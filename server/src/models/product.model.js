import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [3, 'Tittle must be atleast 8 charecters'],
        maxLength: [59, 'Tittle shuld be less than 60 charecter']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [5, 'Description must be atleast 8 charecters'],
        maxLength: [199, 'Description shuld be less than 200 charecter']
    },
    size: {
        type: String,
        required: [true, 'Product size is requird']
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    stock: {
        type: String
    },
    mainImage: {
        type: String,
        required: [true, 'Main Image is required']
    },
    otherImage: {
        type: []
    },
    color: {
        type: String
    }

}, {
    timestamps: true
})

const Product = model('Product', productSchema)

export default Product