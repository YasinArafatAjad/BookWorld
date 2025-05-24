import { motion } from 'framer-motion'

const SectionTitle = ({ title, subtitle, centered = false, delay = 0 }) => {
  return (
    <motion.div 
      className={`mb-8 ${centered ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-gray-50">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionTitle