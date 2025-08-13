import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useProductsStore } from '../../store/useStore'

const EditProduct = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { products, updateProduct } = useProductsStore()
  const product = products.find(p => String(p.id) === String(id))

  const { register, handleSubmit, setValue } = useForm({ defaultValues: product || {} })

  if (!product) {
    return (
      <div className="container-custom py-8">
        <p className="text-gray-600">Product not found.</p>
      </div>
    )
  }

  const onSubmit = (data) => {
    if (typeof data.images === 'string' && data.images.trim().length > 0) {
      data.images = data.images.split(',').map(s => s.trim())
    }
    updateProduct(product.id, data)
    navigate('/admin/products')
  }

  return (
    <>
      <Helmet>
        <title>Edit Product - Admin | A.M Zone</title>
      </Helmet>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Product</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input {...register('name', { required: true })} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select {...register('category')} className="w-full border rounded px-3 py-2">
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (INR)</label>
            <input type="number" {...register('price', { valueAsNumber: true })} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Image URL</label>
            <input {...register('image')} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images (comma separated URLs)</label>
            <input {...register('images')} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea {...register('description')} rows={4} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Features (use separate lines or comma separated)</label>
            <textarea {...register('features')} rows={3} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2">Save Changes</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditProduct
