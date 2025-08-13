import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useProductsStore } from '../../store/useStore'

const HeroBanner = () => {
  const { heroBanners, addHeroBanner, deleteHeroBanner, updateHeroBanner } = useProductsStore()
  const { register, handleSubmit, reset } = useForm({ defaultValues: { title: '', subtitle: '', image: '', link: '' } })

  const onSubmit = (data) => {
    addHeroBanner(data)
    reset()
  }

  return (
    <>
      <Helmet>
        <title>Admin - Hero Banners | A.M Zone</title>
      </Helmet>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Hero Banners</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input {...register('title', { required: true })} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
            <input {...register('subtitle')} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input {...register('image', { required: true })} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Link (optional)</label>
            <input {...register('link')} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2">Add Banner</button>
          </div>
        </form>

        {heroBanners.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-gray-600">No banners yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {heroBanners.map(b => (
              <div key={b.id} className="bg-white rounded-xl shadow overflow-hidden">
                <img src={b.image} alt={b.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{b.title}</h3>
                  <p className="text-sm text-gray-600">{b.subtitle}</p>
                  <div className="mt-3 space-x-3">
                    <button onClick={()=>updateHeroBanner(b.id, { isActive: !b.isActive })} className="text-indigo-700 hover:underline">{b.isActive ? 'Disable' : 'Enable'}</button>
                    <button onClick={()=>deleteHeroBanner(b.id)} className="text-red-600 hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default HeroBanner
