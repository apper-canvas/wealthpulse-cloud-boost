import React from 'react'

      const Text = ({ children, className = '', ...props }) => {
        return (
          <p className={`text-surface-600 dark:text-surface-400 ${className}`} {...props}>
            {children}
          </p>
        )
      }

      export default Text