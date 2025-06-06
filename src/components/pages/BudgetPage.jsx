import React from 'react'
      import Heading from '@/components/atoms/Heading'
      import BudgetCard from '@/components/molecules/BudgetCard'

      const BudgetPage = ({ budgets, formatCurrency }) => {
        return (
          <div className="space-y-6">
            <Heading level={2} className="text-2xl">Budget Tracking</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {budgets.map(budget => (
                <BudgetCard
                  key={budget.category}
                  budget={budget}
                  formatCurrency={formatCurrency}
                />
              ))}
            </div>
          </div>
        )
      }

      export default BudgetPage