import React from 'react'
      import Card from '@/components/atoms/Card'
      import Heading from '@/components/atoms/Heading'
      import ProgressBar from '@/components/atoms/ProgressBar'
      import Text from '@/components/atoms/Text'

      const GoalSummaryCard = ({ goal, formatCurrency }) => {
        const percentage = (goal.currentAmount / goal.targetAmount) * 100
        const remaining = goal.targetAmount - goal.currentAmount

        return (
          <Card motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
            <div className="flex justify-between items-center mb-4">
              <Heading level={3}>{goal.name}</Heading>
              <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                {goal.type}
              </span>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <Text>Progress</Text>
                <span className="font-medium">{Math.round(percentage)}%</span>
              </div>
              <ProgressBar progress={percentage} colorClass="bg-accent" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <Text>Current:</Text>
                <span className="font-medium tabular-nums">{formatCurrency(goal.currentAmount)}</span>
              </div>
              <div className="flex justify-between">
                <Text>Target:</Text>
                <span className="font-medium tabular-nums">{formatCurrency(goal.targetAmount)}</span>
              </div>
              <div className="flex justify-between">
                <Text>Remaining:</Text>
                <span className="font-medium tabular-nums">{formatCurrency(remaining)}</span>
              </div>
              <div className="flex justify-between">
                <Text>Target Date:</Text>
                <span className="font-medium">{new Date(goal.targetDate).toLocaleDateString()}</span>
              </div>
            </div>
          </Card>
        )
      }

      export default GoalSummaryCard