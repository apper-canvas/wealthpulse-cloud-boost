import transactionsData from '../mockData/transactions.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage
let transactions = [...transactionsData]

export const getAll = async () => {
  await delay(300)
  return [...transactions]
}

export const getById = async (id) => {
  await delay(200)
  const transaction = transactions.find(t => t.id === id)
  return transaction ? { ...transaction } : null
}

export const getByAccountId = async (accountId) => {
  await delay(250)
  return transactions.filter(t => t.accountId === accountId).map(t => ({ ...t }))
}

export const create = async (transactionData) => {
  await delay(400)
  const newTransaction = {
    ...transactionData,
    id: Date.now().toString(),
    date: transactionData.date || new Date().toISOString()
  }
  transactions.push(newTransaction)
  return { ...newTransaction }
}

export const update = async (id, updateData) => {
  await delay(350)
  const index = transactions.findIndex(t => t.id === id)
  if (index === -1) throw new Error('Transaction not found')
  
  transactions[index] = { ...transactions[index], ...updateData }
  return { ...transactions[index] }
}

export const deleteTransaction = async (id) => {
  await delay(250)
  const index = transactions.findIndex(t => t.id === id)
  if (index === -1) throw new Error('Transaction not found')
  
  const deleted = transactions.splice(index, 1)[0]
  return { ...deleted }
}