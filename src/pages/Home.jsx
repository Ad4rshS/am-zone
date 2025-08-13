import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { useEffect } from 'react'
import { useProductsStore } from '../store/useStore'

const Home = () => {
  const activeProducts = useProductsStore((s) => s.getActiveProducts())
  const heroBanners = useProductsStore((s) => s.getActiveHeroBanners())
  const loadProducts = useProductsStore((s)=>s.loadProducts)
  const loadBanners = useProductsStore((s)=>s.loadBanners)

  useEffect(()=>{ loadProducts(); loadBanners() }, [loadProducts, loadBanners])

  return (
    <>
      <Helmet>
        <title>A.M Zone - India’s Premier Shopping Destination</title>
        <meta name="description" content="Shop the latest deals and top products across Electronics, Fashion, Home & more on A.M Zone." />
        <meta name="keywords" content="shopping india, online store, electronics, fashion, home" />
      </Helmet>

      {/* Hero Section with Admin Banners */}
      <section className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white">
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to
                <span className="text-yellow-300"> A.M Zone</span>
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                India’s trusted shopping destination. Explore amazing offers, top brands,
                and a seamless buying experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="btn-primary bg-white text-purple-700 hover:bg-gray-100 inline-flex items-center justify-center">
                  Start Shopping
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/about" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-700 inline-flex items-center justify-center">
                  Learn More
                </Link>
              </div>
            </div>
            <div>
              {heroBanners.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {heroBanners.map((b) => (
                    <motion.a
                      key={b.id}
                      href={b.link || '/products'}
                      className="block bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden"
                      whileHover={{ y: -4 }}
                    >
                      <img src={b.image} alt={b.title} className="w-full h-44 object-cover" />
                      <div className="p-4">
                        <p className="text-sm text-blue-100">{b.subtitle}</p>
                        <h3 className="text-lg font-semibold">{b.title}</h3>
                      </div>
                    </motion.a>
                  ))}
                </div>
              ) : (
                <div className="bg-white/10 rounded-xl p-8 text-blue-100">
                  <p className="text-lg">Admin can upload promotional banners from Admin Panel → Hero Banner.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-lg text-gray-600">Curated picks across top categories</p>
            </div>
            <Link to="/products" className="btn-primary inline-flex items-center">
              View All
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {activeProducts.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-gray-600">
              No products available yet. Admin can add products from Admin Panel.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Big Deals. Fast Delivery.</h2>
          <p className="text-lg text-purple-200 mb-8 max-w-2xl mx-auto">
            Experience a smooth, secure shopping journey across categories you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-primary bg-white text-purple-700 hover:bg-gray-100 inline-flex items-center justify-center">
              Browse Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/contact" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-700 inline-flex items-center justify-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
