import React from 'react'
      import Heading from '@/components/atoms/Heading'
      import GoalSummaryCard from '@/components/molecules/GoalSummaryCard'

      const GoalsPage = ({ goals, formatCurrency }) => {
        return (
          <div className="space-y-6">
            <Heading level={2} className="text-2xl">Financial Goals</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map(goal => (
                <GoalSummaryCard
                  key={goal.id}
                  goal={goal}
                  formatCurrency={formatCurrency}
                />
              ))}
            </div>
          </div>
        )
      }

      export default GoalsPage