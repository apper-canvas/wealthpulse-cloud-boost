import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'
import Card from '../atoms/Card'
import Button from '../atoms/Button'
import AccountCard from '../molecules/AccountCard'

const AccountsPage = ({ accounts, formatCurrency, onAddAccount }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Accounts</h1>
        <div className="flex gap-3">
          <Button 
            onClick={onAddAccount}
            className="bg-primary text-white hover:bg-primary-dark"
          >
            <ApperIcon name="Plus" size={16} />
            Add Account
          </Button>
          <Button className="bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600">
            <ApperIcon name="Download" size={16} />
            Import
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map(account => (
          <AccountCard
            key={account.id}
            name={account.name}
            type={account.type}
            balance={account.balance}
            lastSync={account.lastSync}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>
    </div>
  )
}

export default AccountsPage