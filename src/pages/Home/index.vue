<template>
  <div class="flex">
    <div class="w-1/6 h-screen py-8 bg-gray-100">
      <router-link
        class="inline-block my-2 px-8 w-full"
        v-for="(menu, index) in menus"
        v-slot="{ isActive }"
        :key="index"
        :to="menu.path"
      >
        <span :class="{ 'text-blue-500 font-medium': isActive }">{{ menu.name }}</span>
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
        { name: 'Todo', path: ROUTES.todo },
        { name: '搜索', path: ROUTES.search },
        { name: '标签', path: ROUTES.tag }
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
