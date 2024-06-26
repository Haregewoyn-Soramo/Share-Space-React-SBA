const express = require('express')
const {createProduct, getProducts, getSingleProduct, deleteProduct, updateProduct} = require('../controllers/productControllers')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()




router.get('/', getProducts)

router.use(requireAuth)

router.get('/:id', getSingleProduct)

router.post('/', createProduct)

router.patch('/:id', updateProduct)

router.delete('/:id', deleteProduct)

module.exports = router