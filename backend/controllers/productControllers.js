    const Products = require('../models/productsModels')
    const mongoose = require('mongoose')

    //get all products
    const getProducts = async(req, res) =>{
      // const user_id = req.user._id
      const products = await Products.find({}).sort({createdAt: -1})
      res.status(200).json(products)
    }

    //get single product
    const getSingleProduct = async(req, res) =>{
      const {id} = req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such ID'})
      }
      const product = await Products.findById(id)

      if(!product){
        return res.status(404).json({error: 'no such product'})
      }
      res.status(200).json(product)
    }



    //create a product
    const createProduct = async(req, res) => {
      const {name, description, price,category, image} = req.body

      let emptyFields = []

      if(!name){
          emptyFields.push('name')
      }
      if(!description){
        emptyFields.push('description')
      }
      if(!price){
      emptyFields.push('price')
      }
      if(!category){
      emptyFields.push('category')
      }
      if(!image){
      emptyFields.push('image')
      }
    if(emptyFields.length > 0){
      return res.status(400).json({error: 'please fill in all the fields', emptyFields})
    }
      try {
        const user_id = req.user._id
        const newProduct = await Products.create({name, description, price,category, image, user_id})
        res.status(200).json(newProduct)
      } catch (error) {
        res.status(400).json({error: "can not create new product"})
      }
    }


    //delete a product
    const deleteProduct = async(req, res)=>{
      const {id} = req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such ID'})
      }
      const deletedItem = await Products.findByIdAndDelete(id)
      if(!deleteProduct){
        return res.status(404).json({error: 'no such item'})
      }
      res.status(200).json(deleteProduct)
    }


    //update workout
    const updateProduct = async(req, res) =>{
      const {id} = req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such ID'})
      }
      const update = await Products.findByIdAndUpdate(id, {...req.body })
      if(!update){
        return res.status(404).json({error: 'no such item'})
      }
      res.status(200).json(update)
    }



    module.exports = {createProduct, getProducts, getSingleProduct, deleteProduct, updateProduct}