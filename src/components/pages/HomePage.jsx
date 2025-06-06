import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '../ApperIcon'
import PageHeader from '@/components/organisms/PageHeader'
import MobileNavigation from '@/components/organisms/MobileNavigation'
import DashboardPage from '@/components/pages/DashboardPage'
import AccountsPage from '@/components/pages/AccountsPage'
import BudgetPage from '@/components/pages/BudgetPage'
import InvestmentsPage from '@/components/pages/InvestmentsPage'
import GoalsPage from '@/components/pages/GoalsPage'
import * as accountService from '@/services/api/accountService'
import * as transactionService from '@/services/api/transactionService'
import * as budgetService from '@/services/api/budgetService'
import * as investmentService from '@/services/api/investmentService'
import * as goalService from '@/services/api/goalService'

      const HomePage = () => {
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
            <PageHeader
              netWorth={calculateNetWorth()}
              formatCurrency={formatCurrency}
              darkMode={darkMode}
              toggleDarkMode={() => setDarkMode(!darkMode)}
            />

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
                        <DashboardPage
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
                          calculateMonthlyIncome={calculateMonthlyIncome}
                          calculateMonthlyExpenses={calculateMonthlyExpenses}
                          formatCurrency={formatCurrency}
                        />
                      )}

                      {activeTab === 'accounts' && (
                        <AccountsPage accounts={accounts} formatCurrency={formatCurrency} />
                      )}

                      {activeTab === 'budget' && (
                        <BudgetPage budgets={budgets} formatCurrency={formatCurrency} />
                      )}

                      {activeTab === 'investments' && (
                        <InvestmentsPage investments={investments} formatCurrency={formatCurrency} />
                      )}

                      {activeTab === 'goals' && (
                        <GoalsPage goals={goals} formatCurrency={formatCurrency} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <MobileNavigation
              menuItems={menuItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        )
      }

      export default HomePage