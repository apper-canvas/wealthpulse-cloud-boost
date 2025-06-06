import budgetsData from '../mockData/budgets.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage
let budgets = [...budgetsData]

export const getAll = async () => {
  await delay(300)
  return [...budgets]
}

export const getByCategory = async (category) => {
  await delay(200)
  const budget = budgets.find(b => b.category === category)
  return budget ? { ...budget } : null
}

export const create = async (budgetData) => {
  await delay(400)
  const newBudget = {
    ...budgetData,
    spent: budgetData.spent || 0,
    period: budgetData.period || 'monthly'
  }
  budgets.push(newBudget)
  return { ...newBudget }
}

export const update = async (category, updateData) => {
  await delay(350)
  const index = budgets.findIndex(b => b.category === category)
  if (index === -1) throw new Error('Budget not found')
  
  budgets[index] = { ...budgets[index], ...updateData }
  return { ...budgets[index] }
}

export const deleteBudget = async (category) => {
  await delay(250)
  const index = budgets.findIndex(b => b.category === category)
  if (index === -1) throw new Error('Budget not found')
  
  const deleted = budgets.splice(index, 1)[0]
  return { ...deleted }
}