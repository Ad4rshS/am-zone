import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useProductsStore } from '../../store/useStore'

const AdminProducts = () => {
  const { products, deleteProduct, toggleProductStatus } = useProductsStore()

  return (
    <>
      <Helmet>
        <title>Admin - Products | A.M Zone</title>
      </Helmet>

      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <Link to="/admin/products/add" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2">Add Product</Link>
        </div>

        {products.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-gray-600">
            No products yet. Click "Add Product" to create one.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-700 border-b">
                  <th className="p-4">Image</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price (INR)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td className="p-4"><img src={p.image} alt={p.name} className="w-16 h-16 rounded object-cover" /></td>
                    <td className="p-4 font-medium">{p.name}</td>
                    <td className="p-4">{p.category}</td>
                    <td className="p-4">{p.price}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded text-xs ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{p.isActive ? 'Active' : 'Inactive'}</span></td>
                    <td className="p-4 space-x-2">
                      <Link to={`/admin/products/edit/${p.id}`} className="text-purple-700 hover:underline">Edit</Link>
                      <button onClick={()=>toggleProductStatus(p.id)} className="text-indigo-700 hover:underline">{p.isActive ? 'Disable' : 'Enable'}</button>
                      <button onClick={()=>deleteProduct(p.id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

export default AdminProducts
