import React from 'react'
      import MetricCard from '@/components/molecules/MetricCard'

      const DashboardStats = ({ monthlyIncome, monthlyExpenses, savingsRate, formatCurrency }) => {
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Monthly Income"
              value={formatCurrency(monthlyIncome)}
              iconName="TrendingUp"
              iconBgClass="bg-secondary/10"
              iconColorClass="text-secondary"
              delay={0}
            />
            <MetricCard
              title="Monthly Expenses"
              value={formatCurrency(monthlyExpenses)}
              iconName="TrendingDown"
              iconBgClass="bg-red-500/10"
              iconColorClass="text-red-500"
              delay={0.1}
            />
            <MetricCard
              title="Savings Rate"
              value={savingsRate}
              iconName="PiggyBank"
              iconBgClass="bg-accent/10"
              iconColorClass="text-accent"
              delay={0.2}
            />
          </div>
        )
      }

      export default DashboardStats