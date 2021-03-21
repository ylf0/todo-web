import { createStore, createLogger } from 'vuex'
import todo from './modules/todo'

export default createStore({
  modules: { todo },
  plugins: [createLogger()]
})
