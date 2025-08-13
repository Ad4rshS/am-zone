import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import AdminAddProduct from './pages/admin/AddProduct'
import AdminEditProduct from './pages/admin/EditProduct'
import AdminHeroBanner from './pages/admin/HeroBanner'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>A.M Zone - India's Premier Shopping Destination</title>
        <meta name="description" content="Discover amazing products at unbeatable prices on A.M Zone. India's trusted online shopping platform with the best deals and fastest delivery." />
        <meta name="keywords" content="online shopping, e-commerce, best deals, India shopping, A.M Zone" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://amzone.in" />
        
        {/* Open Graph */}
        <meta property="og:title" content="A.M Zone - India's Premier Shopping Destination" />
        <meta property="og:description" content="Discover amazing products at unbeatable prices on A.M Zone." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amzone.in" />
        <meta property="og:image" content="https://amzone.in/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="A.M Zone - India's Premier Shopping Destination" />
        <meta name="twitter:description" content="Discover amazing products at unbeatable prices on A.M Zone." />
        <meta name="twitter:image" content="https://amzone.in/og-image.jpg" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Protected User Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/wishlist" element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/products" element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          } />
          <Route path="/admin/products/add" element={
            <AdminRoute>
              <AdminAddProduct />
            </AdminRoute>
          } />
          <Route path="/admin/products/edit/:id" element={
            <AdminRoute>
              <AdminEditProduct />
            </AdminRoute>
          } />
          <Route path="/admin/hero-banner" element={
            <AdminRoute>
              <AdminHeroBanner />
            </AdminRoute>
          } />
        </Routes>
      </main>
      
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}

export default App
