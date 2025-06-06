import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '../ApperIcon'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import Select from '../atoms/Select'
import Label from '../atoms/Label'

const AccountCreationModal = ({ isOpen, onClose, onCreateAccount }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'checking',
    bank: '',
    balance: '',
    accountNumber: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const accountTypes = [
    { value: 'checking', label: 'Checking Account' },
    { value: 'savings', label: 'Savings Account' },
    { value: 'credit', label: 'Credit Card' },
    { value: 'investment', label: 'Investment Account' },
    { value: 'loan', label: 'Loan Account' }
  ]

  const banks = [
    { value: 'chase', label: 'Chase Bank' },
    { value: 'bofa', label: 'Bank of America' },
    { value: 'wells', label: 'Wells Fargo' },
    { value: 'citi', label: 'Citibank' },
    { value: 'pnc', label: 'PNC Bank' },
    { value: 'usbank', label: 'US Bank' },
    { value: 'other', label: 'Other' }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Account name is required'
    }

    if (!formData.bank) {
      newErrors.bank = 'Bank selection is required'
    }

    if (!formData.balance.trim()) {
      newErrors.balance = 'Initial balance is required'
    } else if (isNaN(parseFloat(formData.balance))) {
      newErrors.balance = 'Please enter a valid number'
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const accountData = {
        name: formData.name.trim(),
        type: formData.type,
        bank: formData.bank,
        balance: parseFloat(formData.balance),
        accountNumber: formData.accountNumber.trim(),
        status: 'active'
      }

      await onCreateAccount(accountData)
      
      // Reset form
      setFormData({
        name: '',
        type: 'checking',
        bank: '',
        balance: '',
        accountNumber: ''
      })
      setErrors({})
      onClose()
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to create account' })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setFormData({
        name: '',
        type: 'checking',
        bank: '',
        balance: '',
        accountNumber: ''
      })
      setErrors({})
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-surface-900 dark:text-white">
                Add New Account
              </h2>
              <button
                onClick={handleClose}
                disabled={loading}
                className="p-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 rounded-lg transition-colors"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="accountName">Account Name</Label>
                <Input
                  id="accountName"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Main Checking"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="accountType">Account Type</Label>
                <Select
                  id="accountType"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  options={accountTypes}
                />
              </div>

              <div>
                <Label htmlFor="bank">Bank</Label>
                <Select
                  id="bank"
                  value={formData.bank}
                  onChange={(e) => handleInputChange('bank', e.target.value)}
                  options={[{ value: '', label: 'Select a bank' }, ...banks]}
                  className={errors.bank ? 'border-red-500' : ''}
                />
                {errors.bank && (
                  <p className="text-red-500 text-sm mt-1">{errors.bank}</p>
                )}
              </div>

              <div>
                <Label htmlFor="balance">Initial Balance</Label>
                <Input
                  id="balance"
                  type="number"
                  step="0.01"
                  value={formData.balance}
                  onChange={(e) => handleInputChange('balance', e.target.value)}
                  placeholder="0.00"
                  className={errors.balance ? 'border-red-500' : ''}
                />
                {errors.balance && (
                  <p className="text-red-500 text-sm mt-1">{errors.balance}</p>
                )}
              </div>

              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder="****1234"
                  className={errors.accountNumber ? 'border-red-500' : ''}
                />
                {errors.accountNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
                )}
              </div>

              {errors.submit && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400 text-sm">{errors.submit}</p>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary text-white hover:bg-primary-dark disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Plus" size={16} />
                      Create Account
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AccountCreationModal