import { ITodo } from '@/types'
import { ITodo } from '../../types'

interface IStoreState {
  todos: ITodo[]
}

const state = {
  todos: []
}

const getters = {
  nextId: (state: IStoreState) => `todo-${state.todos.length + 1}`
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
