<template>
  <div class="flex-1 h-screen p-8">
    <div class="flex">
      <div class="flex-1 px-4 py-2 border border-gray-300 border-solid rounded bg-gray-100">
        <input
          class="w-full bg-transparent outline-none tracking-wider"
          placeholder="回车创建 todo"
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
        @click="() => handleShowDrawer(todo)"
      >
        <el-checkbox class="ml-2" v-model="todo.done" @change="handleCheckboxChange(todo)">
          {{ todo.title }}
        </el-checkbox>
      </div>
    </div>
    <el-drawer :with-header="false" v-model="showDrawer" @close="handleCloseDrawer">
      <todo-detail :todo="currTodo" />
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { ITodo } from '@/types'
import TodoDetail from '@/components/TodoDetail.vue'

interface IState {
  showDrawer: boolean
  currTodo?: ITodo
}

export default {
  components: { TodoDetail },
  name: 'Todo',

  data(): IState {
    return {
      showDrawer: true,
      currTodo: undefined
    }
  },

  // TODO: 为啥 showDrawer 放在 setup() 里只能响应变化一次？
  // TODO: setup() 具体是啥机制呢？
  setup() {
    return {
      inputValue: ''
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
    },

    handleShowDrawer(todo: ITodo) {
      this.currTodo = todo
      this.showDrawer = true
    },

    handleCloseDrawer() {
      this.currTodo = undefined
      this.showDrawer = false
    },
  }
}
</script>

<style>
.el-overlay {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
