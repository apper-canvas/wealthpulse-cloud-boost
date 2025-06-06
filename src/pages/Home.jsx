import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import * as accountService from '../services/api/accountService'
import * as transactionService from '../services/api/transactionService'
import * as budgetService from '../services/api/budgetService'
import * as investmentService from '../services/api/investmentService'
import * as goalService from '../services/api/goalService'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [budgets, setBudgets] = useState([])
  const [investments, setInvestments] = useState([])
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [accountsData, transactionsData, budgetsData, investmentsData, goalsData] = await Promise.all([
          accountService.getAll(),
          transactionService.getAll(),
          budgetService.getAll(),
          investmentService.getAll(),
          goalService.getAll()
        ])
        setAccounts(accountsData || [])
        setTransactions(transactionsData || [])
        setBudgets(budgetsData || [])
        setInvestments(investmentsData || [])
        setGoals(goalsData || [])
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const calculateNetWorth = () => {
    const accountsTotal = accounts.reduce((sum, account) => sum + (account.balance || 0), 0)
    const investmentValue = investments.reduce((sum, inv) => sum + ((inv.shares || 0) * (inv.currentPrice || 0)), 0)
    return accountsTotal + investmentValue
  }

  const calculateMonthlyIncome = () => {
    const currentMonth = new Date().getMonth()
    return transactions
      .filter(t => t.amount > 0 && new Date(t.date).getMonth() === currentMonth)
      .reduce((sum, t) => sum + t.amount, 0)
  }

  const calculateMonthlyExpenses = () => {
    const currentMonth = new Date().getMonth()
    return transactions
      .filter(t => t.amount < 0 && new Date(t.date).getMonth() === currentMonth)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0)
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'accounts', label: 'Accounts', icon: 'CreditCard' },
    { id: 'budget', label: 'Budget', icon: 'PieChart' },
    { id: 'investments', label: 'Investments', icon: 'TrendingUp' },
    { id: 'goals', label: 'Goals', icon: 'Target' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-surface-600 dark:text-surface-400">Loading your financial data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-800/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="DollarSign" className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold text-surface-900 dark:text-white">WealthPulse</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                <span className="text-surface-600 dark:text-surface-400">Net Worth:</span>
                <span className="font-semibold text-lg tabular-nums text-secondary">
                  {formatCurrency(calculateNetWorth())}
                </span>
              </div>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name={darkMode ? 'Sun' : 'Moon'} size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 hidden lg:block">
          <nav className="p-4 space-y-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <ApperIcon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glassmorphism rounded-2xl p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-surface-600 dark:text-surface-400 text-sm">Monthly Income</p>
                            <p className="text-2xl font-bold text-secondary tabular-nums">
                              {formatCurrency(calculateMonthlyIncome())}
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                            <ApperIcon name="TrendingUp" className="text-secondary" size={24} />
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="glassmorphism rounded-2xl p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-surface-600 dark:text-surface-400 text-sm">Monthly Expenses</p>
                            <p className="text-2xl font-bold text-red-500 tabular-nums">
                              {formatCurrency(calculateMonthlyExpenses())}
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                            <ApperIcon name="TrendingDown" className="text-red-500" size={24} />
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="glassmorphism rounded-2xl p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-surface-600 dark:text-surface-400 text-sm">Savings Rate</p>
                            <p className="text-2xl font-bold text-accent tabular-nums">
                              {calculateMonthlyIncome() > 0 
                                ? `${Math.round(((calculateMonthlyIncome() - calculateMonthlyExpenses()) / calculateMonthlyIncome()) * 100)}%`
                                : '0%'
                              }
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                            <ApperIcon name="PiggyBank" className="text-accent" size={24} />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Interactive Feature */}
                    <MainFeature 
                      accounts={accounts}
                      transactions={transactions}
                      budgets={budgets}
                      investments={investments}
                      goals={goals}
                      onAccountUpdate={setAccounts}
                      onTransactionUpdate={setTransactions}
                      onBudgetUpdate={setBudgets}
                      onInvestmentUpdate={setInvestments}
                      onGoalUpdate={setGoals}
                    />
                  </div>
                )}

                {activeTab === 'accounts' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Accounts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {accounts.map(account => (
                        <motion.div
                          key={account.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="glassmorphism rounded-2xl p-6"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-surface-900 dark:text-white">{account.name}</h3>
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                              {account.type}
                            </span>
                          </div>
                          <p className="text-2xl font-bold tabular-nums text-surface-900 dark:text-white">
                            {formatCurrency(account.balance)}
                          </p>
                          <p className="text-sm text-surface-500 mt-2">
                            Last updated: {new Date(account.lastSync).toLocaleDateString()}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'budget' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Budget Tracking</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {budgets.map(budget => {
                        const percentage = (budget.spent / budget.limit) * 100
                        const isOverBudget = percentage > 100
                        return (
                          <motion.div
                            key={budget.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glassmorphism rounded-2xl p-6"
                          >
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-semibold text-surface-900 dark:text-white">{budget.category}</h3>
                              <span className={`text-sm font-medium ${isOverBudget ? 'text-red-500' : 'text-secondary'}`}>
                                {Math.round(percentage)}%
                              </span>
                            </div>
                            <div className="mb-3">
                              <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-3">
                                <div
                                  className={`h-3 rounded-full transition-all duration-500 ${
                                    isOverBudget ? 'bg-red-500' : 'bg-secondary'
                                  }`}
                                  style={{ width: `${Math.min(percentage, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-surface-600 dark:text-surface-400">
                                Spent: {formatCurrency(budget.spent)}
                              </span>
                              <span className="text-surface-600 dark:text-surface-400">
                                Limit: {formatCurrency(budget.limit)}
                              </span>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'investments' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Investment Portfolio</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {investments.map(investment => {
                        const currentValue = investment.shares * investment.currentPrice
                        const totalCost = investment.shares * investment.purchasePrice
                        const gainLoss = currentValue - totalCost
                        const gainLossPercentage = (gainLoss / totalCost) * 100
                        
                        return (
                          <motion.div
                            key={investment.symbol}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glassmorphism rounded-2xl p-6"
                          >
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-semibold text-surface-900 dark:text-white">{investment.symbol}</h3>
                              <span className="text-xs px-2 py-1 bg-surface-100 dark:bg-surface-700 rounded-full">
                                {investment.allocation}%
                              </span>
                            </div>
                            <p className="text-xl font-bold tabular-nums text-surface-900 dark:text-white mb-2">
                              {formatCurrency(currentValue)}
                            </p>
                            <div className="flex items-center space-x-2">
                              <ApperIcon 
                                name={gainLoss >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                                className={gainLoss >= 0 ? 'text-secondary' : 'text-red-500'}
                                size={16}
                              />
                              <span className={`text-sm font-medium ${gainLoss >= 0 ? 'text-secondary' : 'text-red-500'}`}>
                                {gainLoss >= 0 ? '+' : ''}{formatCurrency(gainLoss)} ({gainLossPercentage.toFixed(2)}%)
                              </span>
                            </div>
                            <p className="text-xs text-surface-500 mt-2">
                              {investment.shares} shares @ {formatCurrency(investment.currentPrice)}
                            </p>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'goals' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Financial Goals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {goals.map(goal => {
                        const percentage = (goal.currentAmount / goal.targetAmount) * 100
                        const remaining = goal.targetAmount - goal.currentAmount
                        
                        return (
                          <motion.div
                            key={goal.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glassmorphism rounded-2xl p-6"
                          >
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-semibold text-surface-900 dark:text-white">{goal.name}</h3>
                              <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                                {goal.type}
                              </span>
                            </div>
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-surface-600 dark:text-surface-400">Progress</span>
                                <span className="font-medium">{Math.round(percentage)}%</span>
                              </div>
                              <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-3">
                                <div
                                  className="h-3 bg-accent rounded-full transition-all duration-500"
                                  style={{ width: `${Math.min(percentage, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-surface-600 dark:text-surface-400">Current:</span>
                                <span className="font-medium tabular-nums">{formatCurrency(goal.currentAmount)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-surface-600 dark:text-surface-400">Target:</span>
                                <span className="font-medium tabular-nums">{formatCurrency(goal.targetAmount)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-surface-600 dark:text-surface-400">Remaining:</span>
                                <span className="font-medium tabular-nums">{formatCurrency(remaining)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-surface-600 dark:text-surface-400">Target Date:</span>
                                <span className="font-medium">{new Date(goal.targetDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700">
        <div className="flex justify-around py-2">
          {menuItems.slice(0, 5).map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 ${
                activeTab === item.id ? 'text-primary' : 'text-surface-400'
              }`}
            >
              <ApperIcon name={item.icon} size={20} />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home