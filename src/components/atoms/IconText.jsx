import React from 'react'
      import ApperIcon from '@/components/ApperIcon'

      const IconText = ({ iconName, iconClassName, text, textClassName, size = 16, ...props }) => {
        return (
          <div className="flex items-center space-x-2" {...props}>
            <ApperIcon name={iconName} className={iconClassName} size={size} />
            <span className={`text-sm font-medium ${textClassName}`}>
              {text}
            </span>
          </div>
        )
      }

      export default IconText