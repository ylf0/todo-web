import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createStore } from 'vuex'
import {
  ElButton,
  ElCheckbox,
  ElDrawer,
  ElDivider,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElIcon,
  ElInput,
  ElDatePicker,
  locale
} from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'

import 'element-plus/lib/theme-chalk/el-button.css'
import 'element-plus/lib/theme-chalk/el-checkbox.css'
import 'element-plus/lib/theme-chalk/el-drawer.css'
import 'element-plus/lib/theme-chalk/el-divider.css'
import 'element-plus/lib/theme-chalk/el-dropdown.css'
import 'element-plus/lib/theme-chalk/el-dropdown-menu.css'
import 'element-plus/lib/theme-chalk/el-dropdown-item.css'
import 'element-plus/lib/theme-chalk/el-icon.css'
import 'element-plus/lib/theme-chalk/el-input.css'
import 'element-plus/lib/theme-chalk/el-date-picker.css'

import { ITodo } from './types'
import routes from './routes'

import App from './App.vue'
import './index.css'

interface IStoreState {
  todolists: ITodo[]
}

locale(lang)

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
      todolists: [
        { title: 'mock-data-1', done: false },
        { title: 'mock-data-2', done: false },
        { title: 'mock-data-3', done: true }
      ]
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

// Install plugins.
app
  .use(router)
  .use(store)
  .use(ElButton)
  .use(ElCheckbox)
  .use(ElDrawer)
  .use(ElDivider)
  .use(ElDropdown)
  .use(ElDropdownMenu)
  .use(ElDropdownItem)
  .use(ElIcon)
  .use(ElInput)
  .use(ElDatePicker)
  .mount('#app')
