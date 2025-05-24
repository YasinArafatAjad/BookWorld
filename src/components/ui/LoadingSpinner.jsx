import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'default', color = 'primary' }) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    default: 'h-12 w-12',
    large: 'h-16 w-16',
  }

  const colorClasses = {
    primary: 'border-primary-500',
    accent: 'border-accent-400',
    gray: 'border-gray-500',
  }

  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        className={`rounded-full border-t-4 ${colorClasses[color]} border-4 border-gray-200 dark:border-gray-700 ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{ 
          repeat: Infinity, 
          duration: 1,
          ease: "linear" 
        }}
      />
    </div>
  )
}

export default LoadingSpinner