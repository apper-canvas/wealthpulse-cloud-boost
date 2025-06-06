import React from 'react'
      import Button from '@/components/atoms/Button'
      import ApperIcon from '@/components/ApperIcon'

      const ChartToggle = ({ label, iconName, isActive, onClick }) => {
        return (
          <Button
            onClick={onClick}
            className={
              isActive
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
            }
            icon={<ApperIcon name={iconName} size={18} />}
          >
            {label}
          </Button>
        )
      }

      export default ChartToggle