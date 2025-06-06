import goalsData from '../mockData/goals.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage
let goals = [...goalsData]

export const getAll = async () => {
  await delay(300)
  return [...goals]
}

export const getById = async (id) => {
  await delay(200)
  const goal = goals.find(g => g.id === id)
  return goal ? { ...goal } : null
}

export const create = async (goalData) => {
  await delay(400)
  const newGoal = {
    ...goalData,
    id: Date.now().toString(),
    currentAmount: goalData.currentAmount || 0
  }
  goals.push(newGoal)
  return { ...newGoal }
}

export const update = async (id, updateData) => {
  await delay(350)
  const index = goals.findIndex(g => g.id === id)
  if (index === -1) throw new Error('Goal not found')
  
  goals[index] = { ...goals[index], ...updateData }
  return { ...goals[index] }
}

export const deleteGoal = async (id) => {
  await delay(250)
  const index = goals.findIndex(g => g.id === id)
  if (index === -1) throw new Error('Goal not found')
  
  const deleted = goals.splice(index, 1)[0]
  return { ...deleted }
}