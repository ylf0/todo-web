import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createStore } from 'vuex'

import { ITodo } from './types'
import routes from './routes'

import App from './App.vue'
import './index.css'

interface IStoreState {
  todolists: ITodo[]
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/**
 * why Vuex:
 *  - reactive
 *  - manage state
 */

// Create a new store instance.
const store = createStore({
  state() {
    return {
      todolists: []
    }
  },

  mutations: {
    addTodo (state: IStoreState, todo: ITodo) {
      state.todolists.push(todo)
    }
  }
})

const app = createApp(App)

// router guard.
router.beforeEach(
  to => {
    console.info('to: ', to)
  }
)

// Install the store instance as a plugin.
app.use(router).use(store).mount('#app')
