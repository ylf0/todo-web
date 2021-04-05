<template>
  <div
    class="flex items-center mb-4 pl-2 py-2 todo-width border-l-4 rounded bg-white cursor-pointer shadow-sm hover:bg-gray-100"
    :class="getTodoClass(todo)"
    @click="handleShowDrawer"
  >
    <div @click="e => e.stopPropagation()">
      <el-checkbox
        class="ml-2"
        v-model="todo.done"
        @change="() => $emit('checkbox-change')"
      >
        <span v-if="!searchWord" :class="{'text-gray-300 line-through': todo.done}">{{ todo.title }}</span>
        <span v-else v-html="replaceTag()"/>
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
    todo: Object,
    searchWord: {
      type: String,
      required: false
    }
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

    replaceTag() {
      if (!this.todo || !this.searchWord) return ''

      return this.todo.title.replaceAll(
        RegExp(this.searchWord, 'gi'),
        (val: string) => `<span class="bg-yellow-300">${val}</span>`)
    },

    handleShowDrawer() {
      this.$emit('select-todo', this.todo)
    },
  }
})
</script>
