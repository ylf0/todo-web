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
    <router-view class="flex-1 h-screen p-8"/>
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

  computed: {
    todolists() {
      return this.$store.state.todolists
    }
  },
  
  methods: {
    addTodolist() {
      this.$store.commit('addTodo', { title: 'todo-title', done: false })
    }
  }
}
</script>
