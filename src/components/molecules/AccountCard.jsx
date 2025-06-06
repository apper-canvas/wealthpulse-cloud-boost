import React from 'react'
      import Card from '@/components/atoms/Card'
      import Heading from '@/components/atoms/Heading'
      import Text from '@/components/atoms/Text'

      const AccountCard = ({ name, type, balance, lastSync, formatCurrency }) => {
        return (
          <Card motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
            <div className="flex items-center justify-between mb-4">
              <Heading level={3}>{name}</Heading>
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                {type}
              </span>
            </div>
            <p className="text-2xl font-bold tabular-nums text-surface-900 dark:text-white">
              {formatCurrency(balance)}
            </p>
            <Text className="text-sm mt-2">
              Last updated: {new Date(lastSync).toLocaleDateString()}
            </Text>
          </Card>
        )
      }

      export default AccountCard