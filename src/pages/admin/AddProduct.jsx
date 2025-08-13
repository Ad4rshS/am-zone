import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useProductsStore } from '../../store/useStore'
import { api } from '../../lib/api'
import toast from 'react-hot-toast'

const templates = {
  electronics: { features: ['1-year warranty', 'Fast charging', 'Bluetooth 5.0'] },
  fashion: { features: ['Premium fabric', 'True to size', 'Easy returns'] },
  home: { features: ['Durable build', 'Easy to clean', 'Modern design'] }
}

const isValidUrl = (u) => typeof u === 'string' && /^https?:\/\//i.test(u) && !u.endsWith('_.jpg')

const AddProduct = () => {
  const navigate = useNavigate()
  const addProduct = useProductsStore((s) => s.addProduct)
  const { register, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      name: '', category: 'Electronics', price: 999, image: '', images: '', rating: 4.5, reviews: 0,
      description: '', features: [], sourceUrl: '', affiliateUrl: '', variants: { colors: [], ram: [], storage: [] }, defaultVariant: { color: '', ram: '', storage: '' }
    }
  })

  const rawImages = watch('images')
  const gallery = typeof rawImages === 'string' ? rawImages.split(',').map(s=>s.trim()).filter(isValidUrl) : []
  const mainImage = watch('image')

  const onTemplate = (key) => { const t = templates[key]; if (t) setValue('features', t.features) }

  const onFetch = async () => {
    try {
      const url = getValues('sourceUrl')
      if (!url) return toast.error('Enter the product source URL')
      const data = await api.fetchFromSource(url)
      if (data.name) setValue('name', data.name)
      if (Array.isArray(data.images) && data.images.length) {
        const imgs = data.images.filter(isValidUrl)
        setValue('images', imgs.join(', '))
        setValue('image', imgs[0] || '')
      }
      if (data.description) setValue('description', data.description)
      if (Array.isArray(data.features)) setValue('features', Array.from(new Set(data.features.map(f=>f.trim()).filter(Boolean))))
      if (data.price) setValue('price', data.price)
      if (data.variants) setValue('variants', data.variants)
      toast.success('Fetched product details')
    } catch { toast.error('Failed to fetch details') }
  }

  const pickAsMain = (img) => { setValue('image', img) }
  const removeFromGallery = (img) => {
    const filtered = gallery.filter(i=>i!==img)
    setValue('images', filtered.join(', '))
    if (mainImage === img) setValue('image', filtered[0] || '')
  }

  const onSubmit = async (form) => {
    const images = typeof form.images === 'string' && form.images.trim() ? form.images.split(',').map(s=>s.trim()) : []
    await addProduct({ ...form, images })
    toast.success('Product saved')
    navigate('/admin/products')
  }

  return (
    <>
      <Helmet><title>Add Product - Admin | A.M Zone</title></Helmet>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Add Product</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Source URL (from shopping site)</label>
            <div className="flex gap-2">
              <input {...register('sourceUrl')} className="flex-1 border rounded px-3 py-2" placeholder="https://..." />
              <button type="button" onClick={onFetch} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded px-4">Fetch</button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Auto-fills name, images, variants, features, and price.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input {...register('name', { required: true })} className="w-full border rounded px-3 py-2" placeholder="Product name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select {...register('category')} className="w-full border rounded px-3 py-2">
              <option>Electronics</option><option>Fashion</option><option>Home</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (INR)</label>
            <input type="number" {...register('price', { valueAsNumber: true })} className="w-full border rounded px-3 py-2" />
          </div>

          {/* Image Preview / Selector */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
            {gallery.length === 0 ? (
              <p className="text-sm text-gray-600">Fetch from source URL to populate images. You can also paste image URLs (comma separated) in the field below.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-3">
                {gallery.map((img)=> (
                  <div key={img} className={`relative rounded-md overflow-hidden border ${mainImage===img?'border-purple-600':'border-gray-200'}`}>
                    <img src={img} alt="preview" className="w-full h-24 object-cover" />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition flex items-center justify-center gap-2">
                      <button type="button" onClick={()=>pickAsMain(img)} className="text-xs bg-white rounded px-2 py-1">Set Main</button>
                      <button type="button" onClick={()=>removeFromGallery(img)} className="text-xs bg-white rounded px-2 py-1">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <input {...register('images')} className="w-full border rounded px-3 py-2" placeholder="https://..., https://..." />
            <p className="text-xs text-gray-500 mt-1">Comma-separated image URLs. Main image will be used as the default display.</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Image (auto-set from above)</label>
            <input {...register('image')} className="w-full border rounded px-3 py-2" placeholder="https://..." />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea {...register('description')} rows={4} className="w-full border rounded px-3 py-2" />
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Features</label>
              <div className="space-x-2">
                <button type="button" onClick={()=>onTemplate('electronics')} className="text-purple-700 hover:underline">Electronics template</button>
                <button type="button" onClick={()=>onTemplate('fashion')} className="text-purple-700 hover:underline">Fashion template</button>
                <button type="button" onClick={()=>onTemplate('home')} className="text-purple-700 hover:underline">Home template</button>
              </div>
            </div>
            <input {...register('features.0')} className="w-full border rounded px-3 py-2 mt-2" placeholder="Feature #1" />
            <input {...register('features.1')} className="w-full border rounded px-3 py-2 mt-2" placeholder="Feature #2" />
            <input {...register('features.2')} className="w-full border rounded px-3 py-2 mt-2" placeholder="Feature #3" />
          </div>

          {/* Variants */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
              <select {...register('defaultVariant.color')} className="w-full border rounded px-3 py-2">
                <option value="">None</option>
                {watch('variants').colors?.map((c)=>(<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">RAM</label>
              <select {...register('defaultVariant.ram')} className="w-full border rounded px-3 py-2">
                <option value="">None</option>
                {watch('variants').ram?.map((c)=>(<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Storage</label>
              <select {...register('defaultVariant.storage')} className="w-full border rounded px-3 py-2">
                <option value="">None</option>
                {watch('variants').storage?.map((c)=>(<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Affiliate Link (Buy Now)</label>
            <input {...register('affiliateUrl')} className="w-full border rounded px-3 py-2" placeholder="https://affiliate-link" />
          </div>

          <div className="md:col-span-2">
            <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2">Save Product</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddProduct
