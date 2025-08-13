import { Helmet } from 'react-helmet-async'
import { useWishlistStore, useCartStore } from '../store/useStore'
import { Link } from 'react-router-dom'

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore()
  const { addToCart } = useCartStore()

  return (
    <>
      <Helmet>
        <title>My Wishlist - A.M Zone</title>
      </Helmet>

      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Wishlist</h1>
        {items.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-gray-600">
            Your wishlist is empty. <Link to="/products" className="text-purple-700 font-medium">Browse products</Link>
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.category}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <button onClick={()=>addToCart(item, 1)} className="text-purple-700 hover:underline">Add to Cart</button>
                    <button onClick={()=>removeFromWishlist(item.id)} className="text-red-600 hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={clearWishlist} className="text-gray-600 hover:text-gray-800">Clear Wishlist</button>
          </div>
        )}
      </div>
    </>
  )
}

export default Wishlist
