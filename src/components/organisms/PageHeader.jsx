import React from 'react'
      import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Heading from '@/components/atoms/Heading'

      const PageHeader = ({ netWorth, formatCurrency, darkMode, toggleDarkMode }) => {
        return (
          <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-800/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <ApperIcon name="DollarSign" className="text-white" size={20} />
                  </div>
                  <Heading level={1} className="text-xl">WealthPulse</Heading>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:flex items-center space-x-2 text-sm">
                    <span className="text-surface-600 dark:text-surface-400">Net Worth:</span>
                    <span className="font-semibold text-lg tabular-nums text-secondary">
                      {formatCurrency(netWorth)}
                    </span>
                  </div>
                  
                  <Button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                    icon={<ApperIcon name={darkMode ? 'Sun' : 'Moon'} size={20} />}
                  />
                </div>
              </div>
            </div>
          </header>
        )
      }

      export default PageHeader