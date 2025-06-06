import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Chart from 'react-apexcharts'
import ApperIcon from './ApperIcon'
import * as goalService from '../services/api/goalService'

const MainFeature = ({ 
  accounts, 
  transactions, 
  budgets, 
  investments, 
  goals, 
  onGoalUpdate 
}) => {
  const [activeChart, setActiveChart] = useState('spending')
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    type: 'savings'
  })

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0)
  }

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
        dataLabels: { 
          enabled: true,
          formatter: (val) => `${val.toFixed(1)}%`
        },
        plotOptions: {
          pie: {
            donut: {
              size: '60%'
            }
          }
        },
        theme: { mode: 'light' }
      },
      series: Object.values(categorySpending)
    }
  }

  // Portfolio Allocation Chart Data
  const getPortfolioData = () => {
    const totalValue = investments.reduce((sum, inv) => sum + (inv.shares * inv.currentPrice), 0)
    
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

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setActiveChart('spending')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
            activeChart === 'spending'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
          }`}
        >
          <ApperIcon name="PieChart" size={18} />
          <span>Spending Categories</span>
        </button>
        
        <button
          onClick={() => setActiveChart('portfolio')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
            activeChart === 'portfolio'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
          }`}
        >
          <ApperIcon name="TrendingUp" size={18} />
          <span>Portfolio Allocation</span>
        </button>
        
        <button
          onClick={() => setActiveChart('trends')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
            activeChart === 'trends'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
          }`}
        >
          <ApperIcon name="BarChart3" size={18} />
          <span>Monthly Trends</span>
        </button>

        <button
          onClick={() => setShowGoalModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-xl hover:bg-secondary-dark transition-colors ml-auto"
        >
          <ApperIcon name="Plus" size={18} />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Interactive Chart */}
      <motion.div
        key={activeChart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-6">
          {activeChart === 'spending' && 'Spending by Category'}
          {activeChart === 'portfolio' && 'Investment Portfolio'}
          {activeChart === 'trends' && 'Income vs Expenses Trend'}
        </h3>
        
        <div className="h-80">
          {chartData[activeChart]?.series?.length > 0 ? (
            <Chart
              options={chartData[activeChart].options}
              series={chartData[activeChart].series}
              type={chartData[activeChart].options.chart.type}
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
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glassmorphism rounded-xl p-4 text-center hover:shadow-lg transition-all"
        >
          <ApperIcon name="CreditCard" className="mx-auto mb-2 text-primary" size={24} />
          <span className="text-sm font-medium text-surface-900 dark:text-white">Add Account</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glassmorphism rounded-xl p-4 text-center hover:shadow-lg transition-all"
        >
          <ApperIcon name="Receipt" className="mx-auto mb-2 text-secondary" size={24} />
          <span className="text-sm font-medium text-surface-900 dark:text-white">Add Transaction</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glassmorphism rounded-xl p-4 text-center hover:shadow-lg transition-all"
        >
          <ApperIcon name="Settings" className="mx-auto mb-2 text-accent" size={24} />
          <span className="text-sm font-medium text-surface-900 dark:text-white">Set Budget</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glassmorphism rounded-xl p-4 text-center hover:shadow-lg transition-all"
        >
          <ApperIcon name="FileText" className="mx-auto mb-2 text-purple-500" size={24} />
          <span className="text-sm font-medium text-surface-900 dark:text-white">Generate Report</span>
        </motion.button>
      </div>

      {/* Goal Creation Modal */}
      {showGoalModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowGoalModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white">Create Financial Goal</h3>
              <button
                onClick={() => setShowGoalModal(false)}
                className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>
            
            <form onSubmit={handleGoalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Goal Name
                </label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                  className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-surface-700 dark:text-white"
                  placeholder="e.g., Emergency Fund"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Target Amount
                  </label>
                  <input
                    type="number"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                    className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-surface-700 dark:text-white"
                    placeholder="10000"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Current Amount
                  </label>
                  <input
                    type="number"
                    value={newGoal.currentAmount}
                    onChange={(e) => setNewGoal({...newGoal, currentAmount: e.target.value})}
                    className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-surface-700 dark:text-white"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Target Date
                </label>
                <input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                  className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-surface-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Goal Type
                </label>
                <select
                  value={newGoal.type}
                  onChange={(e) => setNewGoal({...newGoal, type: e.target.value})}
                  className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-surface-700 dark:text-white"
                >
                  <option value="savings">Savings</option>
                  <option value="investment">Investment</option>
                  <option value="debt">Debt Payoff</option>
                  <option value="purchase">Purchase</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="flex-1 px-4 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default MainFeature