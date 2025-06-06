import React from 'react'
      import Card from '@/components/atoms/Card'
      import Heading from '@/components/atoms/Heading'
      import ProgressBar from '@/components/atoms/ProgressBar'
      import Text from '@/components/atoms/Text'

      const BudgetCard = ({ budget, formatCurrency }) => {
        const percentage = (budget.spent / budget.limit) * 100
        const isOverBudget = percentage > 100

        return (
          <Card motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
            <div className="flex justify-between items-center mb-4">
              <Heading level={3}>{budget.category}</Heading>
              <span className={`text-sm font-medium ${isOverBudget ? 'text-red-500' : 'text-secondary'}`}>
                {Math.round(percentage)}%
              </span>
            </div>
            <div className="mb-3">
              <ProgressBar progress={percentage} colorClass={isOverBudget ? 'bg-red-500' : 'bg-secondary'} />
            </div>
            <div className="flex justify-between text-sm">
              <Text>Spent: {formatCurrency(budget.spent)}</Text>
              <Text>Limit: {formatCurrency(budget.limit)}</Text>
            </div>
          </Card>
        )
      }

      export default BudgetCard