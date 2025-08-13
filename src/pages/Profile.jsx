import { Helmet } from 'react-helmet-async'
import { useAuthStore } from '../store/useStore'

const Profile = () => {
  const { user } = useAuthStore()

  return (
    <>
      <Helmet>
        <title>My Profile - A.M Zone</title>
      </Helmet>

      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>

        <div className="bg-white rounded-xl shadow p-6 max-w-xl">
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between"><span className="font-medium">Name</span><span>{user?.name}</span></div>
            <div className="flex justify-between"><span className="font-medium">Email</span><span>{user?.email}</span></div>
            <div className="flex justify-between"><span className="font-medium">Role</span><span className="capitalize">{user?.role}</span></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
