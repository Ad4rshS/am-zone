import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Menu, X, ShoppingCart, Search, User, Heart, 
  LogOut, Settings, Package, TrendingUp, Users
} from 'lucide-react'
import { useAuthStore, useCartStore, useWishlistStore } from '../store/useStore'
import toast from 'react-hot-toast'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore()
  const { getCartCount } = useCartStore()
  const { getWishlistCount } = useWishlistStore()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully!')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-white font-bold text-lg">A</span>
            </motion.div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                A.M Zone
              </span>
              <p className="text-xs text-gray-500 -mt-1">India's Premier Shopping</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 bg-purple-600 text-white p-1 rounded-md hover:bg-purple-700 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/wishlist"
                  className="p-2 text-gray-600 hover:text-purple-600 transition-colors relative"
                >
                  <Heart className="w-6 h-6" />
                  {getWishlistCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getWishlistCount()}
                    </span>
                  )}
                </Link>
                
                <Link
                  to="/cart"
                  className="p-2 text-gray-600 hover:text-purple-600 transition-colors relative"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Link>

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <User className="w-6 h-6" />
                    <span className="text-sm font-medium">{user?.name || 'User'}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </Link>
                      
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Admin Panel
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden border-t border-gray-200 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
              </form>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-4 mb-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Actions */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/wishlist"
                    className="p-2 text-gray-600 hover:text-purple-600 transition-colors relative"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5" />
                    {getWishlistCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getWishlistCount()}
                      </span>
                    )}
                  </Link>
                  
                  <Link
                    to="/cart"
                    className="p-2 text-gray-600 hover:text-purple-600 transition-colors relative"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {getCartCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getCartCount()}
                      </span>
                    )}
                  </Link>
                  
                  <Link
                    to="/profile"
                    className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                  </Link>
                  
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="w-5 h-5" />
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header
