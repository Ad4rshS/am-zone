import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { Filter, Grid, List } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { useProductsStore } from '../store/useStore'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const allProducts = useProductsStore((s) => s.products)
  const loadProducts = useProductsStore((s)=>s.loadProducts)
  useEffect(()=>{ loadProducts() }, [loadProducts])
  
  const searchQuery = (searchParams.get('search') || '').toLowerCase()

  const categories = useMemo(() => {
    const map = new Map()
    allProducts.forEach(p => { if (p.isActive) map.set(p.category, (map.get(p.category) || 0) + 1) })
    return [{ id: 'all', name: 'All Categories', count: Array.from(map.values()).reduce((a,b)=>a+b,0) }, ...Array.from(map.entries()).map(([k,v]) => ({ id: k.toLowerCase(), name: k, count: v }))]
  }, [allProducts])

  const filteredProducts = useMemo(() => {
    let list = allProducts.filter(p => p.isActive)
    if (selectedCategory !== 'all') list = list.filter(p => p.category.toLowerCase() === selectedCategory)
    if (searchQuery) list = list.filter(p => p.name.toLowerCase().includes(searchQuery))
    switch (sortBy) {
      case 'price-low': list = [...list].sort((a,b) => a.price - b.price); break
      case 'price-high': list = [...list].sort((a,b) => b.price - a.price); break
      case 'rating': list = [...list].sort((a,b) => (b.rating||0) - (a.rating||0)); break
      case 'reviews': list = [...list].sort((a,b) => (b.reviews||0) - (a.reviews||0)); break
    }
    return list
  }, [allProducts, selectedCategory, sortBy, searchQuery])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    const next = {}
    if (category !== 'all') next.category = category
    if (searchQuery) next.search = searchQuery
    setSearchParams(next)
  }

  return (
    <>
      <Helmet>
        <title>Products - A.M Zone</title>
        <meta name="description" content="Browse products across categories on A.M Zone. Discover the latest deals and top brands." />
      </Helmet>

      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Search results and curated categories</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${selectedCategory === category.id ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-500">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white rounded-lg shadow-md p-4">
              <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                Showing {filteredProducts.length} of {allProducts.filter(p=>p.isActive).length} products
              </div>

              <div className="flex items-center space-x-4">
                <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                </select>

                <div className="flex border border-gray-300 rounded-lg">
                  <button onClick={()=>setViewMode('grid')} className={`p-2 ${viewMode==='grid'?'bg-purple-600 text-white':'text-gray-600 hover:bg-gray-100'}`}> <Grid className="w-4 h-4" /> </button>
                  <button onClick={()=>setViewMode('list')} className={`p-2 ${viewMode==='list'?'bg-purple-600 text-white':'text-gray-600 hover:bg-gray-100'}`}> <List className="w-4 h-4" /> </button>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found.</p>
              </div>
            ) : (
              <div className={viewMode==='grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
