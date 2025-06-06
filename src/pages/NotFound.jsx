import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 p-8"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto">
          <ApperIcon name="AlertTriangle" className="text-white" size={48} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-surface-900 dark:text-white">404</h1>
          <h2 className="text-2xl font-semibold text-surface-700 dark:text-surface-300">Page Not Found</h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-md">
            The financial page you're looking for doesn't exist. Let's get you back to your dashboard.
          </p>
        </div>
        
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          <ApperIcon name="Home" size={20} />
          <span>Back to Dashboard</span>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound