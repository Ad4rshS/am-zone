import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Package, Image, PlusCircle } from 'lucide-react'

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - A.M Zone</title>
      </Helmet>

      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/products" className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
            <Package className="w-8 h-8 text-purple-600" />
            <h3 className="mt-3 text-lg font-semibold">Manage Products</h3>
            <p className="text-gray-600">View, edit and delete products</p>
          </Link>
          <Link to="/admin/products/add" className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
            <PlusCircle className="w-8 h-8 text-purple-600" />
            <h3 className="mt-3 text-lg font-semibold">Add Product</h3>
            <p className="text-gray-600">Create a new product listing</p>
          </Link>
          <Link to="/admin/hero-banner" className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
            <Image className="w-8 h-8 text-purple-600" />
            <h3 className="mt-3 text-lg font-semibold">Hero Banners</h3>
            <p className="text-gray-600">Manage home page promotional banners</p>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Dashboard
