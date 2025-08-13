import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Star, Heart, ArrowLeft, Check, Truck, Shield, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useProductsStore, useWishlistStore } from '../store/useStore'

const formatINR = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

const Pill = ({ active, onClick, children }) => (
  <button onClick={onClick} className={`px-3 py-1 rounded-full border text-sm ${active? 'bg-purple-600 text-white border-purple-600' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}>{children}</button>
)

const ProductDetail = () => {
  const { id } = useParams()
  const products = useProductsStore((s) => s.products)
  const product = useMemo(() => products.find(p => String(p.id) === String(id)), [products, id])
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()

  const images = (product?.images && product.images.length ? product.images : (product?.image ? [product.image] : []))
  const [current, setCurrent] = useState(0)
  const next = () => setCurrent((i)=> images.length ? (i+1)%images.length : 0)
  const prev = () => setCurrent((i)=> images.length ? (i-1+images.length)%images.length : 0)

  const stopPhrases = useMemo(()=>[
    'main content','about this item','buying options','compare with similar items','videos','reviews',
    'search','home','orders','add to cart','show/hide shortcuts','keyboard shortcuts','cart','delivery options'
  ],[])
  const uniqueFeatures = useMemo(()=> {
    if (!Array.isArray(product?.features)) return []
    return Array.from(new Set(
      product.features
        .map(f=> (f||'').toString().replace(/\s+/g,' ').trim())
        .filter(Boolean)
        .filter(f => f.length >= 4 && f.length <= 220)
        .filter(f => !stopPhrases.some(s => f.toLowerCase().includes(s)))
        .filter(f => !/(alt\s*\+|shift\s*\+|keyboard|shortcuts)/i.test(f))
    ))
  }, [product, stopPhrases])

  const [sel, setSel] = useState({ color: product?.defaultVariant?.color || '', ram: product?.defaultVariant?.ram || '', storage: product?.defaultVariant?.storage || '' })

  if (!product) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Product not found.</p>
          <Link to="/products" className="btn-primary mt-4 inline-flex items-center"><ArrowLeft className="w-4 h-4 mr-2" />Back to Products</Link>
        </div>
      </div>
    )
  }

  const isWishlisted = isInWishlist(product.id)
  const handleWishlist = () => { if (isWishlisted) removeFromWishlist(product.id); else addToWishlist(product) }
  const handleBuyNow = () => { if (product.affiliateUrl) window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer') }

  return (
    <>
      <Helmet><title>{product.name} - A.M Zone</title><meta name="description" content={`${product.name} - ${product.description?.slice(0, 150) || ''}`} /></Helmet>

      <div className="container-custom py-8">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-purple-600">Home</Link></li><li>/</li>
            <li><Link to="/products" className="hover:text-purple-600">Products</Link></li><li>/</li>
            <li><Link to={`/products?category=${(product.category||'').toLowerCase()}`} className="hover:text-purple-600">{product.category}</Link></li><li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="relative mb-4">
              <div className="w-full h-[520px] bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                <img src={images[current]} alt={product.name} className="max-h-full max-w-full object-contain" />
              </div>
              {images.length > 1 && (
                <>
                  <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow"><ChevronLeft className="w-5 h-5" /></button>
                  <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow"><ChevronRight className="w-5 h-5" /></button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {images.map((img, i) => (
                  <button key={i} onClick={()=>setCurrent(i)} className={`border-2 rounded-md overflow-hidden ${current===i?'border-purple-600':'border-gray-200'}`}>
                    <img src={img} alt={`${product.name}-${i}`} className="w-20 h-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-4"><span className="text-purple-700 font-medium">{product.category}</span>{product.brand && (<><span className="mx-2">•</span><span className="text-gray-600">{product.brand}</span></>)}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">{[...Array(5)].map((_, i) => (<Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating||0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />))}</div>
              <span className="text-gray-600">{product.rating || '4.5'} ({(product.reviews||0).toLocaleString()} reviews)</span>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">{formatINR(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (<><span className="text-xl text-gray-500 line-through">{formatINR(product.originalPrice)}</span>{product.discount && (<span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">-{product.discount}%</span>)}</>)}
              </div>
            </div>

            {(product.variants?.colors?.length || product.variants?.ram?.length || product.variants?.storage?.length) && (
              <div className="mb-6 space-y-4">
                {product.variants?.colors?.length > 0 && (
                  <div>
                    <div className="text-sm text-gray-700 mb-2">Colour</div>
                    {/* Image swatches linked to colours */}
                    <div className="flex flex-wrap gap-3 mb-2">
                      {product.variants.colors.map((c, i)=> (
                        <button
                          key={c}
                          onClick={()=>{ setSel(s=>({...s,color:c})); if (images[i]) setCurrent(i) }}
                          className={`border-2 rounded-md overflow-hidden ${sel.color===c?'border-purple-600':'border-gray-200'}`}
                          title={c}
                        >
                          <img src={images[i] || images[0]} alt={c} className="w-12 h-12 object-cover" />
                        </button>
                      ))}
                    </div>
                    {/* Also show names as pills for accessibility */}
                    <div className="flex flex-wrap gap-2">
                      {product.variants.colors.map((c)=> (<Pill key={c} active={sel.color===c} onClick={()=>setSel(s=>({...s,color:c}))}>{c}</Pill>))}
                    </div>
                  </div>
                )}
                {product.variants?.ram?.length > 0 && (<div><div className="text-sm text-gray-700 mb-2">RAM</div><div className="flex flex-wrap gap-2">{product.variants.ram.map((c)=>(<Pill key={c} active={sel.ram===c} onClick={()=>setSel(s=>({...s,ram:c}))}>{c}</Pill>))}</div></div>)}
                {product.variants?.storage?.length > 0 && (<div><div className="text-sm text-gray-700 mb-2">Storage</div><div className="flex flex-wrap gap-2">{product.variants.storage.map((c)=>(<Pill key={c} active={sel.storage===c} onClick={()=>setSel(s=>({...s,storage:c}))}>{c}</Pill>))}</div></div>)}
              </div>
            )}

            {product.description && (<div className="mb-6"><h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3><p className="text-gray-700 leading-relaxed">{product.description}</p></div>)}

            {uniqueFeatures.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {uniqueFeatures.slice(0,12).map((feature, index) => (<li key={index} className="flex items-center space-x-2"><Check className="w-4 h-4 text-green-500" /><span className="text-gray-700">{feature}</span></li>))}
                </ul>
              </div>
            )}

            <div className="mb-6 space-y-2"><div className="flex items-center space-x-2 text-gray-700"><Truck className="w-4 h-4" /><span>Fast delivery across India</span></div><div className="flex items-center space-x-2 text-gray-700"><Shield className="w-4 h-4" /><span>Secure payments</span></div></div>

            <div className="space-y-4">
              <motion.button onClick={handleBuyNow} className="w-full btn-primary inline-flex items-center justify-center text-lg py-4 bg-purple-600 hover:bg-purple-700 text-white" whileHover={{scale:1.01}} whileTap={{scale:0.99}}><ExternalLink className="w-5 h-5 mr-2" />Buy Now</motion.button>
              <div className="flex space-x-4"><motion.button onClick={handleWishlist} className={`flex-1 py-3 px-4 border rounded-lg inline-flex items-center justify-center ${isWishlisted?'border-red-500 text-red-600 bg-red-50':'border-gray-300 text-gray-700 hover:border-gray-400'}`} whileHover={{scale:1.01}} whileTap={{scale:0.99}}><Heart className={`w-5 h-5 mr-2 ${isWishlisted ? 'fill-red-500' : ''}`} />{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</motion.button></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
