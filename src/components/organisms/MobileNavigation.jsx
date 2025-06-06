import React from 'react'
      import NavItem from '@/components/molecules/NavItem'

      const MobileNavigation = ({ menuItems, activeTab, setActiveTab }) => {
        return (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700">
            <div className="flex justify-around py-2">
              {menuItems.slice(0, 5).map(item => (
                <NavItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  icon={item.icon}
                  activeTab={activeTab}
                  onClick={setActiveTab}
                  isMobile
                />
              ))}
            </div>
          </div>
        )
      }

      export default MobileNavigation