import React from 'react'

      const ProgressBar = ({ progress, colorClass, className = '', ...props }) => {
        return (
          <div className={`w-full bg-surface-200 dark:bg-surface-700 rounded-full h-3 ${className}`} {...props}>
            <div
              className={`h-3 rounded-full transition-all duration-500 ${colorClass}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        )
      }

      export default ProgressBar