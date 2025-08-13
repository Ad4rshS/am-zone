import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useStore'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  return children
}

export default ProtectedRoute
