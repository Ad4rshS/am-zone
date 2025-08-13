import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Heart, Eye, ExternalLink } from 'lucide-react'
import { useWishlistStore, useAuthStore } from '../store/useStore'
import toast from 'react-hot-toast'

const placeholder = 'https://via.placeholder.com/600x400?text=Product'

const isValidUrl = (u) => typeof u === 'string' && /^https?:\/\//i.test(u) && !u.endsWith('_.jpg') && !/data:image\/gif/i.test(u)

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
  const { isAuthenticated } = useAuthStore()
  const isWishlisted = isInWishlist(product.id)

  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price)

  const handleWishlistToggle = () => {
    if (!isAuthenticated) return toast.error('Please sign in to use wishlist')
    if (isWishlisted) { removeFromWishlist(product.id); toast.success('Removed from wishlist') }
    else { addToWishlist(product); toast.success('Added to wishlist!') }
  }

  const handleBuyNow = () => {
    if (product.affiliateUrl) {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = `/product/${product.id}`
    }
  }

  const gallery = Array.isArray(product.images) ? product.images.filter(isValidUrl) : []
  const candidateMain = isValidUrl(product.image) ? product.image : (gallery[0] || null)
  const fallbackNext = gallery.find((img) => img !== candidateMain) || placeholder
  const mainImage = candidateMain || placeholder

  return (
    <motion.div className="card group" whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e)=>{ e.currentTarget.src = fallbackNext }}
        />
        {product.discount && (
          <motion.div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            -{product.discount}%
          </motion.div>
        )}
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <motion.button onClick={handleWishlistToggle} className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors duration-200 shadow-md" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </motion.button>
        </div>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
          <Link to={`/product/${product.id}`} className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Quick View</span>
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-purple-600 font-medium">{product.category}</p>
        <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200 line-clamp-2">{product.name}</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-sm text-gray-600">({(product.reviews || 0).toLocaleString()})</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex space-x-2 pt-2">
          <motion.button onClick={handleBuyNow} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 inline-flex items-center justify-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
