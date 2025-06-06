import React from 'react'
      import Card from '@/components/atoms/Card'
      import Heading from '@/components/atoms/Heading'
      import IconText from '@/components/atoms/IconText'
      import Text from '@/components/atoms/Text'

      const InvestmentCard = ({ investment, formatCurrency }) => {
        const currentValue = investment.shares * investment.currentPrice
        const totalCost = investment.shares * investment.purchasePrice
        const gainLoss = currentValue - totalCost
        const gainLossPercentage = (gainLoss / totalCost) * 100

        return (
          <Card motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
            <div className="flex justify-between items-center mb-4">
              <Heading level={3}>{investment.symbol}</Heading>
              <span className="text-xs px-2 py-1 bg-surface-100 dark:bg-surface-700 rounded-full">
                {investment.allocation}%
              </span>
            </div>
            <p className="text-xl font-bold tabular-nums text-surface-900 dark:text-white mb-2">
              {formatCurrency(currentValue)}
            </p>
            <IconText
              iconName={gainLoss >= 0 ? 'TrendingUp' : 'TrendingDown'}
              iconClassName={gainLoss >= 0 ? 'text-secondary' : 'text-red-500'}
              text={`${gainLoss >= 0 ? '+' : ''}${formatCurrency(gainLoss)} (${gainLossPercentage.toFixed(2)}%)`}
              textClassName={gainLoss >= 0 ? 'text-secondary' : 'text-red-500'}
            />
            <Text className="text-xs mt-2">
              {investment.shares} shares @ {formatCurrency(investment.currentPrice)}
            </Text>
          </Card>
        )
      }

      export default InvestmentCard