import React from 'react'
      import { motion } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'
      import Heading from '@/components/atoms/Heading'
      import Button from '@/components/atoms/Button'
      import GoalInput from '@/components/molecules/GoalInput'

      const GoalCreationModal = ({ show, onClose, newGoal, onGoalChange, onGoalSubmit }) => {
        if (!show) return null

        const goalTypeOptions = [
          { value: 'savings', label: 'Savings' },
          { value: 'investment', label: 'Investment' },
          { value: 'debt', label: 'Debt Payoff' },
          { value: 'purchase', label: 'Purchase' },
        ]

        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <Heading level={3} className="text-xl">Create Financial Goal</Heading>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>
              
              <form onSubmit={onGoalSubmit} className="space-y-4">
                <GoalInput
                  label="Goal Name"
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => onGoalChange('name', e.target.value)}
                  placeholder="e.g., Emergency Fund"
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <GoalInput
                    label="Target Amount"
                    type="number"
                    value={newGoal.targetAmount}
                    onChange={(e) => onGoalChange('targetAmount', e.target.value)}
                    placeholder="10000"
                    min="0"
                    step="0.01"
                    required
                  />
                  
                  <GoalInput
                    label="Current Amount"
                    type="number"
                    value={newGoal.currentAmount}
                    onChange={(e) => onGoalChange('currentAmount', e.target.value)}
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <GoalInput
                  label="Target Date"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => onGoalChange('targetDate', e.target.value)}
                  required
                />
                
                <GoalInput
                  label="Goal Type"
                  type="select"
                  value={newGoal.type}
                  onChange={(e) => onGoalChange('type', e.target.value)}
                  options={goalTypeOptions}
                />
                
                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    onClick={onClose}
                    className="flex-1 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary text-white hover:bg-primary-dark"
                  >
                    Create Goal
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )
      }

      export default GoalCreationModal