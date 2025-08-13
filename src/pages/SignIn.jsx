import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'
import { useAuthStore } from '../store/useStore'
import toast from 'react-hot-toast'

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { signIn } = useAuthStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await signIn(data.email, data.password)
      toast.success('Welcome back!')
      navigate('/')
    } catch (err) {
      toast.error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Sign In - A.M Zone</title>
        <meta name="description" content="Sign in to your A.M Zone account to access your profile, cart, and wishlist." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  A.M Zone
                </span>
                <p className="text-sm text-gray-500 -mt-1">India's Premier Shopping</p>
              </div>
            </Link>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Sign in to your account to continue shopping</p>
          </div>

          <motion.form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl p-8 space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })}
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-500 font-medium">Forgot password?</Link>
            </div>

            <motion.button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : (<><span>Sign In</span><ArrowRight className="ml-2 w-4 h-4" /></>)}
            </motion.button>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2 font-medium">Demo Credentials:</p>
              <div className="text-xs text-gray-500 space-y-1">
                <p><strong>Admin:</strong> adarsh@amzone.com / password123</p>
              </div>
            </div>
          </motion.form>

          <div className="text-center">
            <p className="text-gray-600">Don't have an account? <Link to="/signup" className="text-purple-600 hover:text-purple-500 font-medium">Sign up here</Link></p>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default SignIn
