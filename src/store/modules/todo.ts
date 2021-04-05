import { ITodo } from '@/types'

interface IStoreState {
  todos: ITodo[]
}

function mockData() {
  const mockList = []

  for (let i = 0; i < 50; i ++) {
    mockList.push({
      id: `todo-${i + 1}`,
      title: `todo-${i + 1}`,
      done: i % 4 === 0,
      priorityType: i % 4
    })
  }

  return mockList
}

const state = {
  todos: mockData()
}

const getters = {
  nextId: (state: IStoreState) => `todo-${state.todos.length + 1}`,
  done: (state: IStoreState) => state.todos.filter(todo => todo.done),
  undone: (state: IStoreState) => state.todos.filter(todo => !todo.done),
  endDate: (state: IStoreState) => {
    return state.todos
            .filter(todo => !todo.done)
            .sort((a, b) => (Date.parse(b.endDate) || 0) - (Date.parse(a.priorityType) || 0))
  },
  priority: (state: IStoreState) => {
    return state.todos
            .filter(todo => !todo.done)
            .sort((a, b) => b.priorityType - a.priorityType)
  },
  getTodoByPage: (state: IStoreState, getters: any) => {
    return (pageNum: number, pageSize: number, type: string) => {
      if (Array.isArray(getters[type])) return getters[type].slice((pageNum - 1) * pageSize, pageNum * pageSize)
      return []
    }
  },
  getTotalSize: (state: IStoreState, getters: any) => {
    return (type: string) => {
      if (Array.isArray(getters[type])) return getters[type].length
      return 0
    }
  },

  getSearchTodo: (state: IStoreState) => {
    return (searchWord: string) => {
      return state.todos.filter(todo => RegExp(searchWord, 'gi').test(todo.title))
    }
  }
}

const mutations = {
  addTodo(state: IStoreState, todo: ITodo) {
    state.todos.push(todo)
  },

  updateTodo(state: IStoreState, todo: ITodo) {
    const targetIndex = state.todos.findIndex(({ id }) => id === todo.id)
    if (targetIndex !== -1) state.todos.splice(targetIndex, 1, todo)
  },

  deleteTodo(state: IStoreState, todo: ITodo) {
    const targetIndex = state.todos.findIndex(({ id }) => id === todo.id)
    if (targetIndex !== -1) state.todos.splice(targetIndex, 1)
  },

  dragTodo(state: IStoreState, info: any) {
    const { sourceId, targetId } = info
    const { todos } = state

    const sourceIndex = state.todos.findIndex(({ id }) => id === sourceId)
    const targetIndex = state.todos.findIndex(({ id }) => id === targetId)

    if (sourceIndex !== -1 && targetIndex !== -1) {
      const source = Object.assign({}, todos[sourceIndex])
      const target = Object.assign({}, todos[targetIndex])
      todos.splice(targetIndex, 1, source)
      todos.splice(sourceIndex, 1, target)
    }
  }
}

export default {
  namespaced: false,
  state,
  getters,
  mutations
}
