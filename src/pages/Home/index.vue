<template>
  <div class="flex">
    <div class="w-1/6 h-screen py-8 bg-gray-100">
      <router-link
        class="flex items-center my-4 px-8 w-full"
        v-for="(menu, index) in menus"
        v-slot="{ isActive }"
        :key="index"
        :to="menu.path"
      >
        <i class="text-xl text-gray-400 mt-0.5 mr-2" :class="{ [menu.icon]: true, 'text-blue-400': isActive }"/>
        <span :class="{ 'text-blue-500': isActive }">{{ menu.name }}</span>
      </router-link>
    </div>
    <router-view class="flex-1 h-screen p-8" :class="{ 'bg-gray-500': isDarkMode, 'bg-white': !isDarkMode }"/>
    <div class="fixed left-8 bottom-4 w-full">
      <a href="https://beian.miit.gov.cn" target="_blank">皖ICP备20003040号-1</a>
    </div>
  </div>
</template>

<script>
import { ROUTES } from '@/constants'

export default {
  name: 'Home',

  setup() {
    return {
      menus: [
        { name: 'Todo', path: ROUTES.todo, icon: 'el-icon-news' },
        { name: '搜索', path: ROUTES.search, icon: 'el-icon-search' },
        { name: '收集箱', path: ROUTES.tag, icon: 'el-icon-receiving' },
        { name: '便签', path: ROUTES.note, icon: 'el-icon-notebook-2' },
      ],
    }
  },

  data() {
    return {
      mode: 'light'
    }
  },

  computed: {
    todolists() {
      return this.$store.state.todolists
    },

    isDarkMode() {
      return this.mode === 'dark'
    }
  },
  
  methods: {
    addTodolist() {
      this.$store.commit('addTodo', { title: 'todo-title', done: false })
    },

    toggleMode() {
      if (this.mode === 'light') {
        this.mode = 'dark'
      } else {
        this.mode = 'light'
      }
    },
  }
}
</script>
