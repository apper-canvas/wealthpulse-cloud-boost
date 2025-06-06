import React from 'react'
      import Button from '@/components/atoms/Button'
      import ApperIcon from '@/components/ApperIcon'

      const NavItem = ({ id, label, icon, activeTab, onClick, isMobile = false }) => {
        const isActive = activeTab === id
        const baseClasses = isMobile
          ? 'flex flex-col items-center space-y-1 p-2'
          : 'w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all'
        const activeClasses = isMobile ? 'text-primary' : 'bg-primary text-white shadow-lg'
        const inactiveClasses = isMobile
          ? 'text-surface-400'
          : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'

        return (
          <Button
            key={id}
            onClick={() => onClick(id)}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            icon={<ApperIcon name={icon} size={20} />}
          >
            {isMobile ? <span className="text-xs">{label}</span> : <span className="font-medium">{label}</span>}
          </Button>
        )
      }

      export default NavItem