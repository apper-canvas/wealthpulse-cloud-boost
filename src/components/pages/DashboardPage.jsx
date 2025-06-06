import React from 'react'
      import DashboardStats from '@/components/organisms/DashboardStats'
      import MainFeatureSection from '@/components/organisms/MainFeatureSection'

      const DashboardPage = ({
        accounts,
        transactions,
        budgets,
        investments,
        goals,
        onAccountUpdate,
        onTransactionUpdate,
        onBudgetUpdate,
        onInvestmentUpdate,
        onGoalUpdate,
        calculateMonthlyIncome,
        calculateMonthlyExpenses,
        formatCurrency
      }) => {
        const calculateSavingsRate = () => {
          const income = calculateMonthlyIncome()
          const expenses = calculateMonthlyExpenses()
          if (income > 0) {
            return `${Math.round(((income - expenses) / income) * 100)}%`
          }
          return '0%'
        }

        return (
          <div className="space-y-6">
            <DashboardStats
              monthlyIncome={calculateMonthlyIncome()}
              monthlyExpenses={calculateMonthlyExpenses()}
              savingsRate={calculateSavingsRate()}
              formatCurrency={formatCurrency}
            />
            <MainFeatureSection
              accounts={accounts}
              transactions={transactions}
              budgets={budgets}
              investments={investments}
              goals={goals}
              onAccountUpdate={onAccountUpdate}
              onTransactionUpdate={onTransactionUpdate}
              onBudgetUpdate={onBudgetUpdate}
              onInvestmentUpdate={onInvestmentUpdate}
              onGoalUpdate={onGoalUpdate}
            />
          </div>
        )
      }

      export default DashboardPage