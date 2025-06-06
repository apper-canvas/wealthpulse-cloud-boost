import React from 'react'
      import { motion } from 'framer-motion'
      import Chart from 'react-apexcharts'
      import Heading from '@/components/atoms/Heading'
      import ApperIcon from '@/components/ApperIcon'
      import Card from '@/components/atoms/Card'

      const ChartContainer = ({ title, chartOptions, chartSeries, chartType }) => {
        const hasData = chartSeries?.some(s => Array.isArray(s.data) ? s.data.length > 0 : s > 0);

        return (
          <Card motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
            <Heading level={3} className="text-xl mb-6">{title}</Heading>
            <div className="h-80">
              {hasData ? (
                <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type={chartType}
                  height="100%"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-surface-500">
                  <div className="text-center">
                    <ApperIcon name="BarChart3" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No data available for this chart</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )
      }

      export default ChartContainer