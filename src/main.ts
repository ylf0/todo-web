import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
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
  ElEmpty,
  ElMessage,
  ElTag,
  ElInfiniteScroll,
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
import 'element-plus/lib/theme-chalk/el-empty.css'
import 'element-plus/lib/theme-chalk/el-message-box.css'
import 'element-plus/lib/theme-chalk/el-message.css'
import 'element-plus/lib/theme-chalk/el-tag.css'

import routes from './routes'
import store from './store'
import App from './App.vue'
import './index.css'

locale(lang)

const router = createRouter({
  history: createWebHashHistory(),
  routes
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
  .use(ElEmpty)
  .use(ElMessage)
  .use(ElTag)
  .use(ElInfiniteScroll)
  .mount('#app')
