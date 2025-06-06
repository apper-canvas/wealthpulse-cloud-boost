import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import ChartToggle from '@/components/atoms/ChartToggle'
import Button from '@/components/atoms/Button'
import ChartContainer from '@/components/molecules/ChartContainer'
import GoalCreationModal from '@/components/organisms/GoalCreationModal'
import goalService from '@/services/goalService'
const MainFeatureSection = ({ 
  formatCurrency, 
  totalBalance, 
  monthlyIncome, 
  monthlyExpenses, 
  totalInvestments, 
  recentTransactions,
  transactions = [],
  investments = [],
  onAddAccount,
  onAddTransaction,
  onSetBudget,
  onGenerateReport,
  onGoalUpdate
}) => {
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    type: 'savings'
  })

  const [activeChart, setActiveChart] = useState('spending')
  const [showGoalModal, setShowGoalModal] = useState(false)
// Spending Categories Chart Data
  const getSpendingData = () => {
    const categorySpending = {}
    transactions
      .filter(t => t.amount < 0)
      .forEach(t => {
        categorySpending[t.category] = (categorySpending[t.category] || 0) + Math.abs(t.amount)
      })
    
    return {
      options: {
        chart: { type: 'donut' },
        labels: Object.keys(categorySpending),
        colors: ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'],
        legend: { position: 'bottom' },
        dataLabels: { enabled: true },
        theme: { mode: 'light' }
      },
      series: Object.values(categorySpending)
    }
  }

        // Portfolio Allocation Chart Data
        const getPortfolioData = () => {
          // Calculate total value only if there are investments to avoid division by zero for percentage
          const totalValue = investments.reduce((sum, inv) => sum + (inv.shares * inv.currentPrice), 0);
          
          return {
            options: {
              chart: { type: 'pie' },
              labels: investments.map(inv => inv.symbol),
              colors: ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'],
              legend: { position: 'bottom' },
              dataLabels: { 
                enabled: true,
                formatter: (val, opts) => {
                  const symbol = opts.w.globals.labels[opts.seriesIndex]
                  return `${symbol}\n${val.toFixed(1)}%`
                }
              },
              theme: { mode: 'light' }
            },
            series: investments.map(inv => inv.shares * inv.currentPrice)
          }
        }

        // Monthly Trends Chart Data
        const getTrendsData = () => {
          const monthlyData = {}
          transactions.forEach(t => {
            const month = new Date(t.date).toISOString().slice(0, 7)
            if (!monthlyData[month]) {
              monthlyData[month] = { income: 0, expenses: 0 }
            }
            if (t.amount > 0) {
              monthlyData[month].income += t.amount
            } else {
              monthlyData[month].expenses += Math.abs(t.amount)
            }
          })

          const months = Object.keys(monthlyData).sort().slice(-6)
          
          return {
            options: {
              chart: { type: 'area', stacked: false },
              xaxis: { 
                categories: months.map(m => new Date(m).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }))
              },
              colors: ['#10B981', '#EF4444'],
              stroke: { curve: 'smooth', width: 3 },
              fill: { 
                type: 'gradient',
                gradient: {
                  shadeIntensity: 1,
                  opacityFrom: 0.7,
                  opacityTo: 0.1
                }
              },
              dataLabels: { enabled: false },
              legend: { position: 'top' },
              theme: { mode: 'light' }
            },
            series: [
              {
                name: 'Income',
                data: months.map(m => monthlyData[m]?.income || 0)
              },
              {
                name: 'Expenses',
                data: months.map(m => monthlyData[m]?.expenses || 0)
              }
            ]
          }
        }

        const handleGoalChange = (field, value) => {
          setNewGoal(prev => ({ ...prev, [field]: value }))
        }

        const handleGoalSubmit = async (e) => {
          e.preventDefault()
          try {
            const goalData = {
              ...newGoal,
              targetAmount: parseFloat(newGoal.targetAmount),
              currentAmount: parseFloat(newGoal.currentAmount) || 0
            }
            
            const createdGoal = await goalService.create(goalData)
            onGoalUpdate(prev => [...prev, createdGoal])
            setShowGoalModal(false)
            setNewGoal({
              name: '',
              targetAmount: '',
              currentAmount: '',
              targetDate: '',
              type: 'savings'
            })
            toast.success('Goal created successfully!')
          } catch (error) {
            toast.error('Failed to create goal')
          }
        }

        const chartData = {
          spending: getSpendingData(),
          portfolio: getPortfolioData(),
          trends: getTrendsData()
        }

const quickActions = [
    { name: 'Add Account', icon: 'CreditCard', color: 'text-primary', action: onAddAccount },
    { name: 'Add Transaction', icon: 'Receipt', color: 'text-secondary', action: onAddTransaction },
    { name: 'Set Budget', icon: 'Settings', color: 'text-accent', action: onSetBudget },
    { name: 'Generate Report', icon: 'FileText', color: 'text-purple-500', action: onGenerateReport },
  ]
return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex flex-wrap gap-3">
        <ChartToggle
          label="Spending Categories"
          iconName="PieChart"
          isActive={activeChart === 'spending'}
          onClick={() => setActiveChart('spending')}
        />
        
        <ChartToggle
          label="Portfolio Allocation"
          iconName="TrendingUp"
          isActive={activeChart === 'portfolio'}
          onClick={() => setActiveChart('portfolio')}
        />
        
        <ChartToggle
          label="Monthly Trends"
          iconName="BarChart3"
          isActive={activeChart === 'trends'}
          onClick={() => setActiveChart('trends')}
        />

        <Button
          onClick={() => setShowGoalModal(true)}
          className="bg-secondary text-white hover:bg-secondary-dark ml-auto"
          icon={<ApperIcon name="Plus" size={18} />}
        >
          Add Goal
        </Button>
      </div>

      {/* Interactive Chart */}
      <ChartContainer
        title={
          activeChart === 'spending'
            ? 'Spending by Category'
            : activeChart === 'portfolio'
            ? 'Investment Portfolio'
            : 'Income vs Expenses Trend'
        }
        chartOptions={chartData[activeChart].options}
        chartSeries={chartData[activeChart].series}
        chartType={chartData[activeChart].options.chart.type}
      />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.action}
            className="glassmorphism rounded-xl p-4 text-center hover:shadow-lg transition-all"
          >
            <ApperIcon name={action.icon} className={`mx-auto mb-2 ${action.color}`} size={24} />
            <span className="text-sm font-medium text-surface-900 dark:text-white">{action.name}</span>
          </motion.button>
        ))}
      </div>

      <GoalCreationModal
        show={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        newGoal={newGoal}
        onGoalChange={handleGoalChange}
        onGoalSubmit={handleGoalSubmit}
      />
    </div>
  )
}

      export default MainFeatureSection