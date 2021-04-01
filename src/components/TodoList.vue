<template>
  <div
    class="flex items-center mb-4 pl-2 py-2 todo-width border-l-4 rounded bg-white cursor-pointer shadow-sm hover:bg-gray-100"
    :class="getTodoClass(todo)"
    @click="handleShowDrawer"
  >
    <div @click="e => e.stopPropagation()">
      <el-checkbox class="ml-2" v-model="todo.done">
        <span :class="{'text-gray-300 line-through': todo.done}">{{ todo.title }}</span>
      </el-checkbox>
    </div>
    <span
      v-if="todo.endDate"
      class="ml-4 tracking-wide"
      :class="{ 'text-gray-400': !todo.done, 'text-gray-300': todo.done }"
    >
      {{ todo.endDate }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ITodo } from '@/constants'

export default defineComponent({
  name: 'TodoList',

  props: {
    todo: Object
  },

  methods: {
    getTodoClass(todo: ITodo) {
      const { priorityType } = todo
      return {
        'border-blue-400': priorityType === 1,
        'border-yellow-400': priorityType === 2,
        'border-red-400': priorityType === 3
      }
    },

    handleShowDrawer() {
      this.$emit('select-todo', this.todo)
    },
  }
})
</script>
