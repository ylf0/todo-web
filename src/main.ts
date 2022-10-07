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
