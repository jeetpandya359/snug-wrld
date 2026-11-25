import { Link, useParams } from 'react-router-dom'
import ProductDetail from '../components/product/ProductDetail'
import { getProductBySlug } from '../data/products'

export default function ProductDetails() {
  const { id } = useParams()
  const product = getProductBySlug(id)

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F1EADF] px-8 py-16 text-[#171513]">
        <h1 className="font-display text-4xl">Product unavailable</h1>
        <p className="mt-4 text-[#77716A]">This colour is not in the current catalogue.</p>
        <Link to="/shop" className="mt-6 inline-block text-[11px] tracking-[0.18em] uppercase underline">
          Back to shop
        </Link>
      </main>
    )
  }

  return <ProductDetail product={product} />
}
