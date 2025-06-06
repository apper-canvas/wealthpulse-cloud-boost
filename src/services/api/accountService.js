import accountsData from '../mockData/accounts.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage
let accounts = [...accountsData]

export const getAll = async () => {
  await delay(300)
  return [...accounts]
}

export const getById = async (id) => {
  await delay(200)
  const account = accounts.find(a => a.id === id)
  return account ? { ...account } : null
}

export const create = async (accountData) => {
  await delay(400)
  const newAccount = {
    ...accountData,
    id: Date.now().toString(),
    lastSync: new Date().toISOString()
  }
  accounts.push(newAccount)
  return { ...newAccount }
}

export const update = async (id, updateData) => {
  await delay(350)
  const index = accounts.findIndex(a => a.id === id)
  if (index === -1) throw new Error('Account not found')
  
  accounts[index] = { ...accounts[index], ...updateData }
  return { ...accounts[index] }
}

export const deleteAccount = async (id) => {
  await delay(250)
  const index = accounts.findIndex(a => a.id === id)
  if (index === -1) throw new Error('Account not found')
  
  const deleted = accounts.splice(index, 1)[0]
  return { ...deleted }
}