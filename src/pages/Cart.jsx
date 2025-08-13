import { Helmet } from 'react-helmet-async'
import { useCartStore } from '../store/useStore'
import { Link } from 'react-router-dom'

const formatINR = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

const Cart = () => {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCartStore()

  return (
    <>
      <Helmet>
        <title>My Cart - A.M Zone</title>
      </Helmet>

      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Cart</h1>
        {items.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-gray-600">
            Your cart is empty. <Link to="/products" className="text-purple-700 font-medium">Browse products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <select value={item.quantity} onChange={(e)=>updateQuantity(item.id, Number(e.target.value))} className="border rounded px-2 py-1">
                        {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                      <button onClick={()=>removeFromCart(item.id)} className="text-red-600 hover:underline">Remove</button>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900">{formatINR(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="flex justify-between text-gray-700 mb-2">
                  <span>Subtotal</span>
                  <span>{formatINR(total)}</span>
                </div>
                <div className="flex justify-between text-gray-700 mb-4">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-900 font-semibold text-lg mb-6">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 font-medium">Proceed to Checkout</button>
                <button onClick={clearCart} className="w-full text-gray-600 hover:text-gray-800 mt-3">Clear Cart</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
