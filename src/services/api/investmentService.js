import investmentsData from '../mockData/investments.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage
let investments = [...investmentsData]

export const getAll = async () => {
  await delay(300)
  return [...investments]
}

export const getBySymbol = async (symbol) => {
  await delay(200)
  const investment = investments.find(i => i.symbol === symbol)
  return investment ? { ...investment } : null
}

export const create = async (investmentData) => {
  await delay(400)
  const newInvestment = {
    ...investmentData,
    currentPrice: investmentData.currentPrice || investmentData.purchasePrice,
    allocation: investmentData.allocation || 0
  }
  investments.push(newInvestment)
  return { ...newInvestment }
}

export const update = async (symbol, updateData) => {
  await delay(350)
  const index = investments.findIndex(i => i.symbol === symbol)
  if (index === -1) throw new Error('Investment not found')
  
  investments[index] = { ...investments[index], ...updateData }
  return { ...investments[index] }
}

export const deleteInvestment = async (symbol) => {
  await delay(250)
  const index = investments.findIndex(i => i.symbol === symbol)
  if (index === -1) throw new Error('Investment not found')
  
  const deleted = investments.splice(index, 1)[0]
  return { ...deleted }
}