import React from 'react'

      const Heading = ({ level, children, className = '', ...props }) => {
        const Tag = `h${level}`
        return (
          <Tag className={`font-semibold text-surface-900 dark:text-white ${className}`} {...props}>
            {children}
          </Tag>
        )
      }

      export default Heading