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
  }
}

export default {
  namespaced: false,
  state,
  getters,
  mutations
}
