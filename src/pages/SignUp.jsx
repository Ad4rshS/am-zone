import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/useStore'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { signUp } = useAuthStore()
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password')

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await signUp(data.name, data.email, data.password)
      toast.success('Account created! Please sign in.')
      navigate('/signin')
    } catch {
      toast.error('Could not create account')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Sign Up - A.M Zone</title>
        <meta name="description" content="Create your A.M Zone account to start shopping and save your favorite products." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">A.M Zone</span>
                <p className="text-sm text-gray-500 -mt-1">India's Premier Shopping</p>
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
            <p className="text-gray-600">Join A.M Zone and start your shopping journey</p>
          </div>

          <motion.form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl p-8 space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input {...register('name', { required: 'Full name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })} type="text" id="name" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors" placeholder="Enter your full name" />
              </div>
              {errors.name && (<p className="mt-1 text-sm text-red-600">{errors.name.message}</p>)}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })} type="email" id="email" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors" placeholder="Enter your email" />
              </div>
              {errors.email && (<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>)}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input {...register('phone', { pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit Indian number' } })} type="tel" id="phone" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors" placeholder="Enter your phone number" />
              </div>
              {errors.phone && (<p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>)}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: 'Must include uppercase, lowercase, number' } })} type={showPassword ? 'text' : 'password'} id="password" className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors" placeholder="Create a strong password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
              </div>
              {errors.password && (<p className="mt-1 text-sm text-red-600">{errors.password.message}</p>)}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input {...register('confirmPassword', { required: 'Please confirm your password', validate: value => value === password || 'Passwords do not match' })} type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors" placeholder="Confirm your password" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
              </div>
              {errors.confirmPassword && (<p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>)}
            </div>
            <div className="flex items-start">
              <input {...register('terms', { required: 'You must accept the terms and conditions' })} id="terms" name="terms" type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1" />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">I agree to the <Link to="/terms" className="text-purple-600 hover:text-purple-500 font-medium">Terms of Service</Link> and <Link to="/privacy" className="text-purple-600 hover:text-purple-500 font-medium">Privacy Policy</Link></label>
            </div>
            {errors.terms && (<p className="text-sm text-red-600">{errors.terms.message}</p>)}
            <motion.button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : (<><span>Create Account</span><ArrowRight className="ml-2 w-4 h-4" /></>)}
            </motion.button>
          </motion.form>

          <div className="text-center">
            <p className="text-gray-600">Already have an account? <Link to="/signin" className="text-purple-600 hover:text-purple-500 font-medium">Sign in here</Link></p>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default SignUp
