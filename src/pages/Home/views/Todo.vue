<template>
  <div>
    <div class="flex">
      <div class="flex-1 px-4 py-2 border border-gray-300 border-solid rounded bg-gray-100">
        <input
          class="w-full bg-transparent outline-none tracking-wider"
          placeholder="回车快速创建 todo"
          v-model="inputValue"
          @keydown="handleKeyDown"
        />
      </div>
      <div
        class="flex-initial flex justify-center items-center ml-4 w-36 border border-gray-300 border-solid rounded"
      >
        Date Filter
      </div>
    </div>
    <div class="mt-4">
      <div class="flex items-center py-2" v-for="(todo, index) in todolists" :key="index">
        <input type="checkbox" />
        <p class="ml-2">{{ todo.title }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ITodo } from '../../../types'

export default {
  name: 'Todo',

  setup() {
    return {
      inputValue: '',
    }
  },

  computed: {
    todolists() {
      return this.$store.state.todolists
    }
  },

  methods: {
    handleKeyDown(e: any) {
      if (e.keyCode === 13) {
        this.addTodo({ title: this.inputValue, done: false })
        this.inputValue = ''
      }
    },

    addTodo(todo: ITodo) {
      this.$store.commit('addTodo', todo)
    }
  }
}
</script>
