import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useStore'

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute
