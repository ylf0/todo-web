<template>
  <div class="flex-1 h-screen p-8">
    <div class="flex">
      <div class="flex-1 px-4 py-2 border border-gray-300 border-solid rounded bg-gray-100">
        <input
          class="w-full bg-transparent outline-none tracking-wider"
          placeholder="回车快速创建 todo"
          v-model="inputValue"
          @keydown="handleKeyDown"
        />
      </div>
      <el-button class="ml-4">Date Filter</el-button>
    </div>
    <div class="mt-4">
      <div
        class="flex items-center py-2 rounded cursor-pointer hover:bg-gray-100"
        v-for="(todo, index) in todolists"
        :key="index"
        @click="showDrawer = true"
      >
        <el-checkbox class="ml-2" v-model="todo.done" @change="handleCheckboxChange(todo)">
          {{ todo.title }}
        </el-checkbox>
      </div>
    </div>
  </div>
  <el-drawer title="待办详情" v-model="showDrawer" @handleClose="showDrawer = false">
    <span>待办详情</span>
  </el-drawer>
</template>

<script lang="ts">
import { ITodo } from '../../../types'

export default {
  name: 'Todo',

  setup() {
    return {
      inputValue: '',
      showDrawer: false,
    }
  },

  computed: {
    todolists() {
      return this.$store.state.todolists
    }
  },

  methods: {
    addTodo(todo: ITodo) {
      this.$store.commit('addTodo', todo)
    },

    handleKeyDown(e: any) {
      if (e.keyCode === 13) {
        this.addTodo({ title: this.inputValue, done: false })
        this.inputValue = ''
      }
    },

    // TODO: 黑人问号？？？为啥可以自动更新 todo.done？？
    handleCheckboxChange(todo: ITodo) {
    }
  }
}
</script>
