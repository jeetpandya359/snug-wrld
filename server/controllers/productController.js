import Product from '../models/Product.js'
import { assertDatabase } from '../utils/assertDatabase.js'

export async function getProducts(req, res, next) {
  try {
    if (!assertDatabase(res)) return

    const products = await Product.find().sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    next(error)
  }
}

export async function getProductBySlug(req, res, next) {
  try {
    if (!assertDatabase(res)) return

    const product = await Product.findOne({ slug: req.params.slug })

    if (!product) {
      res.status(404).json({ message: 'Product not found' })
      return
    }

    res.json(product)
  } catch (error) {
    next(error)
  }
}
