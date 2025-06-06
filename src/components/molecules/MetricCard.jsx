import React from 'react'
      import { motion } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'
      import Text from '@/components/atoms/Text'
      import Card from '@/components/atoms/Card'

      const MetricCard = ({ title, value, iconName, iconBgClass, iconColorClass, delay = 0 }) => {
        return (
          <Card motionProps={{ initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { delay } }}>
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm">{title}</Text>
                <p className="text-2xl font-bold tabular-nums text-secondary">{value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBgClass}`}>
                <ApperIcon name={iconName} className={iconColorClass} size={24} />
              </div>
            </div>
          </Card>
        )
      }

      export default MetricCard