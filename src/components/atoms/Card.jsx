import React from 'react'
      import { motion } from 'framer-motion'

      const Card = ({ children, className = '', motionProps = {}, ...props }) => {
        return (
          <motion.div
            className={`glassmorphism rounded-2xl p-6 ${className}`}
            {...motionProps}
            {...props}
          >
            {children}
          </motion.div>
        )
      }

      export default Card